# Roast Bot

A playful AI-style web page where a robot host gathers roast parameters, then generates a comedic roast in text or spoken audio.

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy where? Vercel ✅

This project is a static site, so Vercel is a great fit.

### Option 1: Deploy with the Vercel dashboard
1. Push this repo to GitHub.
2. In Vercel, click **Add New... → Project**.
3. Import the repository.
4. Keep framework preset as **Other** (or auto-detected static site).
5. No build command is required.
6. No output directory is required (root static files).
7. Click **Deploy**.

### Option 2: Deploy with Vercel CLI
```bash
npm i -g vercel
vercel
```

For production deployment:
```bash
vercel --prod
```

## Features

- Robot-themed UI inspired by over-the-top cartoon comedy bots.
- Form-driven prompt inputs for a personalized roast.
- Multiple roast styles: playful, savage, and dad-joke energy.
- Text output plus optional voice delivery using the browser's Web Speech API.
