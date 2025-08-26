export interface SubmitRecClosedProc {
  startDate: string;
  endDate: string;
  contador: {
    value: number;
    label: string;
  };
  processo: {
    value: number;
    label: string;
  };
}

export interface SubmitData {
  dtIni?: string;
  dtFim?: string;
  idProcesso?: number;
  idContador?: number;
}
