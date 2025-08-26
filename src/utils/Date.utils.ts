export function getToday() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
}
export function getTomorrow(date?: Date) {
    let tomorrow = date ? new Date(date) : new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let dd = String(tomorrow.getDate()).padStart(2, "0");
    let mm = String(tomorrow.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = tomorrow.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
}
export function getWeek(date?: Date) {
    let now = date ? new Date(date) : new Date();
    let startOfWeek: Date, endOfWeek: Date;
    let dayOfWeek = now.getDay();
    let numDay = now.getDate();

    // If the week starts on Monday, adjust the date accordingly
    if (dayOfWeek !== 0) {
        startOfWeek = new Date(now.setDate(numDay - dayOfWeek + 1));
    } else {
        startOfWeek = new Date(now.setDate(numDay - 6));
    }

    endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 4); // for Monday to Friday

    const startOfWeekFormatted = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).format(startOfWeek);
    const endOfWeekFormatted = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    }).format(endOfWeek);

    return { startOfWeekFormatted, endOfWeekFormatted };
}

export function convertDateFormat(input: string) {
    let [day, month, year] = input.split("/");
    return `${year}-${month}-${day}`;
}
export function convertDateFormat2(input: string) {
    let [day, month, year] = input.split("-");
    return `${year}/${month}/${day}`;
}

export function CalcStatus(date1: string) {
    const dt1 = new Date(date1);
    const dt2 = new Date();
    const diff = dt1.getTime() - dt2.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
}
