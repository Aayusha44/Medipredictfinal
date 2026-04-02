# MedPredict - AI Disease Prediction Platform

## Overview

MedPredict is an AI-powered health analytics platform that provides risk assessments for three diseases: Diabetes, Heart Disease, and Parkinson's. The application uses machine learning models (Gradient Boosting, Random Forest, SVM) trained on medical datasets to predict disease risk based on patient metrics.

The platform features a modern React frontend with a glassmorphism design aesthetic, backed by an Express server that handles predictions either through Python ML models or simulation fallbacks when models aren't available.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with hot module replacement
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **UI Components**: Shadcn UI built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Server**: Express.js running on Node.js
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **API Pattern**: REST endpoints under `/api/predict/*` for disease predictions
- **ML Integration**: Python subprocess spawning for model inference via Joblib

### Prediction Flow
1. Frontend collects patient data through disease-specific forms
2. Data is validated using Zod schemas (shared between client/server)
3. Express routes attempt to run Python prediction scripts
4. If ML models exist (`models/*.pkl`), actual predictions are returned
5. If models are missing, simulation functions provide fallback responses
6. Results display confidence scores and risk levels to users

### Project Structure
- `/client` - React frontend application
- `/server` - Express backend with API routes
- `/shared` - Shared TypeScript schemas and route definitions
- `/models` - Trained ML model files (`.pkl`)
- `/data` - Training datasets (CSV files)

### Key Design Decisions
- **Shared Schema Pattern**: Zod schemas defined once in `/shared` and used by both frontend validation and backend API
- **Fallback Predictions**: System gracefully degrades to simulation when ML models aren't trained
- **Component Library**: Shadcn UI chosen for accessibility and customization flexibility
- **Dark Theme**: Primary color scheme uses teal (#218280) on dark gray (#1f2121) background

## External Dependencies

### Database
- **PostgreSQL**: Primary database via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema defined in `shared/schema.ts`, migrations in `/migrations`
- **Connection**: Uses `pg` Pool for PostgreSQL connections

### ML/Python Stack
- **scikit-learn**: Core ML library for model training
- **Joblib**: Model serialization/deserialization
- **Pandas/NumPy**: Data processing for training pipeline
- Training script: `train_models.py` generates model files

### Third-Party Services
- No external APIs required - all predictions run locally
- GitHub Actions configured for static deployment to GitHub Pages

### Key NPM Packages
- `@tanstack/react-query` - Server state management
- `drizzle-orm` + `drizzle-zod` - Database ORM with Zod integration
- `framer-motion` - Animation library
- `react-hook-form` + `@hookform/resolvers` - Form handling
- `wouter` - Client-side routing