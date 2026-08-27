# La Baguette - Freiburg im Breisgau

Welcome to the official website of **La Baguette**, an authentic French bakery located in Freiburg im Breisgau. Our bakery products are imported from France every morning to ensure you experience the finest and most authentic French bakery delights.

## About

La Baguette is dedicated to bringing the taste of France to Freiburg im Breisgau. We offer a wide variety of freshly baked products including baguettes, croissants, pain au chocolat, and much more.

## Hosting

This is a static site deployed entirely on **Firebase Hosting** (`labaguette-1234567`).

- Live: https://labaguette-1234567.web.app
- Alternate: https://labaguette-1234567.firebaseapp.com

Media (intro video, logos, favicon) is served from `public/assets/` on Firebase Hosting. There is no Vercel or Vercel Blob dependency.

### Deploy

Pushes to `main` deploy to the live Firebase Hosting channel via `.github/workflows/firebase-hosting-merge.yml`. Pull requests get a preview channel via `.github/workflows/firebase-hosting-pull-request.yml`.

To deploy locally:

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only hosting
```
