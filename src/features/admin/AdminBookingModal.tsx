import { Modal, Button, Form } from "react-bootstrap";
import AvailableTimesButtons from "../bookings/AvailableTimesButtons";

type Booking = {
  id: number;
  name: string;
  guests: number;
  date: string;
  time: string;
  email?: string;
  userId?: number;
  tableId?: number;
};

type Props = {
  show: boolean;
  onClose: () => void;
  onSave: () => void;
  editing: Booking | null;
  setEditing: (value: Booking | null) => void;
};

export default function AdminBookingModal({
  show,
  onClose,
  onSave,
  editing,
  setEditing,
}: Props) {
  if (!editing) return null;

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <div className="form-control-plaintext">{editing.name}</div>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Guests</Form.Label>
            <Form.Control
              type="number"
              min={1}
              max={12}
              value={editing.guests}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  guests: Math.max(1, Math.min(12, Number(e.target.value))),
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={editing.date}
              onChange={(e) => setEditing({ ...editing, date: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Time</Form.Label>
            <AvailableTimesButtons
              date={editing.date}
              selectedTime={editing.time}
              guests={editing.guests}
              onChange={(t) => setEditing({ ...editing, time: t })}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="success" onClick={onSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
