export default price => {
  let tempPrice = price.toString();
  price = tempPrice.length === 2 ? price * 10 : price;
  return parseFloat(Math.round(price) / 100).toFixed(2);
};
