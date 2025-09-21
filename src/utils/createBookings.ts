export default async function createBooking(data: {
  name: string;
  guests: number;
  date: string;
  time: string;
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
