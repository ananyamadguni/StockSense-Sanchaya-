import io
from datetime import datetime, timezone
from typing import Optional, List
from fastapi import FastAPI, Depends, HTTPException, Query, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

from .database import engine, Base, get_db
from .models import Item, StockMovement, Batch, MovementType, Supplier, ABCClass
from .engine import calculate_days_remaining, calculate_suggested_order, is_stockout_imminent

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sanchaya API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    username: str
    password: str
    role: Optional[str] = "Inventory Manager"

class MovementRequest(BaseModel):
    item_id: int
    movement_type: MovementType
    quantity: float
    source: Optional[str] = "Manual Entry"
    warehouse: Optional[str] = "Main Hub - BLR"
    notes: Optional[str] = ""

@app.get("/")
def read_root():
    return {"message": "StockSense API is running"}

@app.post("/api/auth/login")
def login_user(payload: LoginRequest, db: Session = Depends(get_db)):
    valid_roles = ["Admin", "Inventory Manager", "Warehouse Staff", "Purchase Manager"]
    chosen_role = payload.role if payload.role in valid_roles else "Inventory Manager"
    
    if payload.username and payload.password:
        return {
            "token": "bearer-token-stocksense-2026",
            "user": {
                "username": payload.username,
                "role": chosen_role,
                "name": payload.username.capitalize()
            }
        }
    raise HTTPException(status_code=400, detail="Invalid username or password.")

@app.get("/api/reorder-recommendations")
def get_reorder_recommendations(target_days: int = Query(15, ge=1, le=90), db: Session = Depends(get_db)):
    items = db.query(Item).all()
    recommendations = []
    for item in items:
        days_left = calculate_days_remaining(item.current_stock, item.daily_usage)
        risk = is_stockout_imminent(days_left, item.lead_time_days)
        suggested_qty = calculate_suggested_order(
            item.current_stock, item.daily_usage, target_days, item.safety_stock
        )
        batches = [
            {
                "batch_id": b.batch_number,
                "qty": b.quantity,
                "location": b.bin_location,
                "expiry_date": b.expiry_date,
                "status": "CRITICAL" if "2026-11" in b.expiry_date else "SAFE"
            } for b in item.batches
        ]
        recommendations.append({
            "item_id": item.id,
            "sku": item.sku,
            "name": item.name,
            "category": item.category,
            "unit_cost": item.unit_cost,
            "current_stock": item.current_stock,
            "daily_usage": item.daily_usage,
            "lead_time_days": item.lead_time_days,
            "safety_stock": item.safety_stock,
            "days_remaining": days_left,
            "stockout_risk": risk,
            "suggested_order_qty": suggested_qty,
            "abc_class": item.abc_class.value if hasattr(item.abc_class, 'value') else item.abc_class,
            "batches": batches
        })
    return recommendations

@app.post("/api/movements")
def record_movement(payload: MovementRequest, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == payload.item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    if payload.movement_type == MovementType.OUT:
        if item.current_stock < payload.quantity:
            raise HTTPException(status_code=400, detail="Insufficient stock for dispatch")
        item.current_stock -= payload.quantity
    elif payload.movement_type == MovementType.IN:
        item.current_stock += payload.quantity
    elif payload.movement_type == MovementType.ADJUSTMENT:
        item.current_stock = payload.quantity

    movement = StockMovement(
        item_id=item.id,
        movement_type=payload.movement_type,
        quantity=payload.quantity,
        balance_after=item.current_stock,
        source=payload.source,
        warehouse=payload.warehouse,
        notes=payload.notes,
        movement_date=datetime.now(timezone.utc)
    )
    db.add(movement)
    db.commit()
    db.refresh(movement)
    return {"message": "Success", "balance_after": item.current_stock}

@app.get("/api/items/{item_id}/history")
def get_item_history(item_id: int, db: Session = Depends(get_db)):
    movements = db.query(StockMovement).filter(StockMovement.item_id == item_id).order_by(StockMovement.movement_date.desc()).all()
    return [
        {
            "id": m.id,
            "date": m.movement_date.strftime("%Y-%m-%d %H:%M"),
            "type": m.movement_type.value if hasattr(m.movement_type, 'value') else m.movement_type,
            "qty": m.quantity,
            "balance": m.balance_after,
            "source": m.source,
            "warehouse": m.warehouse,
            "notes": m.notes
        } for m in movements
    ]

@app.get("/api/purchase-orders/export-pdf")
def export_po_pdf(item_id: int, quantity: int, coverage_days: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    buffer = io.BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    p.setTitle(f"PO_{item.sku}")

    p.setFont("Helvetica-Bold", 18)
    p.drawString(50, 750, "Sanchaya (ಸಂಚಯ) — Purchase Order")
    
    p.setFont("Helvetica", 10)
    p.drawString(50, 735, f"Generated: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    p.drawString(50, 720, f"Target Horizon Coverage: {coverage_days} Days")
    p.line(50, 710, 560, 710)

    p.setFont("Helvetica-Bold", 12)
    p.drawString(50, 680, "Item Information:")
    p.setFont("Helvetica", 11)
    p.drawString(70, 660, f"SKU: {item.sku}")
    p.drawString(70, 640, f"Product Name: {item.name}")
    p.drawString(70, 620, f"Category: {item.category}")
    p.drawString(70, 600, f"On-Hand Balance: {item.current_stock} units")
    p.drawString(70, 580, f"Estimated Daily Usage: {item.daily_usage} units/day")
    p.drawString(70, 560, f"Supplier Lead Time: {item.lead_time_days} days")

    p.line(50, 540, 560, 540)
    p.setFont("Helvetica-Bold", 12)
    p.drawString(50, 510, "Order Quantities & Pricing:")
    p.setFont("Helvetica", 11)
    p.drawString(70, 490, f"Suggested Reorder Quantity: {quantity} units")
    p.drawString(70, 470, f"Unit Cost: ${item.unit_cost:.2f}")
    
    total_val = quantity * item.unit_cost
    p.setFont("Helvetica-Bold", 13)
    p.drawString(70, 440, f"Total Estimated Capital: ${total_val:,.2f}")

    p.line(50, 400, 560, 400)
    p.setFont("Helvetica-Oblique", 9)
    p.drawString(50, 380, "Authorized by Sanchaya Automated Reorder Intelligence Core.")

    p.showPage()
    p.save()
    buffer.seek(0)

    return Response(
        content=buffer.getvalue(),
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=PO_{item.sku}.pdf"}
    )