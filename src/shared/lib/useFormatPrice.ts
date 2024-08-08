import { getCompanyCurrencySymbol } from "@entities/login";
import { useSelector } from "react-redux";

export const useFormatPrice = (price: number): string => {
  const symbol = useSelector(getCompanyCurrencySymbol);

  const rubles = Math.floor(price / 100);
  const kopecks = price % 100;

  if (kopecks === 0) {
    return `${rubles} ${symbol}`;
  } else {
    return `${rubles}.${kopecks < 10 ? "0" : ""}${kopecks} ${symbol}`;
  }
};
