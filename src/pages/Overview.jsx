import React from "react";
import {
  BarChart, Bar, ComposedChart, Line, PieChart, Pie,
  CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend,
} from "recharts";
import { Receipt, Wallet, ShoppingBasket, Coins, PieChart as PieChartIcon } from "lucide-react";
import { KpiCard, Panel, HBar, Dot } from "../components/ui.jsx";
import { monthlyTrend, monthlyPerf, topStores, topItems, stockMix, kpis } from "../data.js";
import { PRIMARY, PRIMARY_TINT, SUCCESS, SUCCESS_TINT, WARNING, WARNING_TINT, SLATE, SLATE_TINT, BORDER, MUTED, FAINT, TEXT, CHART_MUTED, CHART_TINT, tooltipStyle } from "../tokens.js";
import { Money } from "../currency.jsx";

const kpiIcons = [
  { icon: Receipt, tint: PRIMARY_TINT, fg: PRIMARY },
  { icon: Wallet, tint: SUCCESS_TINT, fg: SUCCESS },
  { icon: ShoppingBasket, tint: SLATE_TINT, fg: SLATE },
  { icon: Coins, tint: WARNING_TINT, fg: WARNING },
  { icon: Wallet, tint: SUCCESS_TINT, fg: SUCCESS },
  { icon: PieChartIcon, tint: PRIMARY_TINT, fg: PRIMARY },
];

const MONEY_LABELS = new Set(["Revenue", "Holding Cost", "Net Profit"]);

export default function Overview() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14, marginBottom: 20 }}>
        {kpis.map((k, i) => (
          <KpiCard
            key={i}
            {...k}
            value={MONEY_LABELS.has(k.label) ? <Money value={k.value} /> : k.value}
            {...kpiIcons[i]}
          />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Panel
          title="Monthly Sales Trend"
          subtitle="Current vs. last year, \u20B9 in lakh"
          right={<div><Dot color={PRIMARY} label="Current Year" /><Dot color={FAINT} label="Last Year" /></div>}
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyTrend} margin={{ top: 4, right: 4, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={BORDER} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: MUTED }} axisLine={{ stroke: BORDER }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: MUTED }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(37,99,235,0.05)" }} />
              <Bar dataKey="last" name="Last Year" fill={CHART_MUTED} radius={[3, 3, 0, 0]} barSize={10} />
              <Bar dataKey="current" name="Current Year" fill={PRIMARY} radius={[3, 3, 0, 0]} barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel
          title="Monthly Performance"
          subtitle="Revenue vs. profit trend"
          right={<div style={{ textAlign: "right" }}><div style={{ fontSize: 10.5, color: MUTED }}>GROSS MARGIN</div><div style={{ fontSize: 16, fontWeight: 700, color: SUCCESS }}>21.8%</div></div>}
        >
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
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <Panel title="Top 5 Stores" subtitle="By revenue, \u20B9 in lakh">
          <HBar items={topStores} />
        </Panel>
        <Panel title="Inventory by Stock Status" subtitle="Share of total SKUs">
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <ResponsiveContainer width={130} height={150}>
              <PieChart>
                <Pie data={stockMix} dataKey="value" nameKey="name" innerRadius={42} outerRadius={64} paddingAngle={2}>
                  {stockMix.map((s, i) => <Cell key={i} fill={s.color} stroke="none" />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} formatter={(v, n) => [`${v}%`, n]} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {stockMix.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: MUTED }}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: s.color }} />
                  {s.name} <span style={{ color: TEXT, fontWeight: 600 }}>{s.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
        <Panel title="Top 5 SKUs" subtitle="By units sold, thousands">
          <HBar items={topItems} />
        </Panel>
      </div>
    </div>
  );
}
