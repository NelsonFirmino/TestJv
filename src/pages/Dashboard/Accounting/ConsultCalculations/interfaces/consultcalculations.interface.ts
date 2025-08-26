export interface SubmitConsultCalc {
  startDate: Date;
  endDate: Date;
  request: string;
  processNumber: {
    value: number;
    label: string;
  };
  calculationType: {
    value: string;
    label: string;
  };
  subject: {
    value: number;
    label: string;
  };
}
