from datetime import datetime, timezone, timedelta
from .database import SessionLocal, engine, Base
from .models import Item, StockMovement, Batch, Supplier, MovementType, ABCClass

def seed_database():
    print("Dropping and recreating database tables...")
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    print("Inserting suppliers...")
    sup1 = Supplier(name="Logitech Regional", email="logi@supply.in", phone="+91 80 2341 5566", lead_time_days=4)
    sup2 = Supplier(name="Foxconn India", email="foxconn@blr.in", phone="+91 80 4455 1122", lead_time_days=5)
    db.add_all([sup1, sup2])
    db.commit()

    print("Inserting inventory items...")
    items = [
        Item(sku="SKU-1001", name="Wireless Mouse M185", category="Electronics", unit_cost=12.50, current_stock=24.0, daily_usage=8.0, lead_time_days=4, safety_stock=10.0, supplier_id=sup1.id, abc_class=ABCClass.A),
        Item(sku="SKU-1002", name="USB-C Charging Cable 2m", category="Accessories", unit_cost=3.20, current_stock=12.0, daily_usage=15.0, lead_time_days=5, safety_stock=20.0, supplier_id=sup2.id, abc_class=ABCClass.B),
        Item(sku="SKU-1003", name="Mechanical Keyboard RGB", category="Electronics", unit_cost=55.00, current_stock=85.0, daily_usage=2.5, lead_time_days=7, safety_stock=5.0, supplier_id=sup1.id, abc_class=ABCClass.A),
        Item(sku="SKU-1004", name="Ergonomic Desk Chair", category="Furniture", unit_cost=120.00, current_stock=4.0, daily_usage=1.2, lead_time_days=10, safety_stock=2.0, supplier_id=sup1.id, abc_class=ABCClass.A),
        Item(sku="SKU-1005", name="A4 Copier Paper 500s", category="Stationery", unit_cost=4.50, current_stock=3.0, daily_usage=5.0, lead_time_days=3, safety_stock=5.0, supplier_id=sup2.id, abc_class=ABCClass.C),
    ]
    db.add_all(items)
    db.commit()

    print("Inserting batches...")
    batches = [
        Batch(item_id=items[0].id, batch_number="LOT-2026-081", quantity=24.0, bin_location="A1-04", expiry_date="2027-02-15"),
        Batch(item_id=items[1].id, batch_number="LOT-2026-042", quantity=12.0, bin_location="B2-11", expiry_date="2026-11-20"),
        Batch(item_id=items[2].id, batch_number="LOT-2025-992", quantity=85.0, bin_location="A3-01", expiry_date="2027-08-10"),
        Batch(item_id=items[3].id, batch_number="LOT-2026-103", quantity=4.0, bin_location="W-BAY-02", expiry_date="2028-01-01"),
        Batch(item_id=items[4].id, batch_number="LOT-2026-004", quantity=3.0, bin_location="C1-09", expiry_date="2026-11-18"),
    ]
    db.add_all(batches)
    db.commit()

    print("Adding initial Kardex movement logs...")
    now = datetime.now(timezone.utc)
    for it in items:
        # Initial receipt
        db.add(StockMovement(
            item_id=it.id,
            movement_type=MovementType.IN,
            quantity=it.current_stock + 20.0,
            balance_after=it.current_stock + 20.0,
            source="PO-INIT-2026",
            warehouse="Main Hub - BLR",
            notes="Initial warehouse inventory load",
            movement_date=now - timedelta(days=10)
        ))
        # Initial outbound dispatch
        db.add(StockMovement(
            item_id=it.id,
            movement_type=MovementType.OUT,
            quantity=20.0,
            balance_after=it.current_stock,
            source="DISPATCH-ORD",
            warehouse="Main Hub - BLR",
            notes="Sales fulfillment order",
            movement_date=now - timedelta(days=2)
        ))
    db.commit()
    db.close()
    print("SUCCESS: Sanchaya SQLite database seeded with items, suppliers, batches, and movements!")

if __name__ == "__main__":
    seed_database()