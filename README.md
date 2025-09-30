# 🍽️ The Axolotl ᓬ(•ᴗ•)ᕒ – Restaurant Web App

A web application for booking tables at **The Axolotl** restaurant.
Built with **React (TypeScript)**, **.NET Minimal API**, and **SQLite**.

This is a school project and currently a **work in progress**.

## ᓬ(ᵔ⤙ᵔ๑)ᕒ Getting Started

### Clone the repository

```bash
git clone https://github.com/Pandangeloo/Restaurant-Webbapp.git

cd Restaurant-Webbapp
```

### Run frontend

```bash
npm install
npm run dev
```

👉 Backend instructions (for the .NET Minimal API) will be added later.

---

## Project Status ≽(๑•ᴗ•๑)≼

🚧 Work in progress – features and documentation will be added as the project develops.

## Global imports

There is a global `index.ts` file in `src/` that re-exports commonly used
components (React, React-Bootstrap, React Router, etc.).

Instead of importing from many different places, you can import them all from the global index:

```tsx
import { Row, Col, Button, useState } from "../index"; // or "../../index" depending on file location
```

Note: since there is no path alias configured in this project, the path to index.ts must be written explicitly (../index)
