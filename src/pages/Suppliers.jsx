import React, { useMemo } from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Panel, KpiCard, DataTable, Badge } from "../components/ui.jsx";
import { suppliers } from "../data.js";
import { Truck, Clock, ShieldCheck, Building2 } from "lucide-react";
import { PRIMARY, PRIMARY_TINT, SUCCESS, SUCCESS_TINT, WARNING, WARNING_TINT, DANGER, MUTED, BORDER, tooltipStyle } from "../tokens.js";

function reliabilityColor(v) {
  if (v >= 95) return SUCCESS;
  if (v >= 90) return WARNING;
  return DANGER;
}

export default function Suppliers({ search }) {
  const filtered = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    if (!q) return suppliers;
    return suppliers.filter((s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
  }, [search]);

  const chartData = suppliers.map((s) => ({ name: s.name.split(" ")[0], value: s.reliability, color: reliabilityColor(s.reliability) }));

  const summary = [
    { icon: Truck, tint: PRIMARY_TINT, fg: PRIMARY, label: "Active Suppliers", value: String(suppliers.length), delta: "+1", positive: true },
    { icon: Clock, tint: WARNING_TINT, fg: WARNING, label: "Avg. Lead Time", value: "3.2 days", delta: "-0.4d", positive: true },
    { icon: ShieldCheck, tint: SUCCESS_TINT, fg: SUCCESS, label: "Avg. Reliability", value: "92.7%", delta: "+1.1pt", positive: true },
    { icon: Building2, tint: PRIMARY_TINT, fg: PRIMARY, label: "Categories Covered", value: "6", delta: "steady", positive: true },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {summary.map((s, i) => <KpiCard key={i} {...s} />)}
      </div>

      <Panel title="Supplier Reliability" subtitle="On-time & complete delivery score" style={{ marginBottom: 16 }}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={BORDER} vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 11, fill: MUTED }} axisLine={{ stroke: BORDER }} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: MUTED }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(37,99,235,0.05)" }} formatter={(v) => [`${v}%`, "Reliability"]} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={36}>
              {chartData.map((c, i) => <Cell key={i} fill={c.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Panel>

      <Panel title="Supplier Directory" subtitle="Contacts and terms">
        <DataTable
          columns={[
            { key: "name", label: "Supplier" },
            { key: "category", label: "Category" },
            { key: "leadTime", label: "Lead Time" },
            { key: "reliability", label: "Reliability" },
            { key: "contact", label: "Contact" },
          ]}
          rows={filtered}
          renderCell={(row, col) => {
            if (col.key === "reliability") {
              const c = reliabilityColor(row.reliability);
              return <Badge label={`${row.reliability}%`} color={c} />;
            }
            return row[col.key];
          }}
        />
      </Panel>
    </div>
  );
}
