import type { OpeningHour } from "../interfaces/OpeningHour";

//GET ALL OPENINGHOURS
export async function getOpeningHours(): Promise<OpeningHour[]> {
  const res = await fetch("/api/opening_hours", { method: "GET" });
  if (!res.ok) {
    throw new Error("Failed to fetch opening hours");
  }

  return res.json();
}

//GET BOOKINGS FOR A SPECIFIC DATE
export async function getBookingsForDate(date: string) {
  const res = await fetch(`/api/bookings?date=${date}`);
  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return res.json();
}
