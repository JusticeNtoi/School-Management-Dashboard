export const ITEM_PER_PAGE = 10;

export const formatDateToLocal = (dateStr: Date, locale: string = "en-US") => {
  //   const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(dateStr);
};
