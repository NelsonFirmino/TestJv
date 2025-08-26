import { convertToDateAndTime } from "../../../utils/convertToDateAndTime.util";

export const sortByDateAndTime = (a, b, key: string, keyTime: string, direction) => {
  const dateA = a[key] && a[keyTime] ? convertToDateAndTime(a[key], a[keyTime]) : null;
  const dateB = b[key] && b[keyTime] ? convertToDateAndTime(b[key], b[keyTime]) : null;

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
