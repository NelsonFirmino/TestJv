export const convertDateFormat = (inputDate: string) => {
    let dateComponents = inputDate.split("/");
    let outputDate =
      dateComponents[2] + "-" + dateComponents[1] + "-" + dateComponents[0];
    return outputDate;
}