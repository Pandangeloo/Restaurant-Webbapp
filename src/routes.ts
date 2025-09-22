import type Route from "./interfaces/Route.ts";
import { createElement } from "react";

// page components

import NotFoundPage from "./pages/NotFoundPage.tsx";
import BookTablePage from "./pages/BookTablePage.tsx";
import EventsPage from "./pages/EventsPage.tsx";
import MenuPage from "./pages/MenuPage.tsx";
import form from "./pages/form.tsx";
import LoginPage from "./pages/LoginPage.tsx";

export default [
  NotFoundPage,
  BookTablePage,
  EventsPage,
  MenuPage,
  form,
  LoginPage,
]

  // map the route property of each page component to a Route
  .map((x) => ({ element: createElement(x), ...x.route } as Route))
  // sort by index (and if an item has no index, sort as index 0)
  .sort((a, b) => (a.index || 0) - (b.index || 0));
