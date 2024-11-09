function formattedDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  // Get the month, day, and year from the Date object
  const month = monthNames[date.getMonth()]; // Gets the month name with period
  const day = date.getDate(); // Gets the day of the month
  const year = date.getFullYear(); // Gets the full year

  return `${month} ${day}, ${year}`;
}

export default formattedDate;
