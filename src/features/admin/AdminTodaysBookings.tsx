import { Table, useEffect, useState } from "../../index";
import { updateBooking, deleteBooking } from "../../api/bookings";
import { ActionButtons } from "./AdminButtons";
import AdminBookingModal from "./AdminBookingModal";
import { getAvailableTable } from "../bookings/getAvailableTable";

type AdminBooking = {
  id: number;
  name?: string;
  userName: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  tableName: string;
  tableId?: number;
};

export default function AdminTodaysBookings() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<AdminBooking | null>(null);

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

  const handleSave = async () => {
    if (!editing) return;

    const tableId = await getAvailableTable(
      editing.date,
      editing.time,
      editing.guests
    );

    if (!tableId) {
      alert("No available tables for this date, time or party size.");
      return;
    }

    const updated = await updateBooking(editing.id, {
      ...editing,
      tableId,
    });

    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));

    setShowModal(false);
  };

  const handleDelete = async (id: number) => {
    await deleteBooking(id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

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
                <td className="user-cell">
                  {b.userName} {"-"} {b.email}
                </td>
                <td>
                  <ActionButtons
                    onEdit={() => {
                      setEditing({ ...b, name: b.userName });
                      setShowModal(true);
                    }}
                    onCancel={() => handleDelete(b.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <AdminBookingModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        editing={editing as any} //NOTE: MYGHAD didnt have the energy to fix this properly
        setEditing={setEditing as any}
      />
    </div>
  );
}
