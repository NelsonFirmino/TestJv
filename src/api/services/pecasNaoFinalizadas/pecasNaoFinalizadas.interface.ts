export interface PecasNaoFinalizadasParams {
  id: number;
}

export interface PecasNaoFinalizadasResponse {
  status: string;
  message: string;
  data: PecasNaoFinalizadas[];
}

export interface PecasNaoFinalizadas {
  id: number;
  idProcesso: number;
  txDescricao: string;
  idTipoDocumento: number;
  idAto: number;
  idProcurador: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txPeca: string;
  txNumeroProcesso: string;
  anexos: Anexos;
  file_stream: string;
  name: string;
  txTipoArquivo: string;
}

export interface Anexos {}
