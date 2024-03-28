export function formatNumber(num: string | number) {
  if (typeof num === 'string') num = Number(num)
  if (num >= 1e9) {
    return (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1e6) {
    return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1e3) {
    return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

export function formatWithConditionalDecimals(input:string|number) {
  // Convert input to a number to handle both number and string inputs.
  const number = Number(input);

  // Check if the number is an integer (has no decimals).
  if (Number.isInteger(number)) {
    return number.toString();
  } else {
    // If the number is not an integer (has decimals), format it to 2 decimal places.
    // Use toLocaleString for proper decimal and thousands separators based on locale.
    return number.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
}