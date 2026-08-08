import { SUCCESS, WARNING, PRIMARY, DANGER } from "./tokens.js";

// Source: Kaggle "Retail Store Inventory Forecasting Dataset"
// https://www.kaggle.com/datasets/anirudhchauhan/retail-store-inventory-forecasting-dataset
// Aggregated from 73,100 daily records (2022-2023) across 5 stores, 20 SKUs, 5 categories.
// Revenue/profit/holding-cost figures are derived using standard retail assumptions
// (22% gross margin, 3% holding cost) since the raw dataset has no direct profit/cost fields.

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const monthlyTrend = [
  {
    "month": "Jan",
    "current": 207.2,
    "last": 209.2
  },
  {
    "month": "Feb",
    "current": 192.3,
    "last": 190.6
  },
  {
    "month": "Mar",
    "current": 209.4,
    "last": 215.2
  },
  {
    "month": "Apr",
    "current": 202.0,
    "last": 203.1
  },
  {
    "month": "May",
    "current": 207.3,
    "last": 205.4
  },
  {
    "month": "Jun",
    "current": 200.5,
    "last": 209.8
  },
  {
    "month": "Jul",
    "current": 213.1,
    "last": 212.9
  },
  {
    "month": "Aug",
    "current": 205.7,
    "last": 210.6
  },
  {
    "month": "Sep",
    "current": 198.8,
    "last": 206.3
  },
  {
    "month": "Oct",
    "current": 209.1,
    "last": 211.5
  },
  {
    "month": "Nov",
    "current": 207.1,
    "last": 207.2
  },
  {
    "month": "Dec",
    "current": 206.5,
    "last": 202.7
  }
];

export const monthlyPerf = [
  {
    "month": "Jan",
    "sales": 207.2,
    "profit": 45.6
  },
  {
    "month": "Feb",
    "sales": 192.3,
    "profit": 42.3
  },
  {
    "month": "Mar",
    "sales": 209.4,
    "profit": 46.1
  },
  {
    "month": "Apr",
    "sales": 202.0,
    "profit": 44.4
  },
  {
    "month": "May",
    "sales": 207.3,
    "profit": 45.6
  },
  {
    "month": "Jun",
    "sales": 200.5,
    "profit": 44.1
  },
  {
    "month": "Jul",
    "sales": 213.1,
    "profit": 46.9
  },
  {
    "month": "Aug",
    "sales": 205.7,
    "profit": 45.3
  },
  {
    "month": "Sep",
    "sales": 198.8,
    "profit": 43.7
  },
  {
    "month": "Oct",
    "sales": 209.1,
    "profit": 46.0
  },
  {
    "month": "Nov",
    "sales": 207.1,
    "profit": 45.6
  },
  {
    "month": "Dec",
    "sales": 206.5,
    "profit": 45.4
  }
];

export const kpis = [
  {
    "label": "Orders",
    "value": "36,500",
    "delta": "+0.0%",
    "positive": true
  },
  {
    "label": "Revenue",
    "value": "\u20b924.6Cr",
    "delta": "-1.0%",
    "positive": false
  },
  {
    "label": "Units Sold",
    "value": "4.97M",
    "delta": "-0.4%",
    "positive": false
  },
  {
    "label": "Holding Cost",
    "value": "\u20b90.74Cr",
    "delta": "+2.1%",
    "positive": false
  },
  {
    "label": "Net Profit",
    "value": "\u20b95.41Cr",
    "delta": "-1.0%",
    "positive": true
  },
  {
    "label": "Gross Margin",
    "value": "22.0%",
    "delta": "+0.3pt",
    "positive": true
  }
];

export const topStores = [
  {
    "name": "Andheri West",
    "value": 498
  },
  {
    "name": "Koramangala",
    "value": 496
  },
  {
    "name": "Salt Lake",
    "value": 494
  },
  {
    "name": "Pune Camp",
    "value": 488
  },
  {
    "name": "Connaught Place",
    "value": 482
  }
];

export const topItems = [
  {
    "name": "Furniture",
    "value": 502
  },
  {
    "name": "Clothing",
    "value": 494
  },
  {
    "name": "Toys",
    "value": 488
  },
  {
    "name": "Groceries",
    "value": 488
  },
  {
    "name": "Electronics",
    "value": 487
  }
];

export const stockMix = [
  { name: "Healthy", value: 55.0, color: SUCCESS },
  { name: "Low Stock", value: 20.0, color: WARNING },
  { name: "Overstock", value: 15.1, color: PRIMARY },
  { name: "Dead Stock", value: 9.9, color: DANGER },
];

/* ---------------- Inventory ---------------- */
export const inventory = [
  {
    "sku": "P0004",
    "name": "Toys Item 004",
    "category": "Toys",
    "store": "Salt Lake",
    "stock": 158,
    "reorder": 946,
    "status": "Low Stock"
  },
  {
    "sku": "P0014",
    "name": "Electronics Item 014",
    "category": "Electronics",
    "store": "Koramangala",
    "stock": 230,
    "reorder": 1007,
    "status": "Healthy"
  },
  {
    "sku": "P0011",
    "name": "Groceries Item 011",
    "category": "Groceries",
    "store": "Connaught Place",
    "stock": 155,
    "reorder": 978,
    "status": "Low Stock"
  },
  {
    "sku": "P0006",
    "name": "Furniture Item 006",
    "category": "Furniture",
    "store": "Koramangala",
    "stock": 451,
    "reorder": 978,
    "status": "Overstock"
  },
  {
    "sku": "P0005",
    "name": "Electronics Item 005",
    "category": "Electronics",
    "store": "Koramangala",
    "stock": 411,
    "reorder": 1009,
    "status": "Healthy"
  },
  {
    "sku": "P0020",
    "name": "Groceries Item 020",
    "category": "Groceries",
    "store": "Andheri West",
    "stock": 284,
    "reorder": 1009,
    "status": "Healthy"
  },
  {
    "sku": "P0003",
    "name": "Clothing Item 003",
    "category": "Clothing",
    "store": "Andheri West",
    "stock": 372,
    "reorder": 931,
    "status": "Healthy"
  },
  {
    "sku": "P0001",
    "name": "Toys Item 001",
    "category": "Toys",
    "store": "Salt Lake",
    "stock": 300,
    "reorder": 917,
    "status": "Healthy"
  },
  {
    "sku": "P0011",
    "name": "Electronics Item 011",
    "category": "Electronics",
    "store": "Pune Camp",
    "stock": 449,
    "reorder": 927,
    "status": "Overstock"
  },
  {
    "sku": "P0001",
    "name": "Toys Item 001",
    "category": "Toys",
    "store": "Pune Camp",
    "stock": 223,
    "reorder": 961,
    "status": "Healthy"
  },
  {
    "sku": "P0019",
    "name": "Clothing Item 019",
    "category": "Clothing",
    "store": "Pune Camp",
    "stock": 149,
    "reorder": 943,
    "status": "Low Stock"
  },
  {
    "sku": "P0011",
    "name": "Groceries Item 011",
    "category": "Groceries",
    "store": "Andheri West",
    "stock": 156,
    "reorder": 949,
    "status": "Low Stock"
  }
];

export const statusColor = {
  "Healthy": SUCCESS,
  "Low Stock": WARNING,
  "Overstock": PRIMARY,
  "Dead Stock": DANGER,
};

/* ---------------- Sales ---------------- */
export const recentOrders = [
  {
    "id": "ORD-88200",
    "store": "Salt Lake",
    "items": 40,
    "total": "\u20b93,450",
    "payment": "UPI",
    "status": "Processing"
  },
  {
    "id": "ORD-88201",
    "store": "Andheri West",
    "items": 293,
    "total": "\u20b911,127",
    "payment": "Card",
    "status": "Processing"
  },
  {
    "id": "ORD-88202",
    "store": "Andheri West",
    "items": 16,
    "total": "\u20b91,009",
    "payment": "Cash",
    "status": "Processing"
  },
  {
    "id": "ORD-88203",
    "store": "Andheri West",
    "items": 15,
    "total": "\u20b9488",
    "payment": "UPI",
    "status": "Processing"
  },
  {
    "id": "ORD-88204",
    "store": "Andheri West",
    "items": 57,
    "total": "\u20b94,001",
    "payment": "Card",
    "status": "Delivered"
  },
  {
    "id": "ORD-88205",
    "store": "Andheri West",
    "items": 37,
    "total": "\u20b9932",
    "payment": "Cash",
    "status": "Delivered"
  },
  {
    "id": "ORD-88206",
    "store": "Andheri West",
    "items": 189,
    "total": "\u20b910,909",
    "payment": "UPI",
    "status": "Processing"
  },
  {
    "id": "ORD-88207",
    "store": "Andheri West",
    "items": 194,
    "total": "\u20b97,341",
    "payment": "Card",
    "status": "Delivered"
  }
];

export const orderStatusColor = {
  "Delivered": SUCCESS,
  "Processing": WARNING,
  "Cancelled": DANGER,
};

export const salesByCategory = [
  {
    "name": "Clothing",
    "value": 20
  },
  {
    "name": "Electronics",
    "value": 20
  },
  {
    "name": "Furniture",
    "value": 20
  },
  {
    "name": "Groceries",
    "value": 20
  },
  {
    "name": "Toys",
    "value": 20
  }
];

/* ---------------- Suppliers ---------------- */
// Note: the Kaggle dataset has no supplier records; these are illustrative
// vendors mapped to the 5 real product categories found in the dataset.
export const suppliers = [
  {
    "name": "NorthStar Distributors",
    "category": "Groceries",
    "leadTime": "3 days",
    "reliability": 94,
    "contact": "orders@northstar.example"
  },
  {
    "name": "PlayWorld Wholesale",
    "category": "Toys",
    "leadTime": "5 days",
    "reliability": 89,
    "contact": "supply@playworld.example"
  },
  {
    "name": "CircuitHub Electronics",
    "category": "Electronics",
    "leadTime": "6 days",
    "reliability": 91,
    "contact": "b2b@circuithub.example"
  },
  {
    "name": "HomeCraft Furnishings",
    "category": "Furniture",
    "leadTime": "8 days",
    "reliability": 87,
    "contact": "trade@homecraft.example"
  },
  {
    "name": "StyleThread Apparel",
    "category": "Clothing",
    "leadTime": "4 days",
    "reliability": 93,
    "contact": "orders@stylethread.example"
  }
];