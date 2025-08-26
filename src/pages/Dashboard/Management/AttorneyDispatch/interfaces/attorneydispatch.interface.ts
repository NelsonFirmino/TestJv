export interface SubmitAttDispatch {
  processNumber: string;
  dispatchType:
    | {
        value: string;
        label: string;
      }
    | string;
  dispatch: string;
}
