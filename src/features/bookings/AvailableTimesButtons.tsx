import { useState, useEffect, Button } from "../../index";
import { getOpeningHours } from "../../api/openingHours";
import type { OpeningHour } from "../../interfaces/OpeningHour";

function weekdayIndex(date: string): number {
  const jsDay = new Date(date).getDay(); // JS: 0=Sun … 6=Sat
  return jsDay === 0 ? 7 : jsDay; // DB: 1=Mon … 7=Sun
}

interface Props {
  date: string;
  selectedTime: string;
  onChange: (time: string) => void;
}

export default function AvailableTimesButtons({
  date,
  selectedTime,
  onChange,
}: Props) {
  const [slots, setSlots] = useState<string[]>([]);
  const [openingHours, setOpeningHours] = useState<OpeningHour[]>([]);

  useEffect(() => {
    getOpeningHours().then(setOpeningHours).catch(console.error);
  }, []);

  useEffect(() => {
    if (!date) {
      setSlots([]);
      return;
    }

    const idx = weekdayIndex(date);
    const oh = openingHours.find((r) => r.weekday === idx);

    if (!oh || oh.openTime === null || oh.lastBookingTime === null) {
      setSlots([]);
      return;
    }

    const made: string[] = [];
    const toMinutes = (t: string) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    };

    for (
      let t = toMinutes(oh.openTime);
      t <= toMinutes(oh.lastBookingTime);
      t += 30
    ) {
      const hh = String(Math.floor(t / 60)).padStart(2, "0");
      const mm = String(t % 60).padStart(2, "0");
      made.push(`${hh}:${mm}`);
    }
    setSlots(made);
  }, [date, openingHours]);

  return (
    <div className="mt-3 d-flex flex-wrap gap-2">
      {date && slots.length === 0 && <p className="mb-0">Closed</p>}
      {slots.map((t) => (
        <Button
          key={t}
          variant={selectedTime === t ? "primary" : "outline-secondary"}
          onClick={() => onChange(t)}
        >
          {t}
        </Button>
      ))}
    </div>
  );
}
