import { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { getBookings, updateBooking, deleteBooking } from "../utils/bookings";

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
                <Button
                  variant="primary"
                  onClick={() => {
                    setEditing(b);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDelete(b.id)}>
                  Cancel
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editing && (
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Guests</Form.Label>
                <Form.Control
                  type="number"
                  value={editing.guests}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      guests: parseInt(e.target.value, 10),
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={editing.date}
                  onChange={(e) =>
                    setEditing({ ...editing, date: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Time</Form.Label>
                <Form.Control
                  type="time"
                  value={editing.time}
                  onChange={(e) =>
                    setEditing({ ...editing, time: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
