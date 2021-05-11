export const parseDate = (unix) => {
  let milliseconds = +unix;
  let date = new Date(milliseconds);
  // Parse data into a date string
  let parsedDate = Date.parse(date);
  // if can't parse, return the original string
  if (!parsedDate) return date;
  // Make parsedDate into a new Date object
  let d = new Date(parsedDate);
  // config date options
  let dateOptions = { year: "numeric", month: "long", day: "2-digit" };
  let timeOptions = { hour: "numeric", minute: "numeric" };
  // Set current date and time
  let currDate = new Intl.DateTimeFormat("en", dateOptions).format(d);
  let time = new Intl.DateTimeFormat("en", timeOptions).format(d);
  // Return formatted date string
  let dateString = `${currDate} at ${time}`;
  return dateString;
};
