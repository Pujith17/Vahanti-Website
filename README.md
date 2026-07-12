# Vahanti Website

Vahanti Technologies Pvt. Ltd. marketing website built with React 19, Vite, Vanilla CSS, and optimized for search engine optimization (SEO) and fast performance.

## Project Overview

Vahanti Technologies builds AI-powered cargo intelligence, forecasting, business intelligence, and operational software for airlines, cargo terminals, and ground handlers. This website introduces:
- **SkyLnk:** Operational & Financial Intelligence for Air Cargo.
- **RoadLnk:** Digital Road Feeder Service (RFS) Workflow Orchestration.
- **Control Tower:** Centralized SLA and checkpoint orchestration dashboards.

---

## Getting Started

### Prerequisites

You will need [Node.js](https://nodejs.org/) (v18+ recommended) and npm installed.

### Installation

1. Clone the repository and navigate to the directory:
   ```bash
   git clone <repo-url>
   cd Vahanti-Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the environment variables listed below.

4. Start the local development server:
   ```bash
   npm run dev
   ```

---

## Environment Variables

The project utilizes Cloudflare Turnstile for spam protection on the contact form. Define the following variable in your local `.env` file:

```env
# Cloudflare Turnstile Site Key (for client-side rendering)
VITE_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key
```

---

## Scripts

Available scripts in `package.json`:

* `npm run dev`: Starts the Vite local development server on `http://localhost:5173`.
* `npm run build`: Compiles the application for production into the `dist/` directory. Automatically runs code-splitting, WebP asset bundling, and generates compressed Gzip (`.gz`) and Brotli (`.br`) pre-compressed assets.
* `npm run preview`: Locally runs a static server to preview the built production assets in `dist/`.
* `npm run lint`: Runs ESLint to check for code quality and syntax issues.

---

## Performance & Optimization Notes

This site is optimized for fast page loads and SEO:
- **React 19 Native Hoisting:** Manages dynamic route metadata (`<title>`, `<meta>`, and `<link>`) natively without third-party helmet wrappers.
- **Route & Component Splitting:** The initial bundle weight is reduced by lazy-loading non-home routes and below-the-fold homepage elements.
- **Pre-compressed Assets:** Vite automatically creates `.gz` and `.br` formats for CSS and JavaScript to leverage server-side compression.
- **WebP Formatting:** All heavy raster logos and graphics are migrated to highly optimized WebP files for fast contentful paint.
