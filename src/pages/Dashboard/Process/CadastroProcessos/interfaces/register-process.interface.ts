export interface SubmitProcess {
  id?: number;
  startDate?: Date;
  endDate?: Date;
  request?: string;
  vaProcesso?: string;
  txNumeroFormatado: string;
  isFisico: boolean;
  isSigiloso: boolean;
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

export interface CadastrarProcesso {
  id?: number;
  idAto?: number;
  idUsuarioCadastro?: number;
  idProcesso_Relacionado?: number;
  txNumeroFormatado?: string;
  txTipo?: string;
  vaProcesso?: number;
  idSistemaProcessual?: number;
  idTribunal?: number;
  nuInstancia?: number;
  txRelevancia?: string;
  isFisico?: boolean;
  isSigiloso?: boolean;
}
