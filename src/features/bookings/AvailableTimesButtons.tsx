import { useState, useEffect, Button } from "../../index";
import { getOpeningHours } from "../../api/openingHours";
import type { OpeningHour } from "../../interfaces/OpeningHour";
import { getAvailableTable } from "./getAvailableTable";
import { weekdayIndex, generateTimeRange } from "./dateutils";

interface Props {
  date: string;
  selectedTime: string;
  onChange: (time: string) => void;
  guests: number;
}

// NOTE: Shows buttons for all times you can book on a chosen date.
export default function AvailableTimesButtons({
  date,
  selectedTime,
  onChange,
  guests,
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

    async function buildSlots() {
      const oh = openingHours.find((r) => r.weekday === idx);
      if (!oh || oh.openTime === null || oh.lastBookingTime === null) {
        setSlots([]);
        return;
      }

      const times = generateTimeRange(oh.openTime!, oh.lastBookingTime!);
      const made: string[] = [];

      for (const slot of times) {
        const tableId = await getAvailableTable(date, slot, guests);
        if (tableId) made.push(slot);
      }

      setSlots(made);
    }
    buildSlots();
  }, [date, guests, openingHours]);

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
