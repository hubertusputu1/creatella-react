export default price => {
  return parseFloat(Math.round(price) / 100).toFixed(2);
};
