import type Route from "./interfaces/Route.ts";
import { createElement } from "react";

// page components

import NotFoundPage from "./pages/NotFoundPage.tsx";
import BookTablePage from "./features/bookings/BookTablePage.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./features/auth/LoginPage.tsx";
import RegisterPage from "./features/auth/RegisterPage.tsx";
import AdminPage from "./features/admin/AdminPage.tsx";
import UserPage from "./pages/UserPage.tsx";

export default [
  NotFoundPage,
  BookTablePage,
  EventsPage,
  MenuPage,
  HomePage,
  LoginPage,
  RegisterPage,
  AdminPage,
  UserPage,
]

  // map the route property of each page component to a Route
  .map((x) => ({ element: createElement(x), ...x.route } as Route))
  // sort by index (and if an item has no index, sort as index 0)
  .sort((a, b) => (a.index || 0) - (b.index || 0));
