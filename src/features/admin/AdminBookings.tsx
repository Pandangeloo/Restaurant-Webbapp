import { Table, useEffect, useState } from "../../index";
import { getBookings, updateBooking, deleteBooking } from "../../api/bookings";
import { EditButton, CancelButton } from "./AdminButtons";
import AdminModal from "./AdminModal";

type Booking = {
  id: number;
  name: string;
  guests: number;
  date: string;
  time: string;
};

//TODO: Better components -  maybe buttons - change cancel to delet or use buttoncomponent
export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editing, setEditing] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getBookings().then(setBookings);
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    const updated = await updateBooking(editing.id, editing);
    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    setShowModal(false);
  };

  const handleDelete = async (id: number) => {
    await deleteBooking(id);
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div>
      <h2>Bookings</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Guests</th>
            <th>Date</th>
            <th>Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.guests}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>
                <EditButton
                  onClick={() => {
                    setEditing(b);
                    setShowModal(true);
                  }}
                />
                <CancelButton onClick={() => handleDelete(b.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AdminModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        editing={editing}
        setEditing={setEditing}
        title="Edit Booking"
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "guests", label: "Guests", type: "number" },
          { name: "date", label: "Date", type: "date" },
          { name: "time", label: "Time", type: "time" },
        ]}
      />
    </div>
  );
}
