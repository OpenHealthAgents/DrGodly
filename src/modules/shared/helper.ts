import moment from "moment-timezone";

export function capitalizeString(word: string) {
  return word
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function formatDuration(start: number, end: number) {
  const durationMs = end - start;
  const duration = moment.utc(durationMs).format("HH:mm:ss.SSS"); // e.g. "00:00:01.253"
  return { durationMs, duration };
}
