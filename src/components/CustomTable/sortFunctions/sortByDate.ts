import { convertToDate } from "../../../utils/convertToDate.util";

export const sortByDate = (a, b, key, direction) => {
  const dateA = a[key] ? convertToDate(a[key]) : null;
  const dateB = b[key] ? convertToDate(b[key]) : null;

  if (dateA && dateB) {
    return direction === "ascending"
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  } else if (dateA) {
    return direction === "ascending" ? -1 : 1;
  } else if (dateB) {
    return direction === "ascending" ? 1 : -1;
  }
  return 0;
};
