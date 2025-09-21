import { Row, Col, Form, Button } from "react-bootstrap";
import Image from "../Image";
import { useState } from "react";
import createBooking from "../../utils/createBookings";

export default function BookTablePage() {
  const [form, setForm] = useState({
    name: "",
    guests: 1,
    date: "",
    time: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "guests" ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    try {
      await createBooking(form);
      alert("Saved");
    } catch (err: any) {
      alert("Wrong:" + err.message);
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
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              ></Form.Control>
              <Form.Control
                type="number"
                name="guests"
                placeholder="Party size"
                min={1}
                max={12}
                value={form.guests}
                onChange={handleChange}
                required
              ></Form.Control>
              <Form.Control
                type="date"
                name="date"
                value={form.date}
                className="mb-2"
                onChange={handleChange}
                required
              />

              {/* Tid */}
              <Form.Select
                name="time"
                value={form.time}
                onChange={handleChange}
                required
              >
                <option value="">Select a time</option>
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
                <option value="18:30">18:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
              </Form.Select>
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
