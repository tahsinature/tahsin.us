import moment from "moment";

/**
 * @param date Just month and year in ISO format. Example: 2021-08
 * @returns moment object
 */
export const fromStringISOToMoment = (date: string): moment.Moment => {
  return moment(date, "YYYY-MM");
};

export const sortArrayByDate = (arr: any[], key: string) => {
  if (arr.length === 0) return arr;

  return arr.sort((a, b) => {
    if (!a[key]) return 1;
    if (!b[key]) return -1;

    let momentA = a[key] instanceof moment ? a[key] : moment(a[key], "MMM YYYY");
    let momentB = b[key] instanceof moment ? b[key] : moment(b[key], "MMM YYYY");

    if (momentA.isBefore(momentB)) return 1;
    if (momentB.isBefore(momentA)) return -1;
    return 0;
  });
};
