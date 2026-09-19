# Saving Plan — Local Wishlist & Savings Feasibility Planner

A fast, pragmatic, local web tool for planning wishes, budgeting savings, and calculating realistic purchase feasibility dates.

Inspired by [Wishing-Plan](https://github.com/Andreasgdp/Wishing-Plan), streamlined to focus purely on the **planning and feasibility calculation engine** without external cloud databases, OAuth, or account setup.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies (using Bun or Node)
bun install

# 2. Run local development server
bun run dev

# Open http://localhost:3000 in your browser!
```

### Production Build & Standalone Server

```bash
# Build frontend
bun run build

# Run standalone Bun server
bun start
```

### Run Tests

```bash
bun test
```

---

## 🎯 Core Features

- **Priority-Based Wishlist Queue**:
  - Add items with Title, Price, Category, Product Link, Priority Rank, and Notes.
  - Smooth drag-and-drop (`@dnd-kit`) and keyboard/arrow reordering.
  - Live calculations adapt immediately as you reorder items.

- **Intelligent Feasibility & Timeline Engine**:
  - **Current Saved Amount** & optional **Emergency Safety Cushion** (keeps a baseline safety buffer untouched).
  - **Regular Savings Contributions** (Monthly, Bi-weekly, Weekly, or Daily).
  - **Payday Scheduling** (e.g. deposit on the 25th of each month).
  - Calculates exact unlocked purchase dates, remaining deficit, and item-by-item progress percentages ($ saved allocated vs needed).
  - Optional **APY yield % compound interest simulation** for High-Yield Savings Accounts (HYSA).

- **Interactive "What-If" Scenario Simulator**:
  - Live slider to test: *"What if I save +$150 more per month?"* or *"What if I get a $1,000 tax refund/bonus?"*.
  - See all target purchase dates accelerate in real-time, with an option to make the scenario permanent.

- **Milestone & Schedule Breakdown**:
  - Visual milestone roadmap showing each item unlocking over time.
  - Expandable month-by-month projection table showing starting balance, monthly deposit, interest, ending balance, and unlocked wishes.

- **Purchased Archive & What-If Pausing**:
  - Mark items as purchased with celebratory confetti and track total spent in an archive.
  - Temporarily pause items to test "what-if" wishlist exclusions without deleting them.

- **Local Data Ownership & Persistence**:
  - Auto-saved directly to `./data/plan.json` on disk (and synced to `localStorage`).
  - Full JSON backup export & upload import.
  - CSV spreadsheet export.
  - Dark / Light / System theme support with zero layout shift.

---

## 📂 Project Structure

```
saving-plan/
├── data/
│   └── plan.json                 # Your local plan data (auto-persisted)
├── src/
│   ├── components/
│   │   ├── Header.tsx            # Navigation, quick stats & action buttons
│   │   ├── MetricsOverview.tsx   # Financial summary cards & progress bars
│   │   ├── WishItemCard.tsx      # Individual wish card with drag handle & progress
│   │   ├── WishList.tsx          # Drag & drop sortable container with search & filters
│   │   ├── WishModal.tsx         # Add / Edit item modal
│   │   ├── PlanSettingsModal.tsx # Financial config & currency modal
│   │   ├── WhatIfSimulator.tsx   # Live scenario slider tester
│   │   ├── MilestoneTimeline.tsx # Month-by-month savings growth & milestone table
│   │   ├── PurchasedHistoryModal.tsx # Archive of fulfilled items
│   │   └── ExportImportModal.tsx # JSON & CSV backup manager
│   ├── types/
│   │   └── plan.ts               # Core domain models & computed item types
│   ├── utils/
│   │   ├── calculator.ts         # Math calculation engine & timeline simulator
│   │   ├── calculator.test.ts    # Bun test suite for the math engine
│   │   ├── currency.ts           # Global currency presets & formatters
│   │   ├── defaults.ts           # Default sample plan dataset & categories
│   │   └── storage.ts            # Dual persistence (filesystem + localStorage)
│   ├── App.tsx                   # Main application state & orchestrator
│   ├── main.tsx                  # React entry point
│   ├── index.css                 # Tailwind CSS styles
│   └── server/
│       └── index.ts              # Standalone Bun HTTP server
├── index.html                    # HTML entry point
├── package.json                  # Dependencies & scripts
├── tailwind.config.js            # Tailwind theme tokens
├── tsconfig.json                 # TypeScript configuration
└── vite.config.ts                # Vite dev server with embedded persistence middleware
```
