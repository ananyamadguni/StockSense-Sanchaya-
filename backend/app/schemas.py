from pydantic import BaseModel, Field
from datetime import datetime, date
from typing import Optional, List
from .models import MovementType

class ItemBase(BaseModel):
    sku: str
    name: str
    category: Optional[str] = "General"
    unit_cost: float = 0.0
    current_stock: int = 0
    daily_usage: float
    lead_time_days: int
    safety_stock: int = 0

class ItemCreate(ItemBase):
    pass

class ItemOut(ItemBase):
    id: int
    class Config:
        from_attributes = True

class MovementCreate(BaseModel):
    item_id: int
    movement_type: MovementType
    quantity: int = Field(gt=0, description="Quantity must be strictly positive")
    notes: Optional[str] = None

class MovementOut(BaseModel):
    id: int
    item_id: int
    movement_type: MovementType
    quantity: int
    movement_date: datetime
    notes: Optional[str]
    class Config:
        from_attributes = True

class ReorderRecommendation(BaseModel):
    item_id: int
    sku: str
    name: str
    category: str
    current_stock: int
    daily_usage: float
    lead_time_days: int
    reorder_point: int
    days_remaining: float
    stockout_risk: bool
    suggested_order_qty: int
    abc_class: Optional[str] = None