export interface AssuntosParams {
  id?: number;
  idAto?: number;
  txDescricao?: string;
  idUsuarioCadastro?: number;
  file_stream?: string;
  txTipoArquivo?: string;
}

export interface GetAnexosAtoResponse {
  status: string;
  message: string;
  data: AnexosAto[];
}

interface AnexosAto {
  id: number;
  idAto: number;
  txDescricao: string;
  idAnexo: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  file_stream: string;
  name: string;
  txTipoArquivo: string;
}
