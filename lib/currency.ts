export const formatCurrency = (
  value: number,
  {
    locale = "en-CA",
    currency = "CAD",
    maximumFractionDigits = 0,
  }: {
    locale?: string;
    currency?: string;
    maximumFractionDigits?: number;
  } = {}
) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits,
  }).format(value);
