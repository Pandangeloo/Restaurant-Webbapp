import { Row, Col, Form, Button, useState, useNavigate } from "../../index";
import Image from "../../shared/Image";
import { createBooking } from "../../api/bookings";
import { useAuth } from "../auth/useAuth";
import AvailableTimesButtons from "./AvailableTimesButtons";
import { getAvailableTable } from "./getAvailableTable";

//TODO: Change ALERTS to something nicer.
//TODO: Improve user experience wtih a datepicker?

//Only logged in users/admin can book a table
//User name is taken from the logged in user and cannot be changed in the form

export default function SmallTableForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    guests: 1,
    date: "",
    time: "",
    tableId: undefined as number | undefined,
  });

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

  async function handleTimeSelect(t: string) {
    setForm((prev) => ({ ...prev, time: t }));

    const tableId = await getAvailableTable(form.date, t, form.guests);

    setForm((prev) => ({ ...prev, tableId: tableId ?? undefined }));

    if (!tableId) {
      alert("No tables available at this time.");
    }
  }

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

      navigate(user.role === "admin" ? "/admin" : "/user");
    } catch (err: any) {
      const msg = err.message.includes("UNIQUE constraint failed")
        ? "That table is already booked at that time."
        : "Something went wrong when saving the booking.";
      alert(msg);
    }
  };

  return (
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
            />
            <Form.Control
              type="number"
              name="guests"
              placeholder="Party size"
              min={1}
              max={12}
              value={form.guests}
              onChange={handleChange}
            />
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
              guests={form.guests}
              onChange={handleTimeSelect}
            />
          </Form.Label>
        </Form.Group>
        <Button className="mt-4 float-end" onClick={handleSubmit}>
          Book
        </Button>
      </Col>
    </Row>
  );
}
