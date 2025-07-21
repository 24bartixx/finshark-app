export const formatLargeMonetaryNumber: any = (number: number) => {
  const formatted = formatLargeNonMonetaryNumber(number);
  console.log("Number: ", number);
  console.log("Formatted: ", formatted);
  if (formatted && number >= 0) {
    return "$" + formatted;
  }

  return formatted;
};

export const formatLargeNonMonetaryNumber: any = (number: number) => {
  if (number < 0) {
    return "-" + formatLargeNonMonetaryNumber(-number);
  }
  if (number < 1000) {
    return number.toFixed(2);
  } else if (number < 1_000_000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number < 1_000_000_000) {
    return (number / 1_000_000).toFixed(1) + "M";
  } else if (number < 1_000_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + "B";
  } else if (number < 1_000_000_000_000_000) {
    return (number / 1_000_000_000_000).toFixed(1) + "T";
  }
};

export const formatRatio = (ratio: number) => {
  return (Math.round(ratio * 100) / 100).toFixed(2);
};
