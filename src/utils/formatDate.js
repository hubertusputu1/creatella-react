export default date => {
  const dataDate = new Date(date);
  const currentDate = Date.now();
  let diff = currentDate - dataDate.getTime();
  diff = Math.floor(diff / 86400000);
  if (diff === 0) {
    return 'added today';
  } else if (diff < 7) {
    return `${diff} ${diff === 1 ? 'day' : 'days'} ago`;
  } else if (diff === 7) {
    return 'a week ago';
  }

  return date;
};
