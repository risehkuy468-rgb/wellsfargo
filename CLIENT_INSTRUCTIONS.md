# Instructions for Client / Developer

This package contains the complete **Wells Fargo Online Banking UI Demo** built with React and Vite. It is pre-configured for instant local running and 1-click deployment on **Vercel** and **Git**.

---

## 📋 Requirements
- **Node.js** (v18 or higher recommended): [Download Node.js](https://nodejs.org/)

---

## ⚡ Step 1: Install & Test Locally

1. **Extract this zip file** into any folder on your laptop.
2. Open a terminal (PowerShell, Command Prompt, or Terminal) in the extracted folder.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open your browser at the displayed local URL (typically `http://localhost:5173/`).

---

## 🚀 Step 2: Push to Your GitHub Account

1. Open your terminal in the extracted folder and run:
   ```bash
   git init -b main
   git add .
   git commit -m "Wells Fargo online banking UI showcase"
   ```
2. Create a new repository on your [GitHub](https://github.com/new).
3. Connect and push:
   ```bash
   git remote add origin https://github.com/<YOUR-GITHUB-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

---

## 🌐 Step 3: Deploy to Vercel

1. Log in to [vercel.com](https://vercel.com).
2. Click **"Add New..."** → **"Project"**.
3. Choose your newly pushed GitHub repository.
4. Vercel automatically detects the preset from `vercel.json`:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **"Deploy"**. Your live URL will be ready in seconds!

---

## 🔑 Demo Login Credentials
- **Username:** `joe3397`
- **Password:** `gad0265j`
- Displays: **"Welcome, Joe Del Rio"** in the top navigation bar.
