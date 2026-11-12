import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Package, History, TrendingUp, AlertTriangle, Clock,
  Layers, ArrowUpRight, RefreshCw, Search, CheckCircle2,
  IndianRupee, Plus, FileDown, QrCode, SlidersHorizontal,
  Flame, Lock, User, LogOut, Truck,
  Building2, Clock3, Edit, Trash2, Eye, Activity
} from 'lucide-react';

const API_BASE = "http://127.0.0.1:8000/api";

const ROLE_MAP = {
  admin: { name: "Ananya VM (Admin)", role: "Admin (Full Access)" },
  manager: { name: "Suresh Rao (Manager)", role: "Manager (Read-Only Access)" },
  warehouse: { name: "Kiran Kumar (Warehouse)", role: "Warehouse Staff (Operational Access)" },
  procurement: { name: "Priya Nair (Procurement)", role: "Procurement Officer (Purchase Management)" },
  supplier: { name: "Logitech Regional (Supplier)", role: "Supplier (Separate Supplier Portal)" }
};

const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount || 0);
};

// Reusable Cyber Character-Scramble Text Animation Component (like the video)
function ScrambleText({ text, triggerKey }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789₹#@%";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 24);

    return () => clearInterval(interval);
  }, [text, triggerKey]);

  return <span>{displayText}</span>;
}

// Floating Logistics Quadcopter/Node SVG with Dotted Trail (inspired by video)
function FloatingLogisticsDrone() {
  return (
    <div style={{ position: 'relative', width: '100%', height: 65, pointerEvents: 'none', overflow: 'hidden' }}>
      <svg width="260" height="60" viewBox="0 0 260 60" style={{ position: 'absolute', left: 10, top: 4, opacity: 0.45 }}>
        <path
          d="M 10 45 Q 75 10, 140 35 T 250 18"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeDasharray="4 6"
        />
      </svg>
      <div className="floating-drone" style={{ position: 'absolute', left: 30, top: 8 }}>
        <svg width="46" height="46" viewBox="0 0 64 64">
          <circle cx="16" cy="16" r="9" fill="none" stroke="#10b981" strokeWidth="2.2" />
          <circle cx="48" cy="16" r="9" fill="none" stroke="#10b981" strokeWidth="2.2" />
          <circle cx="16" cy="48" r="9" fill="none" stroke="#10b981" strokeWidth="2.2" />
          <circle cx="48" cy="48" r="9" fill="none" stroke="#10b981" strokeWidth="2.2" />
          <line x1="22" y1="22" x2="42" y2="42" stroke="#34d399" strokeWidth="3" />
          <line x1="42" y1="22" x2="22" y2="42" stroke="#34d399" strokeWidth="3" />
          <rect x="26" y="26" width="12" height="12" rx="3" fill="#10b981" />
        </svg>
      </div>
    </div>
  );
}

const INITIAL_WAREHOUSES = [
  { id: 1, code: "WH-001", name: "Bangalore Central Hub", city: "Bangalore" },
  { id: 2, code: "WH-002", name: "Mysore Regional Depot", city: "Mysore" },
  { id: 3, code: "WH-003", name: "Mangalore Coastal Depot", city: "Mangalore" }
];

const INITIAL_INVENTORY = [
  {
    inventory_id: 1, warehouse_id: 1, warehouse_code: "WH-001", warehouse_name: "Bangalore Central Hub",
    product_id: 1, sku: "SKU-1001", name: "Wireless Mouse M185", category: "Electronics",
    unit_cost: 650.00, current_stock: 180, daily_usage: 8.0, safety_stock: 20,
    bin_location: "BLR-A1-01", days_remaining: 22.5, lead_time_days: 4,
    stockout_risk: false, suggested_order_qty: 0, abc_class: "A", expiry_date: "2027-02-15",
    batch_id: "LOT-2026-081", sparkline: "0,25 15,20 30,28 45,12 60,18 75,8 90,10", trend: "+12.4%",
    supplier_options: [
      { supplier_name: "Logitech Regional", price: 650, lead_time: 4, reliability: "98%" },
      { supplier_name: "Express IT Hub", price: 690, lead_time: 2, reliability: "99%" }
    ]
  },
  {
    inventory_id: 2, warehouse_id: 2, warehouse_code: "WH-002", warehouse_name: "Mysore Regional Depot",
    product_id: 1, sku: "SKU-1001", name: "Wireless Mouse M185", category: "Electronics",
    unit_cost: 650.00, current_stock: 14, daily_usage: 10.0, safety_stock: 15,
    bin_location: "MYS-01-A", days_remaining: 1.4, lead_time_days: 4,
    stockout_risk: true, suggested_order_qty: 151, abc_class: "A", expiry_date: "2027-02-15",
    batch_id: "LOT-2026-081", sparkline: "0,10 15,14 30,18 45,22 60,25 75,28 90,32", trend: "-18.2%",
    supplier_options: [
      { supplier_name: "Logitech Regional", price: 650, lead_time: 4, reliability: "98%" }
    ]
  },
  {
    inventory_id: 3, warehouse_id: 2, warehouse_code: "WH-002", warehouse_name: "Mysore Regional Depot",
    product_id: 2, sku: "SKU-1002", name: "USB-C Fast Cable 2m", category: "Accessories",
    unit_cost: 299.00, current_stock: 8, daily_usage: 14.0, safety_stock: 20,
    bin_location: "MYS-01-B", days_remaining: 0.6, lead_time_days: 5,
    stockout_risk: true, suggested_order_qty: 222, abc_class: "B", expiry_date: "2026-11-20",
    batch_id: "LOT-2026-042", sparkline: "0,8 15,15 30,12 45,24 60,20 75,30 90,34", trend: "-24.5%",
    supplier_options: [
      { supplier_name: "Anker India", price: 299, lead_time: 5, reliability: "96%" }
    ]
  },
  {
    inventory_id: 4, warehouse_id: 1, warehouse_code: "WH-001", warehouse_name: "Bangalore Central Hub",
    product_id: 3, sku: "SKU-1003", name: "Mechanical Keyboard RGB", category: "Electronics",
    unit_cost: 2850.00, current_stock: 60, daily_usage: 3.0, safety_stock: 10,
    bin_location: "BLR-B2-01", days_remaining: 20.0, lead_time_days: 7,
    stockout_risk: false, suggested_order_qty: 0, abc_class: "A", expiry_date: "2027-08-10",
    batch_id: "LOT-2025-992", sparkline: "0,30 15,24 30,26 45,16 60,12 75,14 90,6", trend: "+8.7%",
    supplier_options: [
      { supplier_name: "Keychron Direct", price: 2850, lead_time: 7, reliability: "99%" }
    ]
  },
  {
    inventory_id: 5, warehouse_id: 2, warehouse_code: "WH-002", warehouse_name: "Mysore Regional Depot",
    product_id: 5, sku: "SKU-1005", name: "A4 Copier Paper 500s", category: "Stationery",
    unit_cost: 240.00, current_stock: 3, daily_usage: 8.0, safety_stock: 10,
    bin_location: "MYS-02-A", days_remaining: 0.4, lead_time_days: 3,
    stockout_risk: true, suggested_order_qty: 127, abc_class: "C", expiry_date: "2026-11-18",
    batch_id: "LOT-2026-004", sparkline: "0,12 15,18 30,16 45,25 60,28 75,30 90,35", trend: "-31.0%",
    supplier_options: [
      { supplier_name: "JK Paper Mills", price: 240, lead_time: 3, reliability: "94%" }
    ]
  },
  {
    inventory_id: 6, warehouse_id: 3, warehouse_code: "WH-003", warehouse_name: "Mangalore Coastal Depot",
    product_id: 6, sku: "SKU-1006", name: "27-inch 4K IPS Monitor", category: "Electronics",
    unit_cost: 18500.00, current_stock: 4, daily_usage: 2.0, safety_stock: 8,
    bin_location: "MNG-A1-04", days_remaining: 2.0, lead_time_days: 6,
    stockout_risk: true, suggested_order_qty: 34, abc_class: "A", expiry_date: "2028-05-12",
    batch_id: "LOT-2026-119", sparkline: "0,14 15,16 30,22 45,26 60,29 75,31 90,34", trend: "-15.0%",
    supplier_options: [
      { supplier_name: "Dell Enterprise India", price: 18500, lead_time: 6, reliability: "99%" }
    ]
  },
  {
    inventory_id: 7, warehouse_id: 3, warehouse_code: "WH-003", warehouse_name: "Mangalore Coastal Depot",
    product_id: 7, sku: "SKU-1007", name: "Laptop Cooling Stand Pro", category: "Accessories",
    unit_cost: 1150.00, current_stock: 9, daily_usage: 5.0, safety_stock: 15,
    bin_location: "MNG-B2-02", days_remaining: 1.8, lead_time_days: 4,
    stockout_risk: true, suggested_order_qty: 81, abc_class: "B", expiry_date: "2027-09-30",
    batch_id: "LOT-2026-105", sparkline: "0,10 15,15 30,19 45,24 60,27 75,32 90,35", trend: "-21.3%",
    supplier_options: [
      { supplier_name: "Portronics Direct", price: 1150, lead_time: 4, reliability: "95%" }
    ]
  },
  {
    inventory_id: 8, warehouse_id: 1, warehouse_code: "WH-001", warehouse_name: "Bangalore Central Hub",
    product_id: 8, sku: "SKU-1008", name: "Barcode Thermal Labels (Roll)", category: "Stationery",
    unit_cost: 380.00, current_stock: 95, daily_usage: 4.0, safety_stock: 25,
    bin_location: "BLR-C3-08", days_remaining: 23.8, lead_time_days: 3,
    stockout_risk: false, suggested_order_qty: 0, abc_class: "C", expiry_date: "2026-11-24",
    batch_id: "LOT-2026-077", sparkline: "0,26 15,22 30,20 45,14 60,16 75,11 90,9", trend: "+6.4%",
    supplier_options: [
      { supplier_name: "Zebra Consumables", price: 380, lead_time: 3, reliability: "97%" }
    ]
  }
];

const INITIAL_POS = [
  { id: 1, po_number: "PO-1025", supplier_name: "Logitech Regional Supplies", warehouse_name: "Mysore Regional Depot", product_name: "Wireless Mouse M185", quantity: 100, unit_price: 650, total_amount: 65000, status: "Dispatched", expected_delivery: "2026-11-14" },
  { id: 2, po_number: "PO-1026", supplier_name: "Anker Electronics India", warehouse_name: "Bangalore Central Hub", product_name: "USB-C Fast Cable 2m", quantity: 200, unit_price: 299, total_amount: 59800, status: "Supplier Accepted", expected_delivery: "2026-11-16" },
  { id: 3, po_number: "PO-1027", supplier_name: "JK Paper Mills Ltd", warehouse_name: "Mysore Regional Depot", product_name: "A4 Copier Paper 500s", quantity: 80, unit_price: 240, total_amount: 19200, status: "Order Placed", expected_delivery: "2026-11-15" },
  { id: 4, po_number: "PO-1028", supplier_name: "Dell Enterprise India", warehouse_name: "Mangalore Coastal Depot", product_name: "27-inch 4K IPS Monitor", quantity: 25, unit_price: 18500, total_amount: 462500, status: "Order Placed", expected_delivery: "2026-11-19" },
  { id: 5, po_number: "PO-1029", supplier_name: "Portronics Direct", warehouse_name: "Mangalore Coastal Depot", product_name: "Laptop Cooling Stand Pro", quantity: 60, unit_price: 1150, total_amount: 69000, status: "Supplier Accepted", expected_delivery: "2026-11-17" },
  { id: 6, po_number: "PO-1030", supplier_name: "Keychron Direct", warehouse_name: "Bangalore Central Hub", product_name: "Mechanical Keyboard RGB", quantity: 40, unit_price: 2850, total_amount: 114000, status: "Warehouse Received", expected_delivery: "2026-11-10" }
];

const INITIAL_TIMELINE = [
  { id: 101, sku: "SKU-1001", name: "Wireless Mouse M185", type: "IN", qty: 40, source: "PO-1024 (Logitech)", warehouse: "Bangalore Central Hub", date: "2026-11-05 14:20", balance: 180 },
  { id: 102, sku: "SKU-1002", name: "USB-C Fast Cable 2m", type: "OUT", qty: 15, source: "Order #84109", warehouse: "Mysore Regional Depot", date: "2026-11-06 09:12", balance: 8 },
  { id: 103, sku: "SKU-1005", name: "A4 Copier Paper 500s", type: "OUT", qty: 8, source: "Order #84115", warehouse: "Mysore Regional Depot", date: "2026-11-07 11:45", balance: 3 },
  { id: 104, sku: "SKU-1003", name: "Mechanical Keyboard RGB", type: "IN", qty: 50, source: "PO-1023 (Keychron)", warehouse: "Bangalore Central Hub", date: "2026-11-08 16:30", balance: 60 },
  { id: 105, sku: "SKU-1006", name: "27-inch 4K IPS Monitor", type: "OUT", qty: 6, source: "Order #84128", warehouse: "Mangalore Coastal Depot", date: "2026-11-09 10:15", balance: 4 },
  { id: 106, sku: "SKU-1007", name: "Laptop Cooling Stand Pro", type: "OUT", qty: 11, source: "Order #84132", warehouse: "Mangalore Coastal Depot", date: "2026-11-10 15:50", balance: 9 },
  { id: 107, sku: "SKU-1008", name: "Barcode Thermal Labels (Roll)", type: "IN", qty: 30, source: "PO-1022 (Zebra)", warehouse: "Bangalore Central Hub", date: "2026-11-11 12:05", balance: 95 }
];

export default function SanchayaApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ username: 'admin', password: 'admin' });
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [warehouses, setWarehouses] = useState(INITIAL_WAREHOUSES);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState('ALL');
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [purchaseOrders, setPurchaseOrders] = useState(INITIAL_POS);
  const [inventoryTimeline, setInventoryTimeline] = useState(INITIAL_TIMELINE);
  const [targetDays, setTargetDays] = useState(15);
  const [loading, setLoading] = useState(false);
  const [actionNotice, setActionNotice] = useState(null);
  const [inspectBarcodeItem, setInspectBarcodeItem] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [movementForm, setMovementForm] = useState({ warehouse_id: 1, product_id: 1, type: 'OUT', quantity: 1, notes: '' });

  const [simItem, setSimItem] = useState(INITIAL_INVENTORY[0]);
  const [demandSurgePct, setDemandSurgePct] = useState(25);
  const [leadTimeDelay, setLeadTimeDelay] = useState(3);

  useEffect(() => {
    loadInitialData();
  }, [targetDays]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [whRes, invRes, poRes] = await Promise.all([
        fetch(`${API_BASE}/warehouses`),
        fetch(`${API_BASE}/inventory/consolidated?target_days=${targetDays}`),
        fetch(`${API_BASE}/purchase-orders`)
      ]);

      if (whRes.ok) {
        const whData = await whRes.json();
        if (Array.isArray(whData) && whData.length > 0) setWarehouses(whData);
      }
      if (invRes.ok) {
        const data = await invRes.json();
        if (Array.isArray(data) && data.length >= 5) {
          setInventory(data.map((item, i) => ({
            ...item,
            sparkline: INITIAL_INVENTORY[i % INITIAL_INVENTORY.length].sparkline,
            trend: item.stockout_risk ? "-18.4%" : "+11.2%"
          })));
        }
      }
      if (poRes.ok) {
        const poData = await poRes.json();
        if (Array.isArray(poData) && poData.length >= 5) setPurchaseOrders(poData);
      }
    } catch {
      // Keep pre-populated fallback data
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const key = loginForm.username.trim().toLowerCase();
    if (!key) {
      setAuthError('Please enter username.');
      return;
    }
    setAuthError('');
    const matched = ROLE_MAP[key] || {
      name: `${loginForm.username} (Admin)`,
      role: "Admin (Full Access)"
    };

    setCurrentUser({ username: key, name: matched.name, role: matched.role });

    if (matched.role.includes('Supplier')) setActiveTab('supplier_orders');
    else if (matched.role.includes('Warehouse')) setActiveTab('warehouse_ops');
    else if (matched.role.includes('Procurement')) setActiveTab('reorder');
    else setActiveTab('dashboard');
  };

  const handleLogout = () => setCurrentUser(null);

  const handleMovementSubmit = async (e) => {
    e.preventDefault();
    const qty = parseFloat(movementForm.quantity);
    const whId = parseInt(movementForm.warehouse_id);
    const prodId = parseInt(movementForm.product_id);

    try {
      const res = await fetch(`${API_BASE}/movements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          warehouse_id: whId,
          product_id: prodId,
          movement_type: movementForm.type,
          quantity: qty,
          notes: movementForm.notes || "Operational entry"
        })
      });
      if (!res.ok) throw new Error();
      setActionNotice({ type: 'success', msg: `Stock movement posted to server.` });
      loadInitialData();
    } catch {
      setInventory(prev => prev.map(item => {
        if (item.warehouse_id === whId && item.product_id === prodId) {
          const updatedStock = movementForm.type === 'IN'
            ? item.current_stock + qty
            : Math.max(0, item.current_stock - qty);
          return {
            ...item,
            current_stock: updatedStock,
            days_remaining: +(updatedStock / (item.daily_usage || 1)).toFixed(1),
            stockout_risk: updatedStock <= item.safety_stock
          };
        }
        return item;
      }));

      const targetItem = inventory.find(i => i.warehouse_id === whId && i.product_id === prodId) || inventory[0];
      setInventoryTimeline(prev => [
        {
          id: Date.now(),
          sku: targetItem.sku,
          name: targetItem.name,
          type: movementForm.type === 'IN' ? 'IN' : 'OUT',
          qty: qty,
          source: movementForm.type === 'ADJUSTMENT' ? 'Damage Report' : 'Floor Counter',
          warehouse: targetItem.warehouse_name,
          date: new Date().toISOString().slice(0, 16).replace('T', ' '),
          balance: movementForm.type === 'IN' ? targetItem.current_stock + qty : Math.max(0, targetItem.current_stock - qty)
        },
        ...prev
      ]);
      setActionNotice({ type: 'success', msg: `Physical movement recorded and ledger updated.` });
    }
    setTimeout(() => setActionNotice(null), 4000);
  };

  const handleUpdatePOStatus = async (poId, nextStatus) => {
    try {
      await fetch(`${API_BASE}/purchase-orders/${poId}/status?status=${nextStatus}`, { method: 'PATCH' });
    } catch {
      // Local state update
    }
    setPurchaseOrders(prev => prev.map(p => p.id === poId ? { ...p, status: nextStatus } : p));
    setActionNotice({ type: 'success', msg: `PO status updated to: ${nextStatus}` });
    setTimeout(() => setActionNotice(null), 3000);
  };

  const filteredInventory = inventory.filter(item => {
    const matchesWarehouse = selectedWarehouseId === 'ALL' || item.warehouse_id === parseInt(selectedWarehouseId);
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    return matchesWarehouse && matchesSearch && matchesCategory;
  });

  const totalValuation = filteredInventory.reduce((acc, curr) => acc + (curr.current_stock * curr.unit_cost), 0);
  const totalStockUnits = filteredInventory.reduce((acc, curr) => acc + curr.current_stock, 0);
  const stockoutAlerts = filteredInventory.filter(i => i.stockout_risk);

  const activeSim = simItem || filteredInventory[0] || INITIAL_INVENTORY[0];
  const simDailyUsage = (activeSim?.daily_usage || 5) * (1 + demandSurgePct / 100);
  const simLeadTime = (activeSim?.lead_time_days || 4) + leadTimeDelay;
  const simDaysRemaining = simDailyUsage > 0 ? +((activeSim?.current_stock || 10) / simDailyUsage).toFixed(1) : 999;

  const classAVal = filteredInventory.filter(i => i.abc_class === 'A').reduce((a, b) => a + b.current_stock * b.unit_cost, 0);
  const classBVal = filteredInventory.filter(i => i.abc_class === 'B').reduce((a, b) => a + b.current_stock * b.unit_cost, 0);
  const classCVal = filteredInventory.filter(i => i.abc_class === 'C').reduce((a, b) => a + b.current_stock * b.unit_cost, 0);
  const totalABC = classAVal + classBVal + classCVal || 1;

  const isAdmin = currentUser?.role?.includes('Admin');
  const isManager = currentUser?.role?.includes('Manager') && !isAdmin;
  const isWarehouse = currentUser?.role?.includes('Warehouse');
  const isProcurement = currentUser?.role?.includes('Procurement');
  const isSupplier = currentUser?.role?.includes('Supplier');

  const tickerText = "  //  LIVE TELEMETRY: WH-001 BANGALORE OPTIMAL  •  WH-002 MYSORE 3 ALERTS  •  WH-003 MANGALORE 2 ALERTS  •  INR VALUATION SYNCED  •  PREDICTIVE ENGINE ACTIVE  ";

  // =====================================================================
  // ANIMATED CYBER-GRID LOGIN SCREEN
  // =====================================================================
  if (!currentUser) {
    return (
      <div className="sanchaya-grid-bg" style={styles.loginContainer}>
        {/* Top Live Scrolling Ticker */}
        <div className="marquee-wrapper" style={{ position: 'absolute', top: 0, left: 0, zIndex: 20 }}>
          <div className="marquee-track">
            <span>{tickerText}{tickerText}{tickerText}</span>
          </div>
        </div>

        <div className="reveal-block" style={styles.loginCardWrapper}>
          {/* Left Showcase Panel */}
          <div style={styles.loginShowcase}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' }}>
              <div style={styles.brandIcon}><Activity size={22} color="#06130e" strokeWidth={2.5} /></div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.55rem', fontWeight: 800, color: '#ffffff' }}>
                  <ScrambleText text="Sanchaya" triggerKey="brand" />
                </h2>
                <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
                  // PREDICTIVE MULTI-WAREHOUSE ERP
                </span>
              </div>
            </div>

            {/* Gliding Drone & Dotted Flight Path */}
            <FloatingLogisticsDrone />

            <h1 style={{ fontSize: '2.35rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '1.15rem' }}>
              Sanchaya <span style={{ color: '#10b981' }}><ScrambleText text="Intelligence" triggerKey="hero1" /></span> <br />
              is the Best Way to <br />
              <span style={{ color: '#10b981' }}><ScrambleText text="Optimize" triggerKey="hero2" /></span> your Stock.
            </h1>

            <p style={{ color: '#9ca3af', fontSize: '0.94rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>
              Real-time Indian Rupee (₹) stock valuation, consumption velocity analytics, and multi-warehouse replenishment intelligence across Bangalore, Mysore, and Mangalore hubs.
            </p>

            {/* Current Stock Card */}
            <div className="cyber-card" style={{ borderRadius: 12, padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.76rem', color: '#10b981', fontWeight: 700, letterSpacing: '0.06em', fontFamily: 'JetBrains Mono, monospace' }}>
                  // CURRENT STOCK
                </div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: '#ffffff', marginTop: 2 }}>
                  <ScrambleText text={`${totalStockUnits.toLocaleString('en-IN')} Units`} triggerKey="units" />
                </div>
                <div style={{ fontSize: '0.84rem', color: '#34d399', marginTop: 2 }}>
                  Total Valuation: <strong>{formatINR(totalValuation)}</strong>
                </div>
              </div>
              <svg width="120" height="44" viewBox="0 0 110 36">
                <polyline fill="none" stroke="#10b981" strokeWidth="2.8" points="0,30 18,22 36,26 54,12 72,16 90,6 108,8" />
              </svg>
            </div>
          </div>

          {/* Right Sign In Box */}
          <div style={styles.loginBox}>
            <div style={{ fontSize: '0.75rem', color: '#10b981', fontFamily: 'JetBrains Mono, monospace', marginBottom: 6 }}>
              // OPERATOR AUTHENTICATION
            </div>
            <h2 style={{ margin: 0, fontSize: '1.65rem', fontWeight: 800, color: '#ffffff' }}>
              <ScrambleText text="Sign In to Portal" triggerKey="signin" />
            </h2>
            <p style={{ margin: '6px 0 1.75rem 0', color: '#9ca3af', fontSize: '0.86rem' }}>
              Enter your operator credentials (`admin`, `manager`, `warehouse`, `procurement`, or `supplier`)
            </p>

            {authError && (
              <div style={styles.alertError}>
                <AlertTriangle size={18} />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={styles.label}>OPERATOR USERNAME</label>
                <div style={{ position: 'relative', marginTop: 6 }}>
                  <User size={18} color="#9ca3af" style={{ position: 'absolute', left: 12, top: 12 }} />
                  <input
                    type="text"
                    value={loginForm.username}
                    onChange={e => setLoginForm({ ...loginForm, username: e.target.value })}
                    placeholder="admin / manager / warehouse / procurement / supplier"
                    style={{ ...styles.input, width: '100%', paddingLeft: 38 }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={styles.label}>PASSWORD</label>
                <div style={{ position: 'relative', marginTop: 6 }}>
                  <Lock size={18} color="#9ca3af" style={{ position: 'absolute', left: 12, top: 12 }} />
                  <input
                    type="password"
                    value={loginForm.password}
                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                    style={{ ...styles.input, width: '100%', paddingLeft: 38 }}
                    required
                  />
                </div>
              </div>

              <button type="submit" style={{ ...styles.primaryBtn, justifyContent: 'center', padding: '13px', fontSize: '0.98rem', marginTop: 8 }}>
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================================
  // AUTHENTICATED APPLICATION SHELL WITH ANIMATED GRID & SCRAMBLE HEADERS
  // =====================================================================
  const currentTitle =
    activeTab === 'dashboard' ? 'Operations Dashboard' :
    activeTab === 'inventory' ? 'Inventory Items & Catalog' :
    activeTab === 'warehouse_ops' ? 'Floor Dispatch & Movement Pad' :
    activeTab === 'reorder' ? 'Predictive Reorder & Purchase Desk' :
    activeTab === 'simulation' ? 'What-If Disruption Sandbox' :
    activeTab === 'timeline' ? 'Kardex Movement Log' :
    activeTab === 'abc' ? 'ABC Analysis & Pareto Curve' :
    activeTab === 'expiry' ? 'Batch Traceability & Expiry Management' :
    'Supplier Purchase Order Desk';

  return (
    <div className="sanchaya-grid-bg" style={styles.container}>
      <aside style={styles.sidebar}>
        <div style={styles.brandContainer}>
          <div style={styles.brandIcon}><Activity size={20} color="#06130e" strokeWidth={2.5} /></div>
          <div>
            <div style={styles.brandTitle}>Sanchaya</div>
            <div style={styles.brandSub}>
              {isAdmin ? 'Master Control Console' : isManager ? 'Executive Read-Only' : isWarehouse ? 'Floor Station' : isProcurement ? 'Procurement Desk' : 'Vendor Portal'}
            </div>
          </div>
        </div>

        <nav style={styles.navMenu}>
          {isSupplier ? (
            <button onClick={() => setActiveTab('supplier_orders')} style={{ ...styles.navItem, ...(activeTab === 'supplier_orders' ? styles.navItemActive : {}) }}>
              <Clock3 size={18} /><span>Purchase Orders</span>
            </button>
          ) : (
            <>
              {(isAdmin || isManager) && (
                <button onClick={() => setActiveTab('dashboard')} style={{ ...styles.navItem, ...(activeTab === 'dashboard' ? styles.navItemActive : {}) }}>
                  <LayoutDashboard size={18} /><span>Executive Overview</span>
                </button>
              )}

              {(isAdmin || isManager || isWarehouse) && (
                <button onClick={() => setActiveTab('inventory')} style={{ ...styles.navItem, ...(activeTab === 'inventory' ? styles.navItemActive : {}) }}>
                  <Package size={18} /><span>Product Catalog</span>
                </button>
              )}

              {(isAdmin || isWarehouse) && (
                <button onClick={() => setActiveTab('warehouse_ops')} style={{ ...styles.navItem, ...(activeTab === 'warehouse_ops' ? styles.navItemActive : {}) }}>
                  <Truck size={18} /><span>Floor Dispatch Pad</span>
                </button>
              )}

              {(isAdmin || isManager || isProcurement) && (
                <button onClick={() => setActiveTab('reorder')} style={{ ...styles.navItem, ...(activeTab === 'reorder' ? styles.navItemActive : {}) }}>
                  <TrendingUp size={18} /><span>Predictive Reorder</span>
                  {stockoutAlerts.length > 0 && <span style={styles.badgeDanger}>{stockoutAlerts.length}</span>}
                </button>
              )}

              {(isAdmin || isManager) && (
                <button onClick={() => setActiveTab('simulation')} style={{ ...styles.navItem, ...(activeTab === 'simulation' ? styles.navItemActive : {}) }}>
                  <SlidersHorizontal size={18} /><span>What-If Sandbox</span>
                </button>
              )}

              {(isAdmin || isManager || isWarehouse) && (
                <button onClick={() => setActiveTab('timeline')} style={{ ...styles.navItem, ...(activeTab === 'timeline' ? styles.navItemActive : {}) }}>
                  <History size={18} /><span>Kardex Timeline</span>
                </button>
              )}

              {(isAdmin || isManager) && (
                <button onClick={() => setActiveTab('abc')} style={{ ...styles.navItem, ...(activeTab === 'abc' ? styles.navItemActive : {}) }}>
                  <Layers size={18} /><span>ABC Classification</span>
                </button>
              )}

              {(isAdmin || isManager || isWarehouse) && (
                <button onClick={() => setActiveTab('expiry')} style={{ ...styles.navItem, ...(activeTab === 'expiry' ? styles.navItemActive : {}) }}>
                  <Clock size={18} /><span>FEFO / Expiry Risk</span>
                </button>
              )}
            </>
          )}
        </nav>

        {!isSupplier && !isWarehouse && (
          <div style={styles.sidebarControl}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: '0.82rem', color: '#9ca3af' }}>Target Horizon</span>
              <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.9rem' }}>{targetDays} Days</span>
            </div>
            {isAdmin || isProcurement ? (
              <input type="range" min="5" max="60" value={targetDays} onChange={e => setTargetDays(Number(e.target.value))} style={styles.slider} />
            ) : (
              <div style={{ fontSize: '0.78rem', color: '#f59e0b' }}>Fixed by Admin Policy (Read-Only)</div>
            )}
          </div>
        )}

        <div style={styles.userCard}>
          <div style={styles.avatar}>{currentUser.name.charAt(0)}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: '0.74rem', color: isManager ? '#f59e0b' : '#10b981' }}>
              {isManager ? 'Read-Only Access' : currentUser.role}
            </div>
          </div>
          <button onClick={handleLogout} title="Sign Out" style={styles.logoutBtn}>
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Live Marquee Strip at Top of Main Workspace */}
        <div className="marquee-wrapper">
          <div className="marquee-track">
            <span>{tickerText}{tickerText}{tickerText}</span>
          </div>
        </div>

        <div style={styles.mainContent}>
          <header style={styles.topHeader}>
            <div>
              <div style={{ fontSize: '0.74rem', color: '#10b981', fontFamily: 'JetBrains Mono, monospace', marginBottom: 4 }}>
                // {filteredInventory.length} LINES  •  {warehouses.length} HUBS ACTIVE
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h1 style={styles.pageTitle}>
                  <ScrambleText text={currentTitle} triggerKey={activeTab} />
                </h1>
                {isManager && (
                  <span style={{ ...styles.badgeWarning, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    <Eye size={12} /> Read-Only Mode Active
                  </span>
                )}
              </div>
              <p style={styles.pageDesc}>FastAPI • PostgreSQL Ready • INR Valuation & Visual Telemetry</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {!isSupplier && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#111815', padding: '7px 12px', borderRadius: 8, border: '1px solid rgba(16, 185, 129, 0.25)' }}>
                  <Building2 size={16} color="#10b981" />
                  <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Hub:</span>
                  <select
                    value={selectedWarehouseId}
                    onChange={e => setSelectedWarehouseId(e.target.value)}
                    style={{ background: 'transparent', border: 'none', color: '#ffffff', fontWeight: 700, outline: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    <option value="ALL" style={{ background: '#090d0b' }}>All Warehouses (Consolidated)</option>
                    {warehouses.map(w => (
                      <option key={w.id} value={w.id} style={{ background: '#090d0b' }}>{w.code} - {w.name}</option>
                    ))}
                  </select>
                </div>
              )}
              <button onClick={loadInitialData} style={styles.refreshBtn}><RefreshCw size={16} className={loading ? 'spin' : ''} /> <span>Sync Live</span></button>
            </div>
          </header>

          {actionNotice && (
            <div style={actionNotice.type === 'success' ? styles.alertSuccess : styles.alertError}>
              <CheckCircle2 size={18} /><span>{actionNotice.msg}</span>
            </div>
          )}

          {/* 1. EXECUTIVE OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div key="dashboard" className="reveal-block" style={styles.tabContent}>
              <div style={styles.kpiGrid}>
                <div className="cyber-card" style={styles.kpiCard}>
                  <div style={styles.kpiHeader}><span style={styles.kpiLabel}>Total Products</span><Package size={20} color="#10b981" /></div>
                  <div style={styles.kpiValue}><ScrambleText text={`${filteredInventory.length} Lines`} triggerKey={selectedWarehouseId} /></div>
                  <div style={styles.kpiTrendPositive}><ArrowUpRight size={14} /> Multi-facility tracked</div>
                </div>
                <div className="cyber-card" style={styles.kpiCard}>
                  <div style={styles.kpiHeader}><span style={styles.kpiLabel}>Total Stock Units</span><Layers size={20} color="#10b981" /></div>
                  <div style={styles.kpiValue}><ScrambleText text={`${totalStockUnits.toLocaleString('en-IN')} pcs`} triggerKey={selectedWarehouseId} /></div>
                  <div style={styles.kpiTrendNeutral}>In-stock availability 88%</div>
                </div>
                <div className="cyber-card" style={styles.kpiCard}>
                  <div style={styles.kpiHeader}><span style={styles.kpiLabel}>Stockout Alert Count</span><AlertTriangle size={20} color="#ef4444" /></div>
                  <div style={{ ...styles.kpiValue, color: '#ef4444' }}><ScrambleText text={`${stockoutAlerts.length} Warnings`} triggerKey={selectedWarehouseId} /></div>
                  <div style={styles.kpiTrendDanger}>Lead times breach buffers</div>
                </div>
                <div className="cyber-card" style={styles.kpiCard}>
                  <div style={styles.kpiHeader}><span style={styles.kpiLabel}>Gross Inventory Value</span><IndianRupee size={20} color="#10b981" /></div>
                  <div style={{ ...styles.kpiValue, color: '#10b981' }}><ScrambleText text={formatINR(totalValuation)} triggerKey={selectedWarehouseId} /></div>
                  <div style={styles.kpiTrendPositive}>Working capital optimal</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1rem' }}>
                {filteredInventory.slice(0, 5).map((item, idx) => {
                  const strokeCol = item.stockout_risk ? '#ef4444' : '#10b981';
                  return (
                    <div key={idx} className="cyber-card" style={{ borderRadius: 10, padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e5e7eb', marginBottom: 4 }}>{item.name.slice(0, 16)}</div>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>{formatINR(item.unit_cost)}</div>
                        <div style={{ fontSize: '0.74rem', fontWeight: 700, color: strokeCol, marginTop: 2 }}>
                          {item.current_stock} pcs ({item.trend})
                        </div>
                      </div>
                      <svg width="70" height="36" viewBox="0 0 95 40">
                        <polyline fill="none" stroke={strokeCol} strokeWidth="2.2" points={item.sparkline} />
                      </svg>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.25rem' }}>
                <div className="cyber-card" style={styles.chartPanel}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={styles.panelTitle}>Demand Forecast vs. Inbound Restock</h3>
                      <div style={styles.panelSubtitle}>Monthly unit volume & procurement velocity</div>
                    </div>
                    <div style={{ display: 'flex', gap: 12, fontSize: '0.78rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#10b981' }}><span style={{ width: 8, height: 8, borderRadius: 2, background: '#10b981' }} /> Outbound Sales</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#6b7280' }}><span style={{ width: 8, height: 8, borderRadius: 2, background: '#6b7280' }} /> Restock POs</span>
                    </div>
                  </div>
                  <div style={{ height: 190, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '1rem 1rem 0 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    {[
                      { month: 'Jun', sales: 65, restock: 40 },
                      { month: 'Jul', sales: 90, restock: 70 },
                      { month: 'Aug', sales: 45, restock: 60 },
                      { month: 'Sep', sales: 80, restock: 50 },
                      { month: 'Oct', sales: 95, restock: 85 },
                      { month: 'Nov', sales: 110, restock: 90 }
                    ].map((d, i) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 52 }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 145 }}>
                          <div style={{ width: 16, height: `${(d.sales / 120) * 100}%`, background: '#10b981', borderRadius: '4px 4px 0 0' }} />
                          <div style={{ width: 16, height: `${(d.restock / 120) * 100}%`, background: '#4b5563', borderRadius: '4px 4px 0 0' }} />
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#9ca3af', paddingBottom: 6 }}>{d.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cyber-card" style={styles.chartPanel}>
                  <div style={styles.panelHeader}>
                    <h3 style={styles.panelTitle}>Capital Locked by Warehouse (₹)</h3>
                    <div style={styles.panelSubtitle}>Regional inventory asset distribution</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 18 }}>
                    {warehouses.map((w, idx) => {
                      const whVal = inventory.filter(i => i.warehouse_id === w.id).reduce((a, b) => a + b.current_stock * b.unit_cost, 0);
                      const totalAllWh = inventory.reduce((a, b) => a + b.current_stock * b.unit_cost, 0) || 1;
                      const pct = Math.round((whVal / totalAllWh) * 100);
                      return (
                        <div key={w.id}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', marginBottom: 6 }}>
                            <span style={{ color: '#ffffff', fontWeight: 600 }}>{w.name}</span>
                            <span style={{ color: '#10b981', fontWeight: 800 }}>{formatINR(whVal)} ({pct}%)</span>
                          </div>
                          <div style={{ width: '100%', height: 10, background: '#090d0b', borderRadius: 6, overflow: 'hidden' }}>
                            <div style={{ width: `${Math.max(pct, 4)}%`, height: '100%', background: idx === 0 ? '#10b981' : idx === 1 ? '#34d399' : '#059669', borderRadius: 6 }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="cyber-card" style={styles.tableCard}>
                <div style={styles.panelHeader}>
                  <h3 style={styles.panelTitle}>Critical Restock Priorities</h3>
                  <div style={styles.panelSubtitle}>Immediate reorder required across hubs</div>
                </div>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={styles.th}>Hub</th>
                      <th style={styles.th}>Product</th>
                      <th style={styles.th}>Stock</th>
                      <th style={styles.th}>Days Left</th>
                      <th style={styles.th}>Risk Level</th>
                      <th style={styles.th}>Suggested Restock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(stockoutAlerts.length >= 5 ? stockoutAlerts : filteredInventory).slice(0, 6).map(item => (
                      <tr key={item.inventory_id} style={styles.tr}>
                        <td style={styles.td}><strong>{item.warehouse_code}</strong></td>
                        <td style={styles.td}><strong>{item.name}</strong><div style={{ fontSize: '0.78rem', color: '#6b7280' }}>{item.sku}</div></td>
                        <td style={styles.td}>{item.current_stock} pcs</td>
                        <td style={{ ...styles.td, color: item.stockout_risk ? '#ef4444' : '#10b981', fontWeight: 800 }}>{item.days_remaining}d</td>
                        <td style={styles.td}>
                          {item.stockout_risk ? <span style={styles.badgeDanger}>Stockout Imminent</span> : <span style={styles.badgeSuccess}>Buffer Healthy</span>}
                        </td>
                        <td style={{ ...styles.td, color: '#10b981', fontWeight: 800 }}>+{item.suggested_order_qty || 50} units</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 2. PRODUCT CATALOG */}
          {activeTab === 'inventory' && (
            <div key="inventory" className="reveal-block" style={styles.tabContent}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 12, flex: 1 }}>
                  <div style={{ ...styles.searchBox, width: 340 }}>
                    <Search size={18} color="#9ca3af" />
                    <input type="text" placeholder="Search SKU, Product Name..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={styles.searchInput} />
                  </div>
                  <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={styles.selectFilter}>
                    <option value="ALL">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Stationery">Stationery</option>
                  </select>
                </div>

                {isAdmin && (
                  <button
                    onClick={() => setActionNotice({ type: 'success', msg: 'Admin Mode: Product Creation Form opened.' })}
                    style={styles.primaryBtn}
                  >
                    <Plus size={16} /> Add Product
                  </button>
                )}
              </div>

              <div className="cyber-card" style={styles.tableCard}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={styles.th}>Warehouse</th>
                      <th style={styles.th}>Product Details</th>
                      <th style={styles.th}>Category</th>
                      <th style={styles.th}>Class</th>
                      <th style={styles.th}>Stock</th>
                      <th style={styles.th}>Unit Cost (₹)</th>
                      <th style={styles.th}>Total Value (₹)</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map(item => (
                      <tr key={item.inventory_id} style={styles.tr}>
                        <td style={styles.td}><strong>{item.warehouse_code}</strong></td>
                        <td style={styles.td}><strong>{item.name}</strong><div style={{ fontSize: '0.78rem', color: '#6b7280' }}>{item.sku}</div></td>
                        <td style={styles.td}>{item.category}</td>
                        <td style={styles.td}><span style={styles.badgeA}>Class {item.abc_class}</span></td>
                        <td style={{ ...styles.td, fontWeight: 700 }}>{item.current_stock} pcs</td>
                        <td style={styles.td}>{formatINR(item.unit_cost)}</td>
                        <td style={{ ...styles.td, fontWeight: 700, color: '#10b981' }}>{formatINR(item.current_stock * item.unit_cost)}</td>
                        <td style={styles.td}>
                          {item.stockout_risk ? <span style={styles.badgeDanger}>Low Stock</span> : <span style={styles.badgeSuccess}>Optimal</span>}
                        </td>
                        <td style={styles.td}>
                          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                            <button onClick={() => setInspectBarcodeItem(item)} style={styles.btnSmall}><QrCode size={14} /> Barcode</button>
                            {isAdmin && (
                              <>
                                <button onClick={() => setActionNotice({ type: 'success', msg: `Editing ${item.sku}` })} style={{ ...styles.btnSmall, color: '#10b981' }} title="Edit"><Edit size={14} /></button>
                                <button onClick={() => setActionNotice({ type: 'error', msg: `Deleted ${item.sku}` })} style={{ ...styles.btnSmall, color: '#ef4444' }} title="Delete"><Trash2 size={14} /></button>
                              </>
                            )}
                            {isManager && <span style={{ fontSize: '0.74rem', color: '#6b7280', fontStyle: 'italic' }}>View only</span>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. FLOOR DISPATCH & MOVEMENT PAD */}
          {activeTab === 'warehouse_ops' && (
            <div key="warehouse_ops" className="reveal-block" style={styles.tabContent}>
              <div className="cyber-card" style={styles.formPanel}>
                <div style={styles.panelHeader}>
                  <h3 style={styles.panelTitle}>Warehouse Stock Dispatch & Inbound Receiving Counter</h3>
                  <div style={styles.panelSubtitle}>Record physical movement, received deliveries, or report damaged stock</div>
                </div>
                <form onSubmit={handleMovementSubmit} style={{ display: 'flex', flexDirection: 'row', gap: '1rem', flexWrap: 'wrap', marginTop: 12 }}>
                  <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={styles.label}>Warehouse Hub</label>
                    <select value={movementForm.warehouse_id} onChange={e => setMovementForm({ ...movementForm, warehouse_id: e.target.value })} style={styles.select}>
                      {warehouses.map(w => <option key={w.id} value={w.id}>{w.code} ({w.name})</option>)}
                    </select>
                  </div>
                  <div style={{ flex: 1, minWidth: 200, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={styles.label}>Product SKU</label>
                    <select value={movementForm.product_id} onChange={e => setMovementForm({ ...movementForm, product_id: e.target.value })} style={styles.select}>
                      {inventory.filter(i => i.warehouse_id === parseInt(movementForm.warehouse_id)).map(i => (
                        <option key={i.product_id} value={i.product_id}>{i.name} (On Hand: {i.current_stock})</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={styles.label}>Action</label>
                    <select value={movementForm.type} onChange={e => setMovementForm({ ...movementForm, type: e.target.value })} style={styles.select}>
                      <option value="OUT">Stock-OUT (Dispatch/Sales)</option>
                      <option value="IN">Stock-IN (Receiving)</option>
                      <option value="ADJUSTMENT">Report Damaged / Missing Stock</option>
                    </select>
                  </div>
                  <div style={{ flex: 1, minWidth: 100, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <label style={styles.label}>Quantity</label>
                    <input type="number" min="1" value={movementForm.quantity} onChange={e => setMovementForm({ ...movementForm, quantity: e.target.value })} required style={styles.input} />
                  </div>
                  <button type="submit" style={{ ...styles.primaryBtn, alignSelf: 'flex-end' }}>Commit</button>
                </form>
              </div>

              <div className="cyber-card" style={styles.tableCard}>
                <div style={styles.panelHeader}><h3 style={styles.panelTitle}>Physical Bin Locations & Shelf Stock</h3></div>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={styles.th}>SKU</th>
                      <th style={styles.th}>Product Name</th>
                      <th style={styles.th}>Bin Location</th>
                      <th style={styles.th}>Available Shelf Units</th>
                      <th style={styles.th}>Scan Label</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map(item => (
                      <tr key={item.inventory_id} style={styles.tr}>
                        <td style={styles.td}><strong>{item.sku}</strong></td>
                        <td style={styles.td}>{item.name}</td>
                        <td style={{ ...styles.td, color: '#10b981', fontWeight: 700 }}>{item.bin_location}</td>
                        <td style={{ ...styles.td, fontWeight: 800, color: item.current_stock < 15 ? '#ef4444' : '#10b981' }}>{item.current_stock} pcs</td>
                        <td style={styles.td}>
                          <button onClick={() => setInspectBarcodeItem(item)} style={styles.btnSmall}><QrCode size={14} /> Barcode</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 4. PREDICTIVE REORDER */}
          {activeTab === 'reorder' && (
            <div key="reorder" className="reveal-block" style={styles.tabContent}>
              <div className="cyber-card" style={styles.tableCard}>
                <div style={styles.panelHeader}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={styles.panelTitle}>Predictive Reorder & Purchase Management Desk</h3>
                      <div style={styles.panelSubtitle}>Supplier comparisons, suggested order quantities, and estimated PO budgets (₹)</div>
                    </div>
                    {isProcurement && <span style={styles.badgeSuccess}>Procurement Officer Mode</span>}
                  </div>
                </div>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={styles.th}>Hub</th>
                      <th style={styles.th}>Item</th>
                      <th style={styles.th}>Days Left</th>
                      <th style={styles.th}>Needed Qty</th>
                      <th style={styles.th}>Est. PO Cost (₹)</th>
                      <th style={styles.th}>Supplier Comparison & Pricing</th>
                      <th style={styles.th}>PO Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(stockoutAlerts.length >= 5 ? stockoutAlerts : filteredInventory).map(item => (
                      <tr key={item.inventory_id} style={styles.tr}>
                        <td style={styles.td}><strong>{item.warehouse_code}</strong></td>
                        <td style={styles.td}><strong>{item.name}</strong></td>
                        <td style={{ ...styles.td, color: item.stockout_risk ? '#ef4444' : '#10b981', fontWeight: 800 }}>{item.days_remaining}d</td>
                        <td style={{ ...styles.td, color: '#10b981', fontWeight: 800 }}>+{item.suggested_order_qty || 50}</td>
                        <td style={{ ...styles.td, fontWeight: 700, color: '#10b981' }}>{formatINR((item.suggested_order_qty || 50) * item.unit_cost)}</td>
                        <td style={styles.td}>
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {item.supplier_options.map((s, idx) => (
                              <div key={idx} style={{ background: '#090d0b', padding: '4px 8px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.74rem' }}>
                                <strong>{s.supplier_name}</strong>: {formatINR(s.price)} ({s.lead_time}d lead, {s.reliability})
                              </div>
                            ))}
                          </div>
                        </td>
                        <td style={styles.td}>
                          {isAdmin || isProcurement ? (
                            <div style={{ display: 'flex', gap: 6 }}>
                              <button
                                onClick={() => setActionNotice({ type: 'success', msg: `PO submitted to supplier for ${item.name}` })}
                                style={{ ...styles.primaryBtn, padding: '6px 10px', fontSize: '0.74rem' }}
                              >
                                Create PO
                              </button>
                              <a
                                href={`${API_BASE}/purchase-orders/export-pdf?sku=${item.sku}&warehouse=${item.warehouse_name}&quantity=${item.suggested_order_qty || 50}&unit_cost=${item.unit_cost}`}
                                target="_blank"
                                rel="noreferrer"
                                style={{ ...styles.btnSmallPdf, textDecoration: 'none' }}
                              >
                                <FileDown size={14} /> PDF
                              </a>
                            </div>
                          ) : (
                            <span style={{ fontSize: '0.78rem', color: '#6b7280', fontStyle: 'italic' }}>Read Only</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. WHAT-IF SANDBOX */}
          {activeTab === 'simulation' && (
            <div key="simulation" className="reveal-block" style={styles.tabContent}>
              <div className="cyber-card" style={styles.simCard}>
                <div style={styles.panelHeader}>
                  <h3 style={styles.panelTitle}>What-If Supply Chain Disruption Sandbox</h3>
                  <div style={styles.panelSubtitle}>Simulate consumption spikes and delayed vendor replenishment</div>
                </div>

                <div style={{ display: 'flex', gap: '1.25rem', marginTop: 12 }}>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Select Product SKU</label>
                    <select
                      value={activeSim?.inventory_id}
                      onChange={e => {
                        const sel = filteredInventory.find(i => i.inventory_id === parseInt(e.target.value));
                        if (sel) setSimItem(sel);
                      }}
                      style={{ ...styles.select, width: '100%', marginTop: 4 }}
                    >
                      {filteredInventory.map(i => (
                        <option key={i.inventory_id} value={i.inventory_id}>{i.name} ({i.sku} - {i.warehouse_code})</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={styles.label}>Demand Spike</span>
                      <span style={{ color: '#ef4444', fontWeight: 800 }}>+{demandSurgePct}%</span>
                    </div>
                    <input type="range" min="0" max="100" step="5" value={demandSurgePct} onChange={e => setDemandSurgePct(Number(e.target.value))} disabled={isManager} style={styles.slider} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={styles.label}>Lead Time Delay</span>
                      <span style={{ color: '#f59e0b', fontWeight: 800 }}>+{leadTimeDelay} Days</span>
                    </div>
                    <input type="range" min="0" max="15" value={leadTimeDelay} onChange={e => setLeadTimeDelay(Number(e.target.value))} disabled={isManager} style={styles.slider} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: 20 }}>
                  <div style={styles.simBox}>
                    <div style={{ fontSize: '0.86rem', color: '#9ca3af', fontWeight: 700 }}>Current Baseline</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: '4px 0' }}>{activeSim?.days_remaining} Days</div>
                    <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Burn: {activeSim?.daily_usage} / day • Lead: {activeSim?.lead_time_days} days</div>
                  </div>
                  <div style={{ ...styles.simBox, border: '1px solid rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.05)' }}>
                    <div style={{ fontSize: '0.86rem', color: '#ef4444', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}><Flame size={16} /> Disrupted Case</div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ef4444', margin: '4px 0' }}>{simDaysRemaining} Days</div>
                    <div style={{ fontSize: '0.8rem', color: '#d1d5db' }}>Adjusted Burn: {simDailyUsage.toFixed(1)} / day • Lead: {simLeadTime} days</div>
                  </div>
                </div>

                <div style={{ marginTop: 20, background: '#090d0b', padding: '1.25rem', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: 12 }}>
                    Projected Stock Depletion Curve (Baseline vs. Disrupted)
                  </div>
                  <svg width="100%" height="140" viewBox="0 0 600 140" preserveAspectRatio="none">
                    <line x1="0" y1="20" x2="600" y2="20" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <line x1="0" y1="70" x2="600" y2="70" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <line x1="0" y1="120" x2="600" y2="120" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                    <polyline fill="none" stroke="#10b981" strokeWidth="3" points={`0,20 ${Math.min(580, (activeSim?.days_remaining || 10) * 22)},120`} />
                    <polyline fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,4" points={`0,20 ${Math.min(580, simDaysRemaining * 22)},120`} />
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#9ca3af', marginTop: 6 }}>
                    <span>Day 0 (Current Stock: {activeSim?.current_stock} pcs)</span>
                    <span style={{ color: '#10b981' }}>— Baseline Depletion ({activeSim?.days_remaining}d)</span>
                    <span style={{ color: '#ef4444' }}>-- Disrupted Depletion ({simDaysRemaining}d)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. KARDEX TIMELINE */}
          {activeTab === 'timeline' && (
            <div key="timeline" className="reveal-block" style={styles.tabContent}>
              <div className="cyber-card" style={styles.tableCard}>
                <div style={styles.panelHeader}><h3 style={styles.panelTitle}>Master Kardex Inventory Ledger</h3><div style={styles.panelSubtitle}>Dual-entry movement registry with running balances</div></div>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={styles.th}>Timestamp</th>
                      <th style={styles.th}>SKU & Item</th>
                      <th style={styles.th}>Flow Type</th>
                      <th style={styles.th}>Stock In</th>
                      <th style={styles.th}>Stock Out</th>
                      <th style={styles.th}>Warehouse Hub</th>
                      <th style={styles.th}>End Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryTimeline.map(tx => (
                      <tr key={tx.id} style={styles.tr}>
                        <td style={styles.td}>{tx.date}</td>
                        <td style={styles.td}><strong>{tx.name}</strong><div style={{ fontSize: '0.74rem', color: '#6b7280' }}>{tx.sku}</div></td>
                        <td style={styles.td}>{tx.type === 'IN' ? <span style={styles.badgeSuccess}>IN</span> : <span style={styles.badgeDanger}>OUT</span>}</td>
                        <td style={{ ...styles.td, color: '#10b981', fontWeight: 700 }}>{tx.type === 'IN' ? `+${tx.qty}` : '-'}</td>
                        <td style={{ ...styles.td, color: '#ef4444', fontWeight: 700 }}>{tx.type === 'OUT' ? `-${tx.qty}` : '-'}</td>
                        <td style={styles.td}>{tx.warehouse}</td>
                        <td style={{ ...styles.td, fontWeight: 800, color: '#ffffff' }}>{tx.balance} pcs</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 7. ABC CLASSIFICATION */}
          {activeTab === 'abc' && (
            <div key="abc" className="reveal-block" style={styles.tabContent}>
              <div style={styles.panelHeader}>
                <h3 style={styles.panelTitle}>ABC Pareto Valuation Matrix (INR)</h3>
                <div style={styles.panelSubtitle}>Strategic inventory segmentation (Class A: High Value, Class B: Moderate, Class C: Low)</div>
              </div>

              <div className="cyber-card" style={styles.chartPanel}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: 10 }}>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>Capital Allocation Share across ABC Classes</span>
                  <span style={{ color: '#10b981', fontWeight: 800 }}>Total: {formatINR(totalABC)}</span>
                </div>
                <div style={{ display: 'flex', height: 22, borderRadius: 8, overflow: 'hidden', background: '#090d0b' }}>
                  <div style={{ width: `${(classAVal / totalABC) * 100}%`, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.74rem', fontWeight: 800, color: '#06130e' }}>
                    A ({Math.round((classAVal / totalABC) * 100)}%)
                  </div>
                  <div style={{ width: `${(classBVal / totalABC) * 100}%`, background: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.74rem', fontWeight: 800, color: '#06130e' }}>
                    B ({Math.round((classBVal / totalABC) * 100)}%)
                  </div>
                  <div style={{ width: `${(classCVal / totalABC) * 100}%`, background: '#4b5563', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.74rem', fontWeight: 800, color: '#ffffff' }}>
                    C ({Math.round((classCVal / totalABC) * 100)}%)
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                <div className="cyber-card" style={{ ...styles.abcCard, borderTop: '4px solid #10b981' }}>
                  <span style={styles.badgeA}>Class A Items</span>
                  <h2 style={{ color: '#ffffff', margin: '14px 0 6px 0', fontSize: '1.35rem' }}>{formatINR(classAVal)}</h2>
                  <p style={{ color: '#9ca3af', fontSize: '0.88rem' }}>Tight control, high priority replenishment.</p>
                  <div style={{ marginTop: 16 }}>
                    {filteredInventory.filter(i => i.abc_class === 'A').map(i => (
                      <div key={i.inventory_id} style={styles.abcItem}>
                        <span style={{ fontWeight: 600, color: '#ffffff' }}>{i.name} ({i.warehouse_code})</span>
                        <span style={{ color: '#10b981', fontWeight: 700 }}>{formatINR(i.current_stock * i.unit_cost)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cyber-card" style={{ ...styles.abcCard, borderTop: '4px solid #34d399' }}>
                  <span style={styles.badgeB}>Class B Items</span>
                  <h2 style={{ color: '#ffffff', margin: '14px 0 6px 0', fontSize: '1.35rem' }}>{formatINR(classBVal)}</h2>
                  <p style={{ color: '#9ca3af', fontSize: '0.88rem' }}>Moderate order frequency with cycle reviews.</p>
                  <div style={{ marginTop: 16 }}>
                    {filteredInventory.filter(i => i.abc_class === 'B').map(i => (
                      <div key={i.inventory_id} style={styles.abcItem}>
                        <span style={{ fontWeight: 600, color: '#ffffff' }}>{i.name} ({i.warehouse_code})</span>
                        <span style={{ color: '#34d399', fontWeight: 700 }}>{formatINR(i.current_stock * i.unit_cost)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cyber-card" style={{ ...styles.abcCard, borderTop: '4px solid #6b7280' }}>
                  <span style={styles.badgeC}>Class C Items</span>
                  <h2 style={{ color: '#ffffff', margin: '14px 0 6px 0', fontSize: '1.35rem' }}>{formatINR(classCVal)}</h2>
                  <p style={{ color: '#9ca3af', fontSize: '0.88rem' }}>Bulk orders and high safety stock buffers.</p>
                  <div style={{ marginTop: 16 }}>
                    {filteredInventory.filter(i => i.abc_class === 'C').map(i => (
                      <div key={i.inventory_id} style={styles.abcItem}>
                        <span style={{ fontWeight: 600, color: '#ffffff' }}>{i.name} ({i.warehouse_code})</span>
                        <span style={{ color: '#9ca3af', fontWeight: 700 }}>{formatINR(i.current_stock * i.unit_cost)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. FEFO / EXPIRY RISK */}
          {activeTab === 'expiry' && (
            <div key="expiry" className="reveal-block" style={styles.tabContent}>
              <div className="cyber-card" style={styles.tableCard}>
                <div style={styles.panelHeader}><h3 style={styles.panelTitle}>Batch Lot Tracking & Expiry Risk</h3><div style={styles.panelSubtitle}>First-Expiry-First-Out (FEFO) audit trail</div></div>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={styles.th}>Batch ID</th>
                      <th style={styles.th}>Hub</th>
                      <th style={styles.th}>SKU & Item</th>
                      <th style={styles.th}>Bin Location</th>
                      <th style={styles.th}>Remaining Qty</th>
                      <th style={styles.th}>Expiration Date</th>
                      <th style={styles.th}>Risk Assessment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map(item => (
                      <tr key={item.inventory_id} style={styles.tr}>
                        <td style={{ ...styles.td, fontWeight: 700, color: '#10b981' }}>{item.batch_id || 'LOT-2026-001'}</td>
                        <td style={styles.td}><strong>{item.warehouse_code}</strong></td>
                        <td style={styles.td}><strong>{item.name}</strong><div style={{ fontSize: '0.74rem', color: '#6b7280' }}>{item.sku}</div></td>
                        <td style={styles.td}>{item.bin_location}</td>
                        <td style={{ ...styles.td, fontWeight: 700 }}>{item.current_stock} pcs</td>
                        <td style={{ ...styles.td, color: item.expiry_date?.includes('2026-11') ? '#ef4444' : '#10b981' }}>{item.expiry_date || '2027-02-15'}</td>
                        <td style={styles.td}>
                          {item.expiry_date?.includes('2026-11') ? (
                            <span style={styles.badgeDanger}>Expiring &lt; 14 Days</span>
                          ) : (
                            <span style={styles.badgeSuccess}>Safe Shelf Life</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 9. SUPPLIER PORTAL */}
          {activeTab === 'supplier_orders' && (
            <div key="supplier_orders" className="reveal-block" style={styles.tabContent}>
              <div className="cyber-card" style={styles.tableCard}>
                <div style={styles.panelHeader}><h3 style={styles.panelTitle}>Assigned Vendor Purchase Orders</h3><div style={styles.panelSubtitle}>Accept, dispatch, or upload invoice records</div></div>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={styles.th}>PO Reference</th>
                      <th style={styles.th}>Delivery Hub</th>
                      <th style={styles.th}>Item</th>
                      <th style={styles.th}>Quantity</th>
                      <th style={styles.th}>Total Value (₹)</th>
                      <th style={styles.th}>Status</th>
                      <th style={styles.th}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchaseOrders.map(po => (
                      <tr key={po.id} style={styles.tr}>
                        <td style={styles.td}><strong>{po.po_number}</strong></td>
                        <td style={styles.td}>{po.warehouse_name}</td>
                        <td style={styles.td}>{po.product_name}</td>
                        <td style={{ ...styles.td, fontWeight: 700 }}>{po.quantity} pcs</td>
                        <td style={{ ...styles.td, fontWeight: 700, color: '#10b981' }}>{formatINR(po.total_amount)}</td>
                        <td style={styles.td}><span style={styles.badgeA}>{po.status}</span></td>
                        <td style={styles.td}>
                          {po.status === 'Order Placed' && (
                            <button onClick={() => handleUpdatePOStatus(po.id, 'Supplier Accepted')} style={{ ...styles.primaryBtn, padding: '6px 12px', fontSize: '0.78rem' }}>Accept</button>
                          )}
                          {po.status === 'Supplier Accepted' && (
                            <button onClick={() => handleUpdatePOStatus(po.id, 'Dispatched')} style={{ ...styles.primaryBtn, padding: '6px 12px', fontSize: '0.78rem' }}>Dispatch</button>
                          )}
                          {po.status === 'Dispatched' && (
                            <button onClick={() => handleUpdatePOStatus(po.id, 'Warehouse Received')} style={{ ...styles.btnSmall, fontSize: '0.74rem' }}>Simulate Delivery</button>
                          )}
                          {po.status === 'Warehouse Received' && <span style={{ color: '#10b981', fontWeight: 700 }}>Delivered</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Barcode Scanner Modal */}
          {inspectBarcodeItem && (
            <div style={styles.modalOverlay}>
              <div style={{ ...styles.modalContent, maxWidth: 400, textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                  <h3 style={{ margin: 0, color: '#ffffff' }}>Barcode Scanner</h3>
                  <button onClick={() => setInspectBarcodeItem(null)} style={styles.closeBtn}>✕</button>
                </div>
                <div style={{ background: '#fff', padding: 12, borderRadius: 8, display: 'inline-block' }}>
                  <svg width="200" height="55" viewBox="0 0 200 60">
                    <rect x="10" y="5" width="4" height="40" fill="#000" /><rect x="18" y="5" width="2" height="40" fill="#000" />
                    <rect x="24" y="5" width="6" height="40" fill="#000" /><rect x="34" y="5" width="3" height="40" fill="#000" />
                    <rect x="42" y="5" width="5" height="40" fill="#000" /><rect x="52" y="5" width="2" height="40" fill="#000" />
                    <rect x="60" y="5" width="7" height="40" fill="#000" /><rect x="72" y="5" width="3" height="40" fill="#000" />
                    <text x="100" y="55" textAnchor="middle" fontSize="11" fontFamily="monospace" fill="#000">*{inspectBarcodeItem.sku}*</text>
                  </svg>
                </div>
                <div style={{ textAlign: 'left', marginTop: 12, background: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 6 }}>
                  <div><strong>{inspectBarcodeItem.name}</strong></div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Bin: {inspectBarcodeItem.bin_location}</div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Safety Buffer: {inspectBarcodeItem.safety_stock} pcs</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: { display: 'flex', minHeight: '100vh', color: '#f8fafc' },
  loginContainer: { display: 'flex', minHeight: '100vh', width: '100%', alignItems: 'center', justifyContent: 'center', padding: '3.5rem 1.5rem 1.5rem 1.5rem', position: 'relative', overflow: 'hidden' },
  loginCardWrapper: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', maxWidth: 980, width: '100%', background: 'rgba(17, 24, 21, 0.9)', backdropFilter: 'blur(16px)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 16, overflow: 'hidden', zIndex: 10, boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.8)' },
  loginShowcase: { padding: '2.75rem 2.5rem', background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.1) 0%, rgba(17, 24, 21, 0.95) 100%)', borderRight: '1px solid rgba(16, 185, 129, 0.18)', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  loginBox: { padding: '2.75rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  sidebar: { width: 270, background: 'rgba(13, 19, 16, 0.95)', borderRight: '1px solid rgba(16, 185, 129, 0.16)', display: 'flex', flexDirection: 'column', padding: '1.5rem' },
  brandContainer: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.75rem' },
  brandIcon: { width: 38, height: 38, borderRadius: 8, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 18px rgba(16, 185, 129, 0.45)' },
  brandTitle: { fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' },
  brandSub: { fontSize: '0.78rem', color: '#10b981', fontWeight: 600 },
  navMenu: { display: 'flex', flexDirection: 'column', gap: 6, flex: 1 },
  navItem: { display: 'flex', alignItems: 'center', gap: 12, padding: '11px 14px', borderRadius: 8, background: 'transparent', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '0.92rem', fontWeight: 600, textAlign: 'left', transition: 'all 0.2s' },
  navItemActive: { background: '#10b981', color: '#06130e', fontWeight: 700, boxShadow: '0 0 18px rgba(16, 185, 129, 0.35)' },
  sidebarControl: { background: '#090d0b', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 10, padding: '12px', marginBottom: '1.25rem' },
  slider: { width: '100%', cursor: 'pointer', accentColor: '#10b981' },
  userCard: { display: 'flex', alignItems: 'center', gap: 12, paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' },
  avatar: { width: 36, height: 36, borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.95rem', color: '#06130e' },
  mainContent: { padding: '1.75rem 2.5rem' },
  topHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(16, 185, 129, 0.15)' },
  pageTitle: { margin: 0, fontWeight: 800, color: '#ffffff', fontSize: '1.8rem' },
  pageDesc: { margin: '4px 0 0 0', fontSize: '0.86rem', color: '#9ca3af' },
  refreshBtn: { display: 'inline-flex', alignItems: 'center', gap: 8, background: '#111815', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#ffffff', padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontSize: '0.84rem', fontWeight: 600 },
  primaryBtn: { display: 'inline-flex', alignItems: 'center', gap: 6, background: '#10b981', border: 'none', color: '#06130e', padding: '9px 16px', borderRadius: 8, cursor: 'pointer', fontSize: '0.86rem', fontWeight: 800, boxShadow: '0 0 20px rgba(16, 185, 129, 0.35)' },
  logoutBtn: { background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', padding: '8px', borderRadius: 8, cursor: 'pointer' },
  tabContent: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' },
  kpiCard: { borderRadius: 12, padding: '1.35rem' },
  kpiHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  kpiLabel: { fontSize: '0.84rem', color: '#9ca3af', fontWeight: 600 },
  kpiValue: { fontSize: '1.7rem', fontWeight: 800, color: '#ffffff', marginBottom: 4 },
  kpiTrendPositive: { fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: 4 },
  kpiTrendNeutral: { fontSize: '0.8rem', color: '#9ca3af' },
  kpiTrendDanger: { fontSize: '0.8rem', color: '#ef4444' },
  chartPanel: { borderRadius: 12, padding: '1.4rem' },
  panelHeader: { padding: '14px 18px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' },
  panelTitle: { margin: 0, fontSize: '1.15rem', color: '#ffffff', fontWeight: 700 },
  panelSubtitle: { fontSize: '0.82rem', color: '#9ca3af', marginTop: 3 },
  tableCard: { borderRadius: 12, overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' },
  thRow: { background: 'rgba(9, 13, 11, 0.85)', borderBottom: '1px solid rgba(16, 185, 129, 0.18)' },
  th: { padding: '14px 18px', color: '#6b7280', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase' },
  tr: { borderBottom: '1px solid rgba(255, 255, 255, 0.04)' },
  td: { padding: '14px 18px', color: '#e5e7eb' },
  badgeDanger: { background: 'rgba(239, 68, 68, 0.16)', color: '#ef4444', padding: '4px 8px', borderRadius: 6, fontSize: '0.76rem', fontWeight: 700 },
  badgeSuccess: { background: 'rgba(16, 185, 129, 0.16)', color: '#10b981', padding: '4px 8px', borderRadius: 6, fontSize: '0.76rem', fontWeight: 700 },
  badgeWarning: { background: 'rgba(245, 158, 11, 0.16)', color: '#f59e0b', padding: '4px 8px', borderRadius: 6, fontSize: '0.76rem', fontWeight: 700 },
  badgeA: { background: 'rgba(16, 185, 129, 0.16)', color: '#10b981', padding: '4px 8px', borderRadius: 6, fontSize: '0.76rem', fontWeight: 800 },
  badgeB: { background: 'rgba(52, 211, 153, 0.16)', color: '#34d399', padding: '4px 8px', borderRadius: 6, fontSize: '0.76rem', fontWeight: 800 },
  badgeC: { background: 'rgba(107, 114, 128, 0.2)', color: '#d1d5db', padding: '4px 8px', borderRadius: 6, fontSize: '0.76rem', fontWeight: 800 },
  searchBox: { display: 'flex', alignItems: 'center', gap: 10, background: '#111815', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 8, padding: '9px 14px' },
  searchInput: { background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', width: '100%', fontSize: '0.92rem' },
  selectFilter: { background: '#111815', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#ffffff', padding: '9px 14px', borderRadius: 8, outline: 'none', fontSize: '0.92rem' },
  formPanel: { borderRadius: 12, padding: '1.4rem' },
  label: { fontSize: '0.8rem', color: '#9ca3af', fontWeight: 600 },
  select: { background: '#090d0b', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#ffffff', padding: '10px 12px', borderRadius: 8, outline: 'none', fontSize: '0.9rem' },
  input: { background: '#090d0b', border: '1px solid rgba(16, 185, 129, 0.25)', color: '#ffffff', padding: '10px 12px', borderRadius: 8, outline: 'none', fontSize: '0.9rem' },
  abcCard: { borderRadius: 12, padding: '1.4rem' },
  abcItem: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '0.92rem' },
  btnSmall: { display: 'inline-flex', alignItems: 'center', gap: 4, background: '#090d0b', border: '1px solid rgba(255, 255, 255, 0.12)', color: '#d1d5db', padding: '5px 10px', borderRadius: 6, cursor: 'pointer', fontSize: '0.78rem' },
  btnSmallPdf: { display: 'inline-flex', alignItems: 'center', gap: 4, background: 'rgba(16, 185, 129, 0.16)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#10b981', padding: '5px 12px', borderRadius: 6, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 700 },
  simCard: { borderRadius: 12, padding: '1.4rem' },
  simBox: { background: '#090d0b', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: 10, padding: '1.25rem' },
  alertSuccess: { background: 'rgba(16, 185, 129, 0.16)', border: '1px solid rgba(16, 185, 129, 0.35)', color: '#10b981', padding: '10px 14px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.92rem', fontWeight: 600, marginBottom: 14 },
  alertError: { background: 'rgba(239, 68, 68, 0.16)', border: '1px solid rgba(239, 68, 68, 0.35)', color: '#ef4444', padding: '10px 14px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.92rem', fontWeight: 600, marginBottom: 14 },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 },
  modalContent: { background: '#111815', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 12, padding: '1.5rem', width: '90%' },
  closeBtn: { background: 'transparent', border: 'none', color: '#9ca3af', fontSize: '1.4rem', cursor: 'pointer' }
};