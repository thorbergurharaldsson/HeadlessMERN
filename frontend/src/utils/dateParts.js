export default function dateParts(dateStr) {
  const date = new Date(dateStr);
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  const dateTimeFormat = new Intl.DateTimeFormat("en", options);
  const dateParts = dateTimeFormat.formatToParts(date);
  const d = (type) => dateParts.find((i) => i.type === type).value;

  return {
    day: d("day"),
    month: d("month"),
    year: d("year"),
    hour: d("hour"),
    minute: d("minute"),
    second: d("second"),
  };
}
