// NOTE: Converts a date string to the database weekday format.
export function weekdayIndex(date: string): number {
  const jsDay = new Date(date).getDay(); // JS: 0=Sun … 6=Sat
  return jsDay === 0 ? 7 : jsDay; // DB: 1=Mon … 7=Sun
}

//NOTE: Converts a "HH:MM" string into minutes since midnight.
export function toMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

// NOTE: Generates a list of time slots between open and close times.
export function generateTimeRange(
  open: string,
  close: string,
  interval = 30
): string[] {
  const slots: string[] = [];
  for (let t = toMinutes(open); t <= toMinutes(close); t += interval) {
    const hh = String(Math.floor(t / 60)).padStart(2, "0");
    const mm = String(t % 60).padStart(2, "0");
    slots.push(`${hh}:${mm}`);
  }
  return slots;
}
