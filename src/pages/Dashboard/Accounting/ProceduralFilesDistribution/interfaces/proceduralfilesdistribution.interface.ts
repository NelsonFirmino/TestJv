export interface SubmitProcFilesDist {
  startDate: string;
  endDate: string;
  processo: {
    value: number;
    label: string;
  };
  procurador: {
    value: number;
    label: string;
  };
}
