# MedPredict – AI Disease Prediction Platform

> **Author:** Aayusha Bhatta (`aayushabhatta`)
> **Live (Replit):** https://medpredict.replit.app
> **Live (GitHub Pages):** https://aayusha44.github.io/Medipredictfinal/

An AI-powered health analytics platform that provides risk assessments for **Diabetes**, **Heart Disease**, and **Parkinson's Disease** using weighted clinical-factor simulation models, a modern glassmorphism React UI, and an Express + PostgreSQL backend.

---

## Features

- **Secure Login** – session-gated access (credentials: `aayushabhatta` / `1234`)
- **3 Disease Modules** – Diabetes (8 inputs), Heart Disease (11 inputs), Parkinson's (22 inputs)
- **Risk Analysis** – every input field is classified as Normal / Medium / High / Critical with reference ranges
- **Confidence Score** – animated confidence bar for each prediction
- **Dual Deployment** – works as a full-stack app (Replit / VPS) and as a static site (GitHub Pages)
- **Prediction History** – stored in PostgreSQL via Drizzle ORM

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Vite, Wouter, Tailwind CSS, Framer Motion, Shadcn UI |
| Backend | Express.js, Node.js, Drizzle ORM |
| Database | PostgreSQL |
| ML (optional) | Python, Scikit-Learn, Joblib, Pandas, NumPy |
| Deployment | Replit (full-stack) · GitHub Pages (static) |

---

## Quick Start – Local Development (VSCode / any terminal)

### Prerequisites

- Node.js 18+
- PostgreSQL (local or a free cloud instance like [Neon](https://neon.tech))
- *(Optional)* Python 3.10+ with pip for training ML models

### 1 – Clone the repo

```bash
git clone https://github.com/aayushabhatta/medpredict.git
cd medpredict
```

### 2 – Install dependencies

```bash
npm install
```

### 3 – Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and fill in your values:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/medpredict
SESSION_SECRET=replace-with-a-long-random-string
PORT=5000
```

### 4 – Initialise the database

```bash
# Option A – automatic schema push (recommended)
npm run db:push

# Option B – run the SQL file directly
psql $DATABASE_URL -f database/schema.sql
```

### 5 – Start the development server

```bash
npm run dev
```

Open **http://localhost:5000** in your browser.
Sign in with `aayushabhatta` / `1234`.

### 6 – (Optional) Train ML models

```bash
pip install -r requirements.txt   # or: pip3 install scikit-learn pandas numpy joblib
python3 train_models.py
```

If model `.pkl` files are present in `models/`, the app uses real predictions; otherwise it falls back to the built-in simulation engine.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start full-stack dev server (Express + Vite HMR) on port 5000 |
| `npm run build` | Production build (client → `dist/public`, server → `dist/index.cjs`) |
| `npm start` | Serve the production build |
| `npm run check` | TypeScript type-check |
| `npm run db:push` | Sync Drizzle schema to the database |

---

## Project Structure

```
medpredict/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Shared UI components (Sidebar, ResultCard …)
│       ├── hooks/          # use-predictions, custom hooks
│       ├── lib/            # queryClient, valueRanges, clientPredict
│       └── pages/          # Dashboard, DiabetesForm, HeartForm, ParkinsonsForm, Login
├── server/                 # Express backend
│   ├── index.ts            # Entry point
│   ├── routes.ts           # /api/predict/* and /api/history
│   ├── storage.ts          # Drizzle DB helpers
│   └── static.ts           # Production static file serving
├── shared/                 # Types and schemas shared by client + server
│   ├── schema.ts           # Drizzle + Zod schemas
│   └── routes.ts           # API route definitions and response types
├── database/
│   └── schema.sql          # Standalone SQL to create all tables
├── script/
│   └── build.ts            # Unified build script (Vite + esbuild)
├── .github/workflows/
│   ├── static.yml          # GitHub Pages deployment (client-only, hash routing)
│   └── gh-pages.yml        # Alternate gh-pages branch deployment
├── .env.example            # Environment variable template
├── drizzle.config.ts       # Drizzle ORM config
└── train_models.py         # ML model training script (optional)
```

---

## Deployment

### Replit (full-stack – recommended)

The project runs out-of-the-box on Replit:

1. Fork / import the repo on Replit
2. The `DATABASE_URL` and `SESSION_SECRET` secrets are already configured
3. Click **Run** – Replit starts `npm run dev` automatically
4. Click **Publish** to get a permanent `.replit.app` URL

### GitHub Pages (static frontend only)

GitHub Pages can only serve static files, so the app auto-switches to **client-side prediction mode** (no database, no Express).

The workflow (`.github/workflows/static.yml`) runs automatically on every push to `main`:

1. Installs dependencies
2. Builds with `VITE_GITHUB_PAGES=true` (enables client-side predictions + hash routing)
3. Deploys `dist/public` to GitHub Pages

**Setup once:**
1. Go to your repo → **Settings → Pages**
2. Set **Source** to `GitHub Actions`
3. Push to `main` → the site deploys automatically

### VPS / Docker (self-hosted)

```bash
npm run build
NODE_ENV=production DATABASE_URL=<url> SESSION_SECRET=<secret> npm start
```

The server listens on `PORT` (default 5000).

---

## Database Schema

See [`database/schema.sql`](database/schema.sql) for the full DDL.

| Table | Column | Type | Description |
|---|---|---|---|
| `predictions` | `id` | serial PK | Auto-increment ID |
| | `disease` | text | `diabetes` / `heart` / `parkinsons` |
| | `input_data` | jsonb | Raw form values |
| | `result` | text | Prediction label |
| | `confidence` | numeric | 0–100 (without % symbol) |
| | `created_at` | timestamp | Auto-set on insert |

---

## Login Credentials

| Field | Value |
|---|---|
| Username | `aayushabhatta` |
| Password | `1234` |

---

## License

MIT © Aayusha Bhatta
