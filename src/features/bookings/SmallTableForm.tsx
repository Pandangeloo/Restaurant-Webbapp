import { Row, Col, Form, Button, useState } from "../../index";
import Image from "../../shared/Image";
import { createBooking } from "../../api/bookings";
import { useAuth } from "../auth/useAuth";
import AvailableTimesButtons from "./AvailableTimesButtons";

//TODO: Change ALERTS to something nicer. Add email for not logged in user?
///TODO: ADD USER.ID

export default function BookTablePage() {
  const [form, setForm] = useState({
    name: "",
    guests: 1,
    date: "",
    time: "",
  });

  const { user } = useAuth();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        name === "guests" ? Math.max(1, Math.min(12, Number(value))) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.guests || !form.time || !form.date) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!user) {
      alert("You must be logged in to make a booking.");
      return;
    }

    const userId = user.id;
    const userName = `${user.firstName} ${user.lastName}`;

    try {
      await createBooking({
        ...form,
        name: userName,
        userId: userId,
      });
      alert("Saved");
    } catch (err: any) {
      alert("Wrong: " + err.message);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h5>Book a table</h5>
          <Image
            src="/images/BookTable.jpg"
            alt="A photo of basil a fork and spices."
          />

          <Form.Group>
            <Form.Label className="d-block">
              <p>Book table for up to 12 guests</p>
              <Form.Control
                type="readOnly"
                name="name"
                placeholder="Log in to make your reservation"
                value={user?.firstName + " " + user?.lastName}
              ></Form.Control>
              <Form.Control
                type="number"
                name="guests"
                placeholder="Party size"
                min={1}
                max={12}
                value={form.guests}
                onChange={handleChange}
              ></Form.Control>
              <Form.Control
                type="date"
                name="date"
                value={form.date}
                className="mb-2"
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
              />
              <AvailableTimesButtons
                date={form.date}
                selectedTime={form.time}
                onChange={(t) => setForm((prev) => ({ ...prev, time: t }))}
              />
            </Form.Label>
          </Form.Group>
          <Button className="mt-4 float-end" onClick={handleSubmit}>
            Book
          </Button>
        </Col>
      </Row>
    </>
  );
}
