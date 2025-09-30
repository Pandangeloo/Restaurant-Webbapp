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

### Run frontend + backend

This project uses **react-rapide**, which runs both the React frontend and the .NET Minimal API backend together.

```bash
npm install
npm run dev
```

No extra steps are needed — both parts start automatically

---

## Tech stack

**Frontend:** React (TypeScript), Vite, React-Bootstrap, React Router

**Backend:** .NET Minimal API + SQLite  
 Backend is provided as part of the school assignment.  
 It automatically generates REST routes for all tables in the database.

Other: Sass for styling, React Icons

---

## Features

### Authentication & roles

- Login and register users
- Two roles available: **user** and **admin**
- Different dashboards: `/user` for regular users, `/admin` for admins

### User

- Book a table online

### Admin

- View all bookings
- Manage tables

### General

- Responsive design with React-Bootstrap grid
- Some imports are centralized via src/index.ts for convenience

## Project Status ≽(๑•ᴗ•๑)≼

🚧 Work in progress – features and documentation will be added as the project develops.