export interface SubmitAccountant {
  startDate: Date;
  endDate: Date;
  processNumber:
    | {
        value: string;
        label: string;
      }
    | string;
}
