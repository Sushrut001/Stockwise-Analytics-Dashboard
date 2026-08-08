import React, { useState, useRef, useEffect } from "react";
import { LayoutDashboard, Boxes, ShoppingCart, Truck, Search, Bell, Settings, AlertTriangle, PackageX, X, Moon, Sun } from "lucide-react";
import Overview from "./pages/Overview.jsx";
import Inventory from "./pages/Inventory.jsx";
import Sales from "./pages/Sales.jsx";
import Suppliers from "./pages/Suppliers.jsx";
import { inventory } from "./data.js";
import { BG, CARD, BORDER, TEXT, MUTED, PRIMARY, PRIMARY_TINT, WARNING, WARNING_TINT, DANGER, DANGER_TINT, HOVER, sans, shadow } from "./tokens.js";
import { CurrencyProvider, useCurrency } from "./currency.jsx";

const PAGES = {
  Overview: { icon: LayoutDashboard, title: "Executive Overview", subtitle: "Bazaario India Pvt Ltd \u00B7 Retail Inventory Intelligence", Component: Overview },
  Inventory: { icon: Boxes, title: "Inventory", subtitle: "Stock levels, reorder points & status across stores", Component: Inventory },
  Sales: { icon: ShoppingCart, title: "Sales", subtitle: "Orders, revenue and category performance", Component: Sales },
  Suppliers: { icon: Truck, title: "Suppliers", subtitle: "Vendor directory, lead times & reliability", Component: Suppliers },
};

import { BarChart3 } from "lucide-react";
const NAV_ORDER = ["Overview", "Inventory", "Sales", "Suppliers"];

const alerts = inventory
  .filter((i) => i.status === "Low Stock" || i.status === "Dead Stock")
  .map((i) => ({
    sku: i.sku,
    name: i.name,
    store: i.store,
    status: i.status,
    stock: i.stock,
    reorder: i.reorder,
  }));

export default function App() {
  return (
    <CurrencyProvider>
      <AppShell />
    </CurrencyProvider>
  );
}

function AppShell() {
  const [page, setPage] = useState("Overview");
  const [search, setSearch] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { currency, setCurrency } = useCurrency();

  const notifRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setSettingsOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const { title, subtitle, Component } = PAGES[page];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: BG, fontFamily: sans, color: TEXT }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 224,
          background: CARD,
          borderRight: `1px solid ${BORDER}`,
          padding: "20px 14px",
          position: "sticky",
          top: 0,
          height: "100vh",
          flexShrink: 0,
        }}
      >
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 8px", marginBottom: 26 }}>
  <div style={{ width: 30, height: 30, borderRadius: 8, background: PRIMARY, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <BarChart3 size={16} color="#fff" />
  </div>
  <div>
    <div style={{ fontSize: 12, fontWeight: 700, color: TEXT }}> Stockwise Analytics Dashboard</div>
  </div>
</div>

        {NAV_ORDER.map((key) => {
          const item = PAGES[key];
          const active = key === page;
          return (
            <div
              key={key}
              onClick={() => setPage(key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setPage(key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                marginBottom: 2,
                borderRadius: 8,
                cursor: "pointer",
                background: active ? PRIMARY_TINT : "transparent",
                color: active ? PRIMARY : MUTED,
                fontSize: 13,
                fontWeight: active ? 600 : 500,
                transition: "background 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--hover)"; }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
            >
              <item.icon size={16} />
              {key}
            </div>
          );
        })}

        <div style={{ position: "absolute", bottom: 20, left: 14, right: 14, padding: 12, borderRadius: 10, background: BG, border: `1px solid ${BORDER}` }}>
          <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.5 }}>
            Kaggle retail dataset
            <br />
            5 stores &middot; 4 regions &middot; 20 SKUs
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, minWidth: 0 }}>
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 5,
            background: "var(--header-bg)",
            backdropFilter: "blur(6px)",
            borderBottom: `1px solid ${BORDER}`,
            padding: "16px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>{title}</div>
            <div style={{ fontSize: 12, color: MUTED, marginTop: 1 }}>{subtitle}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: CARD,
                border: `1px solid ${BORDER}`,
                borderRadius: 8,
                padding: "7px 12px",
                fontSize: 12.5,
                color: MUTED,
                minWidth: 240,
              }}
            >
              <Search size={14} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, stores, suppliers\u2026"
                style={{ border: "none", outline: "none", background: "transparent", fontSize: 12.5, color: TEXT, width: "100%", fontFamily: sans }}
              />
            </div>
            {/* Notifications */}
            <div ref={notifRef} style={{ position: "relative" }}>
              <div
                onClick={() => { setNotifOpen((v) => !v); setSettingsOpen(false); }}
                style={{ position: "relative", cursor: "pointer", display: "flex" }}
              >
                <Bell size={17} color={notifOpen ? PRIMARY : MUTED} />
                {alerts.length > 0 && (
                  <span
                    style={{
                      position: "absolute", top: -4, right: -4, minWidth: 15, height: 15,
                      borderRadius: 8, background: DANGER, color: "#fff", fontSize: 9.5,
                      fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center",
                      padding: "0 3px", border: `1.5px solid ${CARD}`,
                    }}
                  >
                    {alerts.length}
                  </span>
                )}
              </div>
              {notifOpen && (
                <div
                  style={{
                    position: "absolute", top: 28, right: 0, width: 320, maxHeight: 380,
                    overflowY: "auto", background: CARD, border: `1px solid ${BORDER}`,
                    borderRadius: 10, boxShadow: shadow, zIndex: 20,
                  }}
                >
                  <div style={{ padding: "12px 14px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>Stock Alerts</div>
                    <div style={{ fontSize: 11, color: MUTED }}>{alerts.length} active</div>
                  </div>
                  {alerts.length === 0 ? (
                    <div style={{ padding: 20, textAlign: "center", fontSize: 12.5, color: MUTED }}>No alerts right now.</div>
                  ) : (
                    alerts.map((a, i) => {
                      const isDead = a.status === "Dead Stock";
                      const tint = isDead ? DANGER_TINT : WARNING_TINT;
                      const fg = isDead ? DANGER : WARNING;
                      const Icon = isDead ? PackageX : AlertTriangle;
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex", gap: 10, padding: "10px 14px",
                            borderBottom: i < alerts.length - 1 ? `1px solid ${BORDER}` : "none",
                          }}
                        >
                          <div style={{ width: 28, height: 28, borderRadius: 7, background: tint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <Icon size={14} color={fg} />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: 12.5, fontWeight: 600, color: TEXT, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
                            <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{a.store} &middot; {a.sku}</div>
                            <div style={{ fontSize: 11, color: fg, marginTop: 2, fontWeight: 600 }}>
                              {a.status} &middot; {a.stock} in stock (reorder at {a.reorder})
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>

            {/* Settings */}
            <div ref={settingsRef} style={{ position: "relative" }}>
              <Settings
                size={17}
                color={settingsOpen ? PRIMARY : MUTED}
                style={{ cursor: "pointer" }}
                onClick={() => { setSettingsOpen((v) => !v); setNotifOpen(false); }}
              />
              {settingsOpen && (
                <div
                  style={{
                    position: "absolute", top: 28, right: 0, width: 250,
                    background: CARD, border: `1px solid ${BORDER}`,
                    borderRadius: 10, boxShadow: shadow, zIndex: 20, padding: 14,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: TEXT }}>Settings</div>
                    <X size={14} color={MUTED} style={{ cursor: "pointer" }} onClick={() => setSettingsOpen(false)} />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: TEXT }}>
                      {darkMode ? <Moon size={14} color={MUTED} /> : <Sun size={14} color={MUTED} />}
                      Dark mode
                    </div>
                    <div
                      onClick={() => setDarkMode((v) => !v)}
                      style={{
                        width: 34, height: 19, borderRadius: 10, cursor: "pointer",
                        background: darkMode ? PRIMARY : "#CBD5E1", position: "relative", transition: "background 0.15s",
                      }}
                    >
                      <div style={{ position: "absolute", top: 2, left: darkMode ? 17 : 2, width: 15, height: 15, borderRadius: "50%", background: "#fff", transition: "left 0.15s" }} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 4 }}>
                    <div style={{ fontSize: 12.5, color: TEXT, marginBottom: 6 }}>Currency display</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {["INR", "USD"].map((c) => (
                        <div
                          key={c}
                          onClick={() => setCurrency(c)}
                          style={{
                            flex: 1, textAlign: "center", padding: "6px 0", borderRadius: 7,
                            fontSize: 11.5, fontWeight: 600, cursor: "pointer",
                            background: currency === c ? PRIMARY_TINT : BG,
                            color: currency === c ? PRIMARY : MUTED,
                            border: `1px solid ${currency === c ? PRIMARY : BORDER}`,
                          }}
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </header>

        <div style={{ padding: 28 }}>
          <Component search={search} />
        </div>
      </main>
    </div>
  );
}
