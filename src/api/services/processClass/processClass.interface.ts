export interface GetProcessClassByIdResponse {
  status: string;
  message: string;
  data: ProcessClass;
}

interface ProcessClass {
  id: number;
  txClasse: string;
  idTipoParte_Ativo: number;
  idTipoParte_Passivo: number;
  idNatureza: number;
  txDispositivoLegal: string;
  txArtigo: string;
  txSigla: string;
  isAtivo: boolean;
}

export interface GetProcessClassResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: ProcessClassList[];
}

interface ProcessClassList {
  id: number;
  txClasse: string;
  txSigla?: string;
  isAtivo: boolean;
  idTipoParte_Ativo?: number;
  idTipoParte_Passivo?: number;
  idNatureza?: number;
  txDispositivoLegal?: string;
  txArtigo?: string;
}
