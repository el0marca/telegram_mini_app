interface UseFormatBonusParams {
  bonuses: number;
  displayPrefix?: boolean;
  displaySymbol?: boolean;
  displayDecimal?: boolean;
}

export const useFormatBonus = ({
  bonuses,
  displayPrefix = true,
  displaySymbol = true,
  displayDecimal = false,
}: UseFormatBonusParams): string => {
  const integerPart = Math.floor(bonuses / 100);
  const decimalPart = bonuses % 100;

  const prefix = displayPrefix ? "+" : "";
  const symbol = displaySymbol ? " Б" : "";

  let formattedDecimal = "";
  if (displayDecimal && decimalPart > 0) {
    if (decimalPart % 10 === 0) {
      formattedDecimal = `.${Math.floor(decimalPart / 10)}`;
    } else {
      formattedDecimal = `.${decimalPart.toString().padStart(2, "0")}`;
    }
  }

  return `${prefix}${integerPart}${formattedDecimal}${symbol}`;
};
