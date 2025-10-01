export interface OpeningHour {
  weekday: number; // 1=Mon ... 7=Sun
  openTime: string | null;
  closeTime: string | null;
  lastBookingTime: string | null;
}
