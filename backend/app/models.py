from datetime import datetime
import enum
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from .database import Base

class MovementType(str, enum.Enum):
    IN = "IN"
    OUT = "OUT"
    ADJUSTMENT = "ADJUSTMENT"

class ABCClass(str, enum.Enum):
    A = "A"
    B = "B"
    C = "C"

class Supplier(Base):
    __tablename__ = "suppliers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(25), nullable=False)
    lead_time_days = Column(Integer, default=7)

    items = relationship("Item", back_populates="supplier")

class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(200), nullable=False)
    category = Column(String(100), default="General")
    supplier_id = Column(Integer, ForeignKey("suppliers.id"), nullable=True)
    unit_cost = Column(Float, nullable=False, default=0.0)
    current_stock = Column(Float, nullable=False, default=0.0)
    safety_stock = Column(Float, default=0.0)
    daily_usage = Column(Float, default=0.0)
    lead_time_days = Column(Integer, default=7)
    abc_class = Column(Enum(ABCClass), default=ABCClass.C)

    supplier = relationship("Supplier", back_populates="items")
    movements = relationship("StockMovement", back_populates="item", cascade="all, delete-orphan")
    batches = relationship("Batch", back_populates="item", cascade="all, delete-orphan")

class Batch(Base):
    __tablename__ = "batches"
    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("items.id"), nullable=False)
    batch_number = Column(String(60), nullable=False)
    quantity = Column(Float, nullable=False, default=0.0)
    bin_location = Column(String(50), default="A1-01")
    expiry_date = Column(String(20), nullable=False)

    item = relationship("Item", back_populates="batches")

class StockMovement(Base):
    __tablename__ = "stock_movements"
    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("items.id"), nullable=False)
    movement_type = Column(Enum(MovementType), nullable=False)
    quantity = Column(Float, nullable=False)
    balance_after = Column(Float, nullable=False)
    source = Column(String(100), default="Manual Entry")
    warehouse = Column(String(100), default="Main Hub - BLR")
    notes = Column(Text, nullable=True)
    movement_date = Column(DateTime, default=datetime.utcnow)

    item = relationship("Item", back_populates="movements")