export interface SubmitProcess {
  startDate?: Date;
  endDate?: Date;
  request?: string;
  processValue?: string;
  txNumeroFormatado: string;
  isFisico: boolean;
  idSistemaProcessual: {
    value: number;
    label: string;
  };
  idTribunal: {
    value: number;
    label: string;
  };
  nuInstancia: {
    value: number;
    label: string;
  };
  relevancias: {
    value: string;
    label: string;
  };
  txAssunto: {
    value: string;
    label: string;
  }[];
  relatedProcess?: {
    value?: number;
    label?: string;
  };
  calculationType?: {
    value?: string;
    label?: string;
  };
}

export interface SubmitObservationProcess {
  txObservacao: string;
}
