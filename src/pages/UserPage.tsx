import ProtectedRoute from "../parts/ProtectedRoute";
import { getMyBookings } from "../utils/bookings";
import { useEffect, useState } from "react";
import { useAuth } from "../useAuth";
import { Table } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

type Booking = {
  id: number;
  userId: number;
  guests: number;
  date: string;
  time: string;
  tableName?: string | null;
};

UserPage.route = {
  path: "/user",
  element: (
    <ProtectedRoute requiredRole="user">
      <UserPage />
    </ProtectedRoute>
  ),
  menuLabel: "My pages",
  index: 7,
  allowedRoles: ["user"],
};

export default function UserPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyBookings()
      .then((data) => {
        const mine = user
          ? data.filter((b: Booking) => b.userId === user.id)
          : [];
        setBookings(mine);
      })
      .finally(() => setLoading(false));
  }, [user]);

  // Split bookings into upcoming and past
  const today = new Date().toISOString().split("T")[0];
  const upcoming = bookings
    .filter((b) => b.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));

  const past = bookings
    .filter((b) => b.date < today)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <Container>
      <Row>
        <Col>
          <h1>My Bookings</h1>

          {loading && <p>Loading...</p>}

          {!loading && (
            <>
              <h3>Upcoming</h3>
              {upcoming.length === 0 ? (
                <p>You have no upcoming bookings.</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Guests</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upcoming.map((b) => (
                      <tr key={b.id}>
                        <td>{b.date}</td>
                        <td>{b.time}</td>
                        <td>{b.guests}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}

              <h3>Past</h3>
              {past.length === 0 ? (
                <p>No past bookings yet.</p>
              ) : (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Guests</th>
                      <th>Table</th>
                    </tr>
                  </thead>
                  <tbody>
                    {past.map((b) => (
                      <tr key={b.id}>
                        <td>{b.date}</td>
                        <td>{b.time}</td>
                        <td>{b.guests}</td>
                        <td>{b.tableName ?? "Not assigned"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
