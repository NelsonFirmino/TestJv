export interface SwitchWeekAuxProps {
    aux: number;
    type: "TODAY"| "TOMORROW" | "WEEK",
    inicio: string;
    fim: string;
}

export interface SwitchDataTable {
    type: "TODAY"| "TOMORROW" | "WEEK" | "AUDIENCE";
    data: any;
}