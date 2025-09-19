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
    reservation_time: "",
    email: "",
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
                type="datetime-local"
                name="reservation_time"
                value={form.reservation_time}
                required
              ></Form.Control>
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
                type="datetime-local"
                name="reservation_time"
                value={form.reservation_time}
                required
              ></Form.Control>
            </Form.Label>
          </Form.Group>
          <Button className="mt-4 float-end">Enquire now</Button>
        </Col>
      </Row>
    </>
  );
}
