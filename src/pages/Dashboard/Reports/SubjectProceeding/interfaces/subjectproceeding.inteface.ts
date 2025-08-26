export interface SubmitSubProc {
  subjects:
    | {
        value: string;
        label: string;
      }
    | string;
}

export interface AssI {
  id: number;
  txAssunto: string;
}
