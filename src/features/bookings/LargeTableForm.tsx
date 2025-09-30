import { Row, Col, Form, Button, useState } from "../../index";
import Image from "../../shared/Image";

BookTablePage.route = {
  path: "/book-a-table",
  menuLabel: "Book a table",
  index: 2,
};

export default function BookTablePage() {
  const [form, setForm] = useState({
    name: "",
    guests: "",
    email: "",
    date: "",
    time: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Row>
        <Col>
          <h5>Book table for larger groups</h5>
          <Image
            src="/images/BookTableGroup.jpg"
            alt="A photo of tomatoes, olives, red wine, basil and bread."
          />
          <Form.Group>
            <Form.Label className="d-block">
              <p>Send us an enquiry for bookings of 13+</p>
              <Form.Control
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              ></Form.Control>
              <Form.Control
                type="text"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                required
              ></Form.Control>
              <Form.Control
                type="number"
                name="guests"
                placeholder="Party size"
                min={13}
                value={form.guests}
                onChange={handleChange}
                required
              ></Form.Control>
              <Form.Control
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="mb-2"
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
          <Button className="mt-4 float-end">Enquire now</Button>
        </Col>
      </Row>
    </>
  );
}
