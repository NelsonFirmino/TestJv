export interface SubmitIncTaxTable {
  processNumber:
    | {
        value: string;
        label: string;
      }
    | string;
}
