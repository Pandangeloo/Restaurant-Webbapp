import { Table, Button, useEffect, useState } from "../../index";

type AdminBooking = {
  id: number;
  userName: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  tableName: string;
};

export default function AdminTodaysBookings() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

  useEffect(() => {
    fetch(`/api/AdminTodayView`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch today's bookings");
        return res.json();
      })
      .then((data) => {
        const sorted = data.sort((a: AdminBooking, b: AdminBooking) =>
          a.time.localeCompare(b.time)
        );
        setBookings(sorted);
      })
      .catch(console.error);
  }, [today]);

  return (
    <div>
      <h2>Today's Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings today.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Time</th>
              <th>Table</th>
              <th>Guests</th>
              <th>User</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.time}</td>
                <td>{b.tableName}</td>
                <td>{b.guests}</td>
                <td>
                  {b.userName} {"-"} {b.email}
                </td>
                <td>
                  <Button variant="primary" size="sm">
                    Edit
                  </Button>{" "}
                  <Button variant="danger" size="sm">
                    Cancel
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
