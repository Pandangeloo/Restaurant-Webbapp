//TODO: adminpage should see all bookings-change and cancel booking  and handle tables/times

import AdminBookings from "./AdminBookings";
import AdminTables from "./AdminTables";
import ProtectedRoute from "../auth/ProtectedRoute";

AdminPage.route = {
  path: "/admin",
  element: (
    <ProtectedRoute requiredRole="admin">
      <AdminPage />
    </ProtectedRoute>
  ),
  menuLabel: "Admin",
  index: 7,
  allowedRoles: ["admin"],
};

export default function AdminPage() {
  return (
    <div>
      <h1>Welcome Admin!</h1>
      <p>
        Here you can see all the bookings, both past and future for now. More
        things coming soon
      </p>
      <AdminBookings />
      <AdminTables />
    </div>
  );
}
