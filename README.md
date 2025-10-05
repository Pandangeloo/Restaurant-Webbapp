# 🍽️ The Axolotl ᓬ(•ᴗ•)ᕒ – Restaurant Web App

A web application for booking tables at **The Axolotl** restaurant.
Built with **React (TypeScript)**, **.NET Minimal API**, and **SQLite**.

This is a school project that is now completed and ready for grading.  
Further improvements may be added after evaluation.

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

The project is finished for now and ready for grading.  
After the teacher’s review, I’ll be free to continue improving and adding new features.

## Detailed Development Notes

### Future Improvements

AvailableTimes:
Currently, one API call is made per time slot to check availability.
This should be replaced with a solution that fetches all relevant data once and handles the logic in the frontend.

Booking duration (2-hour rule):
Implement a two-hour rule so tables can’t be double-booked too close together.

Prevent past bookings:
Add a validation to prevent users from selecting dates and times that have already passed.

Multiple parties per table:
Add support for allowing multiple smaller groups to share a larger table,
as long as the total guest capacity isn’t exceeded.

Guest (visitor) bookings:
Allow non-logged-in users to send booking requests that can be approved or denied by an admin.

Large party requests:
Add support for booking requests for groups larger than 12 people or event-related bookings,
which the admin can review and manage manually.

Error and toast handling:
Replace alert() messages with Bootstrap toasts or snackbars,
and add a unified handler for all errors and notifications.

Improved admin view:
Split the admin interface into two sections or tabs — one for bookings and one for tables — for better structure and clarity.

Tables:
Currently, a table can’t be deleted if it has existing bookings because the tableId column doesn’t allow NULL.

Datepicker for opening hours:
Add a datepicker or similar UI component to make it easier for admins to update opening hours.

## 🦎 About the Project

This project was created as part of a web development course.  
Just like an axolotl, it’s small, curious, and still growing. 🌱
