export interface PecaI {
  id?: number;
  txDescricao: string;
  idTipoDocumento?: number;
  idAto: number;
  idProcurador: number;
  idModeloPeca?: number;
  idUsuarioCadastro: number;
  txPeca: string;
  userToken?: number | string;
  outrosArquivos?: any;
  ticket?: number;
  isCredencialPJeCadastrada?: boolean;
}

export interface AnexoPecaI {
  id: number;
  idPeca: number;
  idTipoDocumento: number;
  txTipoDocumento: string;
  idAnexo: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  file_stream: string;
  name: string;
  txTipoArquivo: string;
}

export interface SendAnexoPecaI {
  idPeca: number;
  file_stream: string;
  idUsuarioCadastro: number;
  idTipoDocumento: number;
}

export interface PecaAnexadaResI {
  ticket: string;
}
