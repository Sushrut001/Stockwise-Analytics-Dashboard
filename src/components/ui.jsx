import React from "react";
import { CARD, BORDER, TEXT, MUTED, SLATE_TINT, PRIMARY, SUCCESS, DANGER, shadow } from "../tokens.js";

export function KpiCard({ icon: Icon, tint, fg, label, value, delta, positive }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "16px 18px", boxShadow: shadow }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: tint, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={16} color={fg} strokeWidth={2} />
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: positive ? SUCCESS : DANGER }}>{delta}</span>
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: TEXT }}>{value}</div>
      <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{label}</div>
    </div>
  );
}

export function Panel({ title, subtitle, right, children, style: s }) {
  return (
    <div style={{ background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 20, boxShadow: shadow, ...s }}>
      {(title || right) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, gap: 12 }}>
          <div>
            {title && <div style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{title}</div>}
            {subtitle && <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{subtitle}</div>}
          </div>
          {right}
        </div>
      )}
      {children}
    </div>
  );
}

export function HBar({ items, unit = "K" }) {
  const max = Math.max(...items.map((i) => i.value));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      {items.map((it, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "112px 1fr auto", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12, color: MUTED, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{it.name}</div>
          <div style={{ height: 8, background: SLATE_TINT, borderRadius: 4, overflow: "hidden" }}>
            <div style={{ width: `${(it.value / max) * 100}%`, height: "100%", background: PRIMARY, borderRadius: 4, transition: "width 0.4s ease" }} />
          </div>
          <div style={{ fontSize: 12, fontWeight: 600, color: TEXT }}>{it.value}{unit}</div>
        </div>
      ))}
    </div>
  );
}

export function Dot({ color, label }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, color: MUTED, marginRight: 14 }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: color, display: "inline-block" }} />
      {label}
    </span>
  );
}

export function Badge({ label, color }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 11.5,
        fontWeight: 600,
        color,
        background: `${color}18`,
        padding: "3px 9px",
        borderRadius: 999,
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: 999, background: color }} />
      {label}
    </span>
  );
}

export function DataTable({ columns, rows, renderCell }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                style={{
                  textAlign: c.align || "left",
                  fontSize: 11,
                  fontWeight: 600,
                  color: MUTED,
                  textTransform: "uppercase",
                  letterSpacing: 0.3,
                  padding: "0 12px 10px",
                  borderBottom: `1px solid ${BORDER}`,
                  whiteSpace: "nowrap",
                }}
              >
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} style={{ borderBottom: ri === rows.length - 1 ? "none" : `1px solid ${BORDER}` }}>
              {columns.map((c) => (
                <td key={c.key} style={{ padding: "12px", color: TEXT, textAlign: c.align || "left" }}>
                  {renderCell ? renderCell(row, c) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <div style={{ padding: "28px 0", textAlign: "center", color: MUTED, fontSize: 13 }}>No matching results.</div>
      )}
    </div>
  );
}
