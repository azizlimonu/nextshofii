export const abbreviateNumber = (number) => {
  const CURRENCY_SYMBOLS = ["", " ribu", " juta", " miliar"];

  // Determine the appropriate currency symbol index
  const tier = Math.floor(Math.log10(Math.abs(number)) / 3);

  // Get the scaled number and corresponding currency symbol
  const scaledNumber = number / Math.pow(10, tier * 3);
  const symbol = CURRENCY_SYMBOLS[tier];

  // Format the number with comma separators for thousands
  const formattedNumber = scaledNumber.toLocaleString("id-ID");

  // Combine the formatted number and currency symbol
  const abbreviatedNumber = formattedNumber + symbol;

  return abbreviatedNumber;
};

export const formatNumber = (number) => {
  if (number >= 100000) {
    return abbreviateNumber(number);
  } else {
    return number.toString();
  }
};
