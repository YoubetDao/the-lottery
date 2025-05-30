export function drawnDateDisplay(
  endTime: bigint | undefined,
  isUTC: boolean = true
) {
  const date = new Date(Number(endTime) * 1000);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = monthNames[date.getUTCMonth()];
  const day = date.getUTCDate();
  const hours = date.getUTCHours();

  const isAM = hours < 12;
  const amPm = isAM ? "AM" : "PM";
  return !isUTC
    ? `${day}th ${month} at ${isAM ? hours : hours - 12}${amPm}`
    : `${day}th ${month} at ${isAM ? hours : hours - 12} ${amPm} UTC`;
}

export function formatAmount(amount: number, decimals: number = 17) {
  if (amount === 0) return 0;
  return (amount / Math.pow(10, decimals)).toLocaleString();
}
