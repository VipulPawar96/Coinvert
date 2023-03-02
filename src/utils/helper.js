export const getCurrentDataAndTime = () => {
  const date = new Date();
  const current_date = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  const current_time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return `${current_date} ${current_time}`;
};

export const formatCurrency = (value, decimals) =>
  parseFloat(value).toFixed(decimals);

export const getRandomFXRate = (min, max, decimals) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
};
