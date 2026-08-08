# 📊 Stockwise — Retail Inventory Intelligence Dashboard

> A multi-store retail inventory and sales analytics dashboard built to surface stock health, sales performance, and profitability at a glance.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-Charts-22B5BF)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🧭 Overview

**Stockwise** is a frontend analytics dashboard that answers the core questions a retail operations or category manager asks every day:

- What's selling, and what's stuck?
- Which SKUs are about to run out?
- Which stores and categories are actually driving revenue?
- Are we profitable — not just busy?

It's built on a mock dataset modeled after a Kaggle retail dataset (5 stores, 4 regions, 20 SKUs), styled and structured to reflect how a real retail inventory intelligence tool would present this data to decision-makers.

---

## ✨ Features

- **Executive Overview** — KPI summary (orders, revenue, units sold, holding cost, net profit, gross margin) with month-over-month trend indicators
- **Monthly Sales Trend** — current year vs. last year comparison
- **Monthly Performance** — revenue vs. profit trend with gross margin tracking
- **Inventory Health** — stock status breakdown (Healthy / Low Stock / Overstock / Dead Stock) with real-time alerts
- **Top Performers** — top 5 stores by revenue, top 5 SKUs by units sold
- **Multi-page navigation** — dedicated Overview, Inventory, Sales, and Suppliers pages
- **Stock alerts panel** — surfaces low-stock and dead-stock items nearing reorder point
- **Currency toggle** — switch between INR and USD display
- **Dark mode** — full light/dark theme support via CSS custom properties
- **Global search** — search across products, stores, and suppliers

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| Charts | Recharts |
| Icons | Lucide React |
| Styling | CSS custom properties (design token system) |
| State | React Context (currency), local component state |

---

## 📁 Project Structure

```
stockwise-dashboard/
├── src/
│   ├── components/
│   │   └── ui.jsx          # Shared UI primitives (KpiCard, Panel, HBar, etc.)
│   ├── pages/
│   │   ├── Overview.jsx     # Executive KPI + trend charts
│   │   ├── Inventory.jsx    # Stock levels & reorder tracking
│   │   ├── Sales.jsx        # Orders, revenue, category performance
│   │   └── Suppliers.jsx    # Vendor directory & reliability
│   ├── App.jsx              # App shell, routing, header, sidebar
│   ├── currency.jsx         # Currency context provider (INR/USD)
│   ├── data.js               # Mock dataset (retail inventory, sales)
│   ├── tokens.js             # Design tokens (colors, shadows, type scale)
│   └── main.jsx               # App entry point
├── index.html                 # Root HTML + CSS variable theme definitions
├── vite.config.js
└── package.json
```

---

## 📦 Dataset

The dashboard runs on a mock dataset modeled after a **Kaggle retail dataset**, covering:

- **5 stores** across **4 regions**
- **20 SKUs** spanning multiple categories (Furniture, Clothing, Toys, Groceries, etc.)
- Derived views (alerts, KPIs, top performers) are computed from the base dataset rather than hardcoded — so all figures stay consistent if the underlying data changes.

> Note: this is a static, portfolio-oriented dataset — not a live production feed.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/stockwise-dashboard.git
cd stockwise-dashboard

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

---

## 🧩 Problems This Project Solves

| Problem | How Stockwise addresses it |
|---|---|
| **Stock visibility** | Instant breakdown of Healthy / Low Stock / Overstock / Dead Stock across all SKUs |
| **Reorder timing** | Alerts panel flags items nearing their reorder point before they run out |
| **Performance comparison** | Top 5 Stores and Top 5 SKUs surface what's actually driving revenue |
| **Profitability blind spots** | Holding cost, net profit, and gross margin metrics go beyond raw revenue |
| **Trend awareness** | Month-over-month and year-over-year comparisons show momentum, not just snapshots |

---

## 🗺️ Roadmap / Future Improvements

- [ ] Add reorder point forecasting (moving average / EOQ-based)
- [ ] Add stockout-risk scoring per SKU based on sales velocity
- [ ] Move mock data into a lightweight backend (SQLite/Postgres + API layer)
- [ ] Add anomaly detection callouts (e.g. "Sales dropped 15% vs. last month")
- [ ] Deploy live demo (Vercel/Netlify)

---

## 👤 Author

**Sushrut**
Aspiring Data Analyst | Pune, India
Built as part of a data analytics portfolio.

---

## 📄 License

This project is licensed under the MIT License — free to use, modify, and learn from.
