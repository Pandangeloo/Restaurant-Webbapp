import { Table, useEffect, useState, Form, Row, Col } from "../../index";
import { getBookings, updateBooking, deleteBooking } from "../../api/bookings";
import { ActionButtons } from "./AdminButtons";
import AdminBookingModal from "./AdminBookingModal";
import { getAvailableTable } from "../bookings/getAvailableTable";

type Booking = {
  id: number;
  name: string;
  guests: number;
  date: string;
  time: string;
  tableId?: number;
};

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [editing, setEditing] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getBookings().then((data: Booking[]) => {
      const now = new Date();
      now.setDate(now.getDate() + 1); // QUICK FIX: show only bookings from tomorrow and onwards
      // This is just to avoid confusion since updates made in AdminTodaysBookings
      // don't automatically show here without a page refresh.
      const upcoming = data.filter(
        (b) => new Date(`${b.date}T${b.time}`) >= now
      );
      const sorted = upcoming.sort(
        (a, b) =>
          new Date(`${a.date}T${a.time}`).getTime() -
          new Date(`${b.date}T${b.time}`).getTime()
      );
      setBookings(sorted);
    });
  }, []);

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

  const filtered = bookings.filter((b) =>
    [b.name, b.date, b.time, b.guests.toString()].some((val) =>
      val.toLowerCase().includes(search.toLowerCase())
    )
  );

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return (
    <div>
      <h2>Bookings</h2>
      <Row className="mb-3 g-2 align-items-end">
        <Col xs={12} sm={8}>
          <Form.Label className="text-muted">
            You can search by name, date, time or number of guests
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Col>
        <Col xs={12} sm={4}>
          <Form.Label className="text-muted">Items per page:</Form.Label>
          <Form.Select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </Form.Select>
        </Col>
      </Row>

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
          {paginated.map((b) => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.guests}</td>
              <td>{b.date}</td>
              <td>{b.time}</td>
              <td>
                <ActionButtons
                  onEdit={() => {
                    setEditing(b);
                    setShowModal(true);
                  }}
                  onCancel={() => handleDelete(b.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <AdminBookingModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        editing={editing}
        setEditing={setEditing}
      />
    </div>
  );
}
