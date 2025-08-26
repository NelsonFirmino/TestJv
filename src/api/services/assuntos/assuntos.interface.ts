export interface AssuntosParams {
  id: string;
}

export interface GetAssuntosResponse {
  status: string;
  message: string;
  data: Assunto[];
}

interface Assunto {
  id: number;
  txAssunto: string;
  idAssunto_Pai: number;
  txPai: string;
}

export interface GetAssuntosSemPaginacaoParams {
  id: number;
  txAssunto?: string;
  idAssunto_Pai?: number;
  idMateria?: number;
}
export interface GetAssuntosSemPaginacaoResponse {
  status: string;
  message: string;
  data: AssuntoSemPaginacao[];
}

interface AssuntoSemPaginacao {
  id?: number;
  txAssunto?: string;
  idAssunto_Pai?: number;
  txPai?: string;
  idMateria?: number;
  txMateria?: string;
}
