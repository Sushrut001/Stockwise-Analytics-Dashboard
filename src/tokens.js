export const PRIMARY = "var(--primary)", PRIMARY_TINT = "var(--primary-tint)", PRIMARY_DARK = "var(--primary-dark)";
export const SUCCESS = "var(--success)", SUCCESS_TINT = "var(--success-tint)";
export const WARNING = "var(--warning)", WARNING_TINT = "var(--warning-tint)";
export const DANGER = "var(--danger)", DANGER_TINT = "var(--danger-tint)";
export const SLATE = "var(--slate)", SLATE_TINT = "var(--slate-tint)";
export const BG = "var(--bg)", CARD = "var(--card)", BORDER = "var(--border)";
export const TEXT = "var(--text)", MUTED = "var(--muted)", FAINT = "var(--faint)";
export const HOVER = "var(--hover)";
export const CHART_MUTED = "var(--chart-muted)", CHART_TINT = "var(--chart-tint)";

export const sans = "'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif";

// New: consistent type scale — use these instead of hardcoding fontSize everywhere
export const type = {
  h1: { fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" },
  h2: { fontSize: 14, fontWeight: 700, letterSpacing: "-0.005em" },
  body: { fontSize: 13, fontWeight: 500 },
  label: { fontSize: 11, fontWeight: 600, letterSpacing: "0.03em", textTransform: "uppercase" },
  caption: { fontSize: 11.5, fontWeight: 500, color: MUTED },
  numeric: { fontVariantNumeric: "tabular-nums" }, // use on every number/metric
};

export const radius = { sm: 7, md: 10, lg: 14 };
export const transition = "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)";

export const shadow = "0 1px 2px rgba(15,23,42,0.05), 0 4px 12px rgba(15,23,42,0.06)";
export const shadowHover = "0 2px 4px rgba(15,23,42,0.06), 0 8px 20px rgba(15,23,42,0.1)";

export const tooltipStyle = {
  background: CARD,
  border: `1px solid ${BORDER}`,
  borderRadius: radius.sm,
  fontSize: 12,
  color: TEXT,
  boxShadow: shadow,
};