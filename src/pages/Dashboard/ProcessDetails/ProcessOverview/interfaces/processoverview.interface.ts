export interface SubmitConCalc {
  startDate: Date;
  endDate: Date;
  request: string;
  processNumber:
    | {
        value: string;
        label: string;
      }
    | string;
  subject:
    | {
        value: string;
        label: string;
      }
    | string;
  calculationType:
    | {
        value: string;
        label: string;
      }
    | string;
}


export interface ObservationModalIterface {
  isOpen?: boolean;
  onClose?: () => void;
}