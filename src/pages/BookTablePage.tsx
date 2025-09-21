import { Row, Col, Form, Button } from "react-bootstrap";
import Image from "../parts/Image";
import { useState } from "react";

BookTablePage.route = {
  path: "/book-a-table",
  menuLabel: "Book a table",
  index: 2,
};

export default function BookTablePage() {
  const [form] = useState({
    name: "",
    guests: "",
    email: "",
    date: "",
    time: "",
  });
  return (
    <>
      <Row>
        <Col className="text-center">
          <h2 className="text-primary">Book a table</h2>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <h5>Book a table</h5>
          <Image
            src="/images/BookTable.jpg"
            alt="A group photo of our employees."
          />

          <Form.Group>
            <Form.Label className="d-block">
              <p>Book table for up to 12 guests</p>
              <Form.Control
                type="text"
                name="nameInput"
                placeholder="Your name"
                value={form.name}
                required
              ></Form.Control>
              <Form.Control
                type="number"
                name="guests"
                placeholder="Party size"
                min={1}
                max={12}
                value={form.guests}
                required
              ></Form.Control>
              <Form.Control
                type="date"
                name="date"
                value={form.date}
                required
                className="mb-2"
              />

              {/* Tid */}
              <Form.Select name="time" value={form.time} required>
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
          <Button className="mt-4 float-end">Book</Button>
        </Col>

        <Col md={6}>
          <h5>Book a table for large groups</h5>
          <Image
            src="/images/BookTableGroup.jpg"
            alt="A group photo of our employees."
          />
          <Form.Group>
            <Form.Label className="d-block">
              <p>Send us an enquiry for bookings of 13+</p>
              <Form.Control
                type="text"
                name="nameInput"
                placeholder="Your name"
                value={form.name}
                required
              ></Form.Control>
              <Form.Control
                type="text"
                name="emailInput"
                placeholder="Your email"
                value={form.email}
                required
              ></Form.Control>
              <Form.Control
                type="number"
                name="guests"
                placeholder="Party size"
                min={13}
                value={form.guests}
                required
              ></Form.Control>
              <Form.Control
                type="date"
                name="date"
                value={form.date}
                required
                className="mb-2"
              />

              {/* Tid */}
              <Form.Select name="time" value={form.time} required>
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
          <Button className="mt-4 float-end">Enquire now</Button>
        </Col>
      </Row>
    </>
  );
}
