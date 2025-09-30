//CREATE A BOOKING
export async function createBooking(data: {
  name: string;
  guests: number;
  date: string;
  time: string;
  tableId?: number;
  userId?: number;
}) {
  const res = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create booking");
  }

  return res.json();
}

//GET ALL BOOKINGS
export async function getBookings() {
  const res = await fetch("/api/bookings", { method: "GET" });
  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  return res.json();
}

//UPDATE A BOOKING
export async function updateBooking(
  id: number,
  data: {
    name?: string;
    guests?: number;
    date?: string;
    time?: string;
    tableId?: number;
    userId?: number;
  }
) {
  const res = await fetch(`/api/bookings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update booking");
  }

  return res.json();
}

//DELETE A BOOKING
export async function deleteBooking(id: number) {
  const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
  if (!res.ok) {
    throw new Error("Failed to delete booking");
  }

  return res.json();
}
