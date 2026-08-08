import React, { useMemo, useState } from "react";
import { ComposedChart, Bar, Line, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Panel, Badge, DataTable, KpiCard } from "../components/ui.jsx";
import { monthlyPerf, recentOrders, orderStatusColor, salesByCategory } from "../data.js";
import { ShoppingCart, IndianRupee, Percent, PackageCheck } from "lucide-react";
import { PRIMARY, PRIMARY_TINT, SUCCESS, SUCCESS_TINT, WARNING_TINT, WARNING, MUTED, BORDER, TEXT, CARD, CHART_TINT, tooltipStyle } from "../tokens.js";
import { Money } from "../currency.jsx";

const PIE_COLORS = [PRIMARY, SUCCESS, WARNING, "#8B5CF6", "#0EA5E9"];

export default function Sales({ search }) {
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    return recentOrders.filter((o) => {
      const matchesStatus = statusFilter === "All" || o.status === statusFilter;
      const matchesSearch = !q || o.id.toLowerCase().includes(q) || o.store.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [statusFilter, search]);

  const summary = [
    { icon: ShoppingCart, tint: PRIMARY_TINT, fg: PRIMARY, label: "Orders Today", value: "312", delta: "+6.4%", positive: true },
    { icon: IndianRupee, tint: SUCCESS_TINT, fg: SUCCESS, label: "Revenue Today", value: <Money value="\u20B96.1L" />, delta: "+9.8%", positive: true },
    { icon: Percent, tint: WARNING_TINT, fg: WARNING, label: "Return Rate", value: "1.8%", delta: "+0.3pt", positive: false },
    { icon: PackageCheck, tint: SUCCESS_TINT, fg: SUCCESS, label: "Fulfilled On Time", value: "96.4%", delta: "+0.9pt", positive: true },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {summary.map((s, i) => <KpiCard key={i} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16, marginBottom: 16 }}>
        <Panel title="Revenue vs. Profit" subtitle="Monthly trend, \u20B9 in lakh">
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={monthlyPerf} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={BORDER} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: MUTED }} axisLine={{ stroke: BORDER }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: MUTED }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(37,99,235,0.05)" }} />
              <Bar dataKey="sales" name="Revenue" fill={CHART_TINT} radius={[3, 3, 0, 0]} barSize={16} />
              <Line type="monotone" dataKey="profit" name="Profit" stroke={SUCCESS} strokeWidth={2.25} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Sales by Category" subtitle="Share of revenue">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ResponsiveContainer width={130} height={160}>
              <PieChart>
                <Pie data={salesByCategory} dataKey="value" nameKey="name" innerRadius={40} outerRadius={62} paddingAngle={2}>
                  {salesByCategory.map((s, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [`${v}%`, n]} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {salesByCategory.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: MUTED }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: PIE_COLORS[i % PIE_COLORS.length] }} />
                  {s.name} <span style={{ color: TEXT, fontWeight: 600 }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      <Panel
        title="Recent Orders"
        subtitle="Latest transactions across all stores"
        right={
          <div style={{ display: "flex", gap: 6 }}>
            {["All", "Delivered", "Processing", "Cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  cursor: "pointer",
                  border: `1px solid ${statusFilter === s ? PRIMARY : BORDER}`,
                  background: statusFilter === s ? PRIMARY_TINT : CARD,
                  color: statusFilter === s ? PRIMARY : TEXT,
                  fontSize: 11.5,
                  fontWeight: 600,
                  padding: "6px 11px",
                  borderRadius: 999,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        }
      >
        <DataTable
          columns={[
            { key: "id", label: "Order ID" },
            { key: "store", label: "Store" },
            { key: "items", label: "Items", align: "right" },
            { key: "total", label: "Total", align: "right" },
            { key: "payment", label: "Payment" },
            { key: "status", label: "Status" },
          ]}
          rows={filtered}
          renderCell={(row, col) => {
            if (col.key === "status") return <Badge label={row.status} color={orderStatusColor[row.status]} />;
            if (col.key === "total") return <Money value={row.total} />;
            return row[col.key];
          }}
        />
      </Panel>
    </div>
  );
}
