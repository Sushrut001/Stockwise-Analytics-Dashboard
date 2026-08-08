import React, { createContext, useContext, useState } from "react";

// Approximate INR -> USD rate used only for display conversion.
const INR_PER_USD = 83;

const CurrencyContext = createContext({ currency: "INR", setCurrency: () => {} });

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("INR");
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

// Parses strings like "\u20B924.6Cr", "\u20B96.1L", "\u20B94,120" into a raw rupee number.
function parseInr(str) {
  const m = String(str).match(/\u20B9\s*([\d,]+\.?\d*)\s*(Cr|L|K)?/i);
  if (!m) return null;
  const num = parseFloat(m[1].replace(/,/g, ""));
  const unit = (m[2] || "").toLowerCase();
  const mult = unit === "cr" ? 1e7 : unit === "l" ? 1e5 : unit === "k" ? 1e3 : 1;
  return num * mult;
}

function formatUsd(usd) {
  if (usd >= 1e6) return `$${(usd / 1e6).toFixed(2)}M`;
  if (usd >= 1e3) return `$${(usd / 1e3).toFixed(1)}K`;
  return `$${usd.toFixed(0)}`;
}

// Converts an INR-formatted display string to the active currency.
// Falls back to returning the original string if it isn't a recognizable INR amount.
export function convertMoney(str, currency) {
  if (currency !== "USD") return str;
  const rupees = parseInr(str);
  if (rupees === null) return str;
  return formatUsd(rupees / INR_PER_USD);
}

// Drop-in inline component: <Money value="\u20B924.6Cr" />
export function Money({ value }) {
  const { currency } = useCurrency();
  return <>{convertMoney(value, currency)}</>;
}
