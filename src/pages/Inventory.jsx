import React, { useMemo, useState } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Panel, Badge, DataTable, KpiCard } from "../components/ui.jsx";
import { inventory, statusColor } from "../data.js";
import { Boxes, AlertTriangle, TrendingUp, Archive } from "lucide-react";
import { PRIMARY, PRIMARY_TINT, WARNING, WARNING_TINT, DANGER, DANGER_TINT, SUCCESS, SUCCESS_TINT, MUTED, BORDER, TEXT, CARD, tooltipStyle } from "../tokens.js";
import { Money } from "../currency.jsx";

const STATUS_FILTERS = ["All", "Healthy", "Low Stock", "Overstock", "Dead Stock"];

export default function Inventory({ search }) {
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    return inventory.filter((it) => {
      const matchesStatus = status === "All" || it.status === status;
      const matchesSearch =
        !q ||
        it.name.toLowerCase().includes(q) ||
        it.sku.toLowerCase().includes(q) ||
        it.store.toLowerCase().includes(q) ||
        it.category.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [status, search]);

  const counts = STATUS_FILTERS.slice(1).map((s) => ({
    name: s,
    value: inventory.filter((i) => i.status === s).length,
    color: statusColor[s],
  }));

  const summary = [
    { icon: Boxes, tint: PRIMARY_TINT, fg: PRIMARY, label: "Total SKUs", value: String(inventory.length * 80), delta: "+2.1%", positive: true },
    { icon: AlertTriangle, tint: WARNING_TINT, fg: WARNING, label: "Low Stock Alerts", value: String(inventory.filter((i) => i.status === "Low Stock").length * 40), delta: "-4.0%", positive: true },
    { icon: TrendingUp, tint: SUCCESS_TINT, fg: SUCCESS, label: "Healthy Stock", value: "53.2%", delta: "+1.4pt", positive: true },
    { icon: Archive, tint: DANGER_TINT, fg: DANGER, label: "Dead Stock Value", value: <Money value="\u20B942L" />, delta: "+0.6%", positive: false },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {summary.map((s, i) => <KpiCard key={i} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }}>
        <Panel title="SKU Status Breakdown" subtitle="Count of SKU records by stock status">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={counts} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={BORDER} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: MUTED }} axisLine={{ stroke: BORDER }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: MUTED }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(37,99,235,0.05)" }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={44}>
                {counts.map((c, i) => <Cell key={i} fill={c.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Filter by Status" subtitle="Tap a status to filter the table">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                style={{
                  cursor: "pointer",
                  border: `1px solid ${status === s ? PRIMARY : BORDER}`,
                  background: status === s ? PRIMARY_TINT : CARD,
                  color: status === s ? PRIMARY : TEXT,
                  fontSize: 12.5,
                  fontWeight: 600,
                  padding: "8px 14px",
                  borderRadius: 999,
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 12, color: MUTED, lineHeight: 1.6 }}>
            Showing <strong style={{ color: TEXT }}>{filtered.length}</strong> of {inventory.length} sample SKU
            records{search ? <> matching “{search}”</> : null}.
          </div>
        </Panel>
      </div>

      <Panel title="Inventory Detail" subtitle="Per-SKU stock levels across stores">
        <DataTable
          columns={[
            { key: "sku", label: "SKU" },
            { key: "name", label: "Product" },
            { key: "category", label: "Category" },
            { key: "store", label: "Store" },
            { key: "stock", label: "Stock", align: "right" },
            { key: "reorder", label: "Reorder Pt.", align: "right" },
            { key: "status", label: "Status" },
          ]}
          rows={filtered}
          renderCell={(row, col) => {
            if (col.key === "status") return <Badge label={row.status} color={statusColor[row.status]} />;
            return row[col.key];
          }}
        />
      </Panel>
    </div>
  );
}
