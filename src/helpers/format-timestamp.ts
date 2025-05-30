function formatTimeStampToDate(timestamp: string) {
  return timestamp.split("T")[0];
}
function formatTimeStampToDateandTime(timestamp: string) {
  const [date, timewithzone] = timestamp.split("T");
  const time = timewithzone.split(".080Z")[0].split(":").slice(0, 2);
  const dateAndTimeString = time[0] + ":" + time[1] + " on " + date;
  return dateAndTimeString;
}
export { formatTimeStampToDate, formatTimeStampToDateandTime };
