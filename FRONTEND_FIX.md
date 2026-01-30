# Frontend Not Running - Quick Fix Guide

## Issue Identified
The frontend is encountering a **"baseline-browser-mapping"** error when trying to start the Vite dev server. This is a known npm/Node.js compatibility issue.

## Quick Fix Options

### Option 1: Use Legacy Peer Deps (Recommended)
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

### Option 2: Update package.json Script
Add this to your `package.json` scripts:
```json
"dev": "NODE_OPTIONS=--no-experimental-fetch vite"
```

Or on Windows PowerShell:
```json
"dev": "set NODE_OPTIONS=--no-experimental-fetch && vite"
```

### Option 3: Downgrade Vite (If above doesn't work)
```bash
cd frontend
npm install vite@5.0.0 --save-dev
npm run dev
```

### Option 4: Use Different Package Manager
Try using `yarn` or `pnpm` instead:
```bash
# Using yarn
npm install -g yarn
cd frontend
yarn install
yarn dev

# OR using pnpm
npm install -g pnpm
cd frontend
pnpm install
pnpm dev
```

## Alternative: Run Without Dev Server
If the dev server continues to fail, you can:

1. **Build and Preview**:
```bash
cd frontend
npm run build
npm run preview
```

2. **Use a simple HTTP server**:
```bash
cd frontend
npm run build
npx serve dist
```

## Root Cause
This error typically occurs due to:
- npm version conflicts (npm 10+ with older packages)
- Node.js version incompatibility
- Corrupted node_modules cache

## Recommended Action
Try **Option 1** first (legacy-peer-deps), as it's the quickest fix for this specific error.
