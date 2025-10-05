//TODO: adminpage should see all bookings-change and cancel booking  and handle tables/times
import { Row, Col } from "../../index";
import AdminBookings from "./AdminBookings";
import AdminTables from "./AdminTables";
import ProtectedRoute from "../auth/ProtectedRoute";
import AdminTodaysBookings from "./AdminTodaysBookings";

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
    <Row>
      <Col>
        <h1>Welcome Admin!</h1>
        <p>Here you can see all the bookings for today.</p>
        <AdminTodaysBookings />
        <AdminBookings />
        <AdminTables />
      </Col>
    </Row>
  );
}
