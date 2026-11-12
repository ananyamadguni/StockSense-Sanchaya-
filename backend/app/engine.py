import math

def calculate_days_remaining(current_stock: float, daily_usage: float) -> float:
    if daily_usage <= 0:
        return 999.0
    return round(current_stock / daily_usage, 1)

def calculate_reorder_point(daily_usage: float, lead_time_days: int, safety_stock: float) -> float:
    return round((daily_usage * lead_time_days) + safety_stock, 1)

def calculate_suggested_order(current_stock: float, daily_usage: float, target_days: int, safety_stock: float) -> int:
    target_need = (daily_usage * target_days) + safety_stock
    order_qty = target_need - current_stock
    return max(0, math.ceil(order_qty))

def is_stockout_imminent(days_remaining: float, lead_time_days: int) -> bool:
    return days_remaining <= lead_time_days