export const ITEM_PER_PAGE = 10;

export const formatDateToLocal = (
  dateStr: Date | string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  // return formatter.format(date);
  return date.toLocaleDateString(locale, options);
};

export const formatTimeToLocal = (
  dateStr: Date | string,
  locale: string = "en-US"
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleTimeString(locale, options);
};
