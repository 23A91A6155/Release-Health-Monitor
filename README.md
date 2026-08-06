# 🔍 Release Health Monitor

![Version](https://img.shields.io/badge/version-1.1.1-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-20%2B-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)

A production-ready Notes CRUD application integrated with **Sentry** to demonstrate Error Tracking, Release Health, Source Maps, Session Monitoring, Alerts, and Semantic Versioning.

---

## 📚 Table of Contents
- [🌟 Project Overview](#-project-overview)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [🔐 Environment Variables](#-environment-variables)
- [🎯 Sentry Project Setup](#-sentry-project-setup)
- [🚀 Quick Start](#-quick-start)
- [📡 API Documentation](#-api-documentation)
- [📦 Release Workflow](#-release-workflow)
- [🗺️ Source Maps](#️-source-maps)
- [📊 Session Tracking](#-session-tracking)
- [⚠️ Error Triggering Guide](#️-error-triggering-guide)
- [📊 Release Health Verification](#-release-health-verification)
- [🔔 Alert Configuration](#-alert-configuration)
- [✅ Verification Checklist](#-verification-checklist)
- [🐳 Docker](#-docker)
- [📄 License](#-license)

## 🌟 Project Overview

### Purpose
The Release Health Monitor serves as a reference implementation for integrating Sentry into modern full-stack web applications. It effectively demonstrates robust error monitoring, session health tracking across distinct application releases, source map utilization for error demystification, and alert handling.

### Key Features
- **Comprehensive Error Tracking:** Real-time capture of handled and unhandled errors across frontend and backend.
- **Release Health Monitoring:** Crash-free session rates and adoption tracking for individual application releases.
- **Source Map Integration:** Automated source map uploading ensuring unminified and readable stack traces.
- **User Session Tracking:** Automatic session logging and replay capabilities for detailed error context.
- **Alert Configurations:** Automated notifications powered by custom error rate thresholds.

### Architecture Diagram (text-based)
```
[ Client Browser ] <---(HTTP/REST)---> [ Backend Server (Express) ]
       |                                       |
       |---(Sentry SDK Events)                 |---(Sentry SDK Events)
       v                                       v
[ Sentry SaaS Dashboard ] <--------------------/
```

## 🏗️ Architecture

### Folder Structure (tree diagram)
```
release-health-monitor/
├── .env.example
├── docker-compose.yml
├── README.md
├── backend/
│   ├── src/
│   │   ├── index.ts
│   │   └── ...
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   └── ...
│   ├── package.json
│   ├── vite.config.ts
│   └── Dockerfile
└── verification/
    ├── README.md
    └── *.png placeholders
```

### Data Flow
1. **User Interactions:** A user interacts with the React frontend.
2. **API Requests:** Frontend makes HTTP requests to the Node.js backend.
3. **Error Generation:** Errors (handled or unhandled) are caught in either environment.
4. **Sentry Dispatch:** The Sentry SDK transmits event payloads, containing environment variables, stack traces, and session IDs, directly to the Sentry project.

## 🛠️ Tech Stack

| Category | Technology | Version |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | 18.x + 5.x |
| **Backend** | Node.js + Express | 20.x + 4.19.x |
| **Language** | TypeScript | 5.5 |
| **Monitoring** | Sentry SDKs | 8.x |
| **Containerization** | Docker | Latest |

## 📋 Prerequisites
- Node.js (v20+ recommended)
- npm (v10+ recommended)
- Docker & Docker Compose (optional, for containerized deployments)
- A registered Sentry account (sentry.io)
- Sentry CLI installed globally (`npm i -g @sentry/cli`)

## 🔐 Environment Variables

Ensure you copy `.env.example` to `.env` in both the root, frontend, and backend directories as needed.

### Backend Environment Variables

| Variable | Description |
| :--- | :--- |
| `SENTRY_DSN` | The Sentry Data Source Name for the backend project |
| `SENTRY_RELEASE` | The release version (e.g., `release-health-monitor@1.0.0`) |
| `SENTRY_ENVIRONMENT` | Operational environment (`development`, `production`) |
| `PORT` | API Server listening port |

### Frontend Environment Variables

| Variable | Description |
| :--- | :--- |
| `VITE_SENTRY_DSN` | Sentry DSN for the frontend |
| `VITE_SENTRY_RELEASE` | Release version to match backend |
| `VITE_SENTRY_ENVIRONMENT` | Environment tag |
| `VITE_API_URL` | URL of the backend API |

## 🎯 Sentry Project Setup

1. Create account at [sentry.io](https://sentry.io)
2. Create new project (choose React for frontend or Express/Node.js for backend). You can also use one project for both.
3. Get DSN (Data Source Name) from Project Settings > Client Keys (DSN).
4. Create auth token (Settings > API Tokens) with `project:releases` permissions.
5. Note your organization slug and project slug.
6. Update the `.env` files in your project with these details.

## 🚀 Quick Start

### Without Docker

**Start Backend:**
```bash
cd backend
npm install
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### With Docker
```bash
docker-compose up --build -d
```
The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:3001`.

## 📡 API Documentation

| Method | Endpoint | Description | Success Code | Error Code |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/items` | Get all items | 200 | - |
| `GET` | `/api/items/:id` | Get item by ID | 200 | 404 |
| `POST` | `/api/items` | Create item | 201 | - |
| `PUT` | `/api/items/:id` | Update item | 200 | 404 |
| `DELETE` | `/api/items/:id` | Delete item | 204 | 404 |
| `GET` | `/api/error/unhandled`| Trigger unhandled error | - | 500 |
| `GET` | `/api/error/handled` | Trigger handled error | - | 500 |
| `GET` | `/health` | Health check | 200 | - |

## 📦 Release Workflow

We follow semantic versioning to demonstrate tracking health across releases:

### Version v1.0.0 - Error Tracking
Focuses on capturing raw, unhandled exceptions and establishing the initial baseline.

### Version v1.1.0 - Handled Errors
Introduces proper error boundary usage and explicit `Sentry.captureException()` calls.

### Version v1.1.1 - Bug Fix Release
Represents a stable state where previous errors are resolved, showcasing an improved crash-free session rate.

### Building and Uploading Releases
Using Sentry CLI:
```bash
# Build and create Sentry release
sentry-cli releases new release-health-monitor@1.0.0
sentry-cli releases files release-health-monitor@1.0.0 upload-sourcemaps ./dist
sentry-cli releases finalize release-health-monitor@1.0.0
```

### Using npm scripts (Configured in package.json)
```bash
npm run release:v1.0.0
npm run release:v1.1.0
npm run release:v1.1.1
```

## 🗺️ Source Maps

### Configuration
Source maps are generated by the Vite build process (`sourcemap: true` in `vite.config.ts`) and the TypeScript compiler for the backend (`sourceMap: true` in `tsconfig.json`).

### Upload Process
Source maps are uploaded using the `@sentry/vite-plugin` during the frontend build step, and via the `sentry-cli` for the backend. 

### Verification
In the Sentry dashboard, navigate to the error's Stack Trace section. The trace should show original TypeScript filenames and lines of code, rather than minified JS bundles.

## 📊 Session Tracking

### Browser Session Replay
Sentry Replay is configured on the frontend to record user interactions leading up to an error, providing a video-like reproduction of the bug.

### Session Tracking
Enabled globally via `Sentry.init()`. Every application startup or browser load initializes a distinct session.

### Crash Free Session Rate
Sentry aggregates sessions and compares them against events containing crashes (unhandled errors) to calculate a percentage indicating overall stability per release.

## ⚠️ Error Triggering Guide

### Unhandled Exception (Frontend v1.0.0)
Click the UI button labeled "Trigger Unhandled Exception" to execute code that intentionally throws an Error.

### Unhandled Promise Rejection (Backend v1.0.0)
Hit the endpoint `GET /api/error/unhandled` to simulate a critical backend failure.

### Handled Exception (v1.1.0)
Use the UI or hit the `/api/error/handled` endpoint. The error is caught in a try-catch block and manually dispatched to Sentry.

### Generating Healthy Sessions (v1.1.1)
Simply interact with the CRUD application normally (Create, Read, Update, Delete items) without triggering the explicit error buttons.

## 📊 Release Health Verification

### How to verify crash-free session rates
1. Navigate to the Sentry Dashboard > Releases.
2. Select your specific release tag (e.g., `release-health-monitor@1.0.0`).
3. View the "Crash Free Session" and "Crash Free User" metrics on the summary page.

### Comparing releases
The Releases page provides a tabular view where you can directly compare error counts and session health across `v1.0.0`, `v1.1.0`, and `v1.1.1`.

## 🔔 Alert Configuration

### Creating Alert Rules
1. Navigate to Sentry > Alerts > Create Rule
2. Set Conditions: When number of events > 5 in 1 hour
3. Set Actions: Send email / Slack notification
4. Name: "High Error Rate Alert"
5. Save Rule

### Notification Channels
Sentry supports routing alerts to:
- Email
- Slack
- PagerDuty
- Microsoft Teams

## ✅ Verification Checklist
- [ ] Frontend runs (React + Vite + TypeScript)
- [ ] Backend runs (Express + TypeScript)
- [ ] CRUD operations work
- [ ] Sentry initialized in frontend
- [ ] Sentry initialized in backend
- [ ] Unhandled exception tracked (v1.0.0)
- [ ] Handled error tracked (v1.1.0)
- [ ] Source maps uploaded and readable
- [ ] Release health dashboard active
- [ ] Session tracking enabled
- [ ] Alert rule configured

## 🐳 Docker

### Services
- **backend**: Node.js API server exposing port 3001.
- **frontend**: Nginx/Node server serving Vite build on port 3000.

### Health Checks
The backend container includes a `wget` healthcheck polling `/health` to ensure the API is fully ready before the frontend service marks it as an available dependency.

### Build and Run
```bash
docker-compose up --build
```

## 📄 License
MIT License
