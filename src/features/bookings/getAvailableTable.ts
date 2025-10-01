// NOTE: This is a simplified versions of Table and Booking used only in this function.
type Table = {
  id: number;
  seats: number;
};

type Booking = { tableId: number };

export async function getAvailableTable(
  date: string,
  time: string,
  guests: number
): Promise<number | null> {
  try {
    const tablesRes = await fetch(`/api/tables?where=seats>=${guests}`);
    if (!tablesRes.ok) throw new Error("Could not fetch tables");
    const tables: Table[] = await tablesRes.json();

    const bookingsRes = await fetch(
      `/api/bookings?where=date=${date}_AND_time=${time}`
    );
    if (!bookingsRes.ok) throw new Error("Could not fetch bookings");
    const bookings: Booking[] = await bookingsRes.json();

    const bookedTableIds = bookings.map((b) => b.tableId);

    const available = tables
      .filter((t) => !bookedTableIds.includes(t.id))
      .sort((a, b) => a.seats - b.seats);

    return available.length > 0 ? available[0].id : null;
  } catch (err) {
    console.error("Error in getAvailableTable:", err);
    return null;
  }
}
