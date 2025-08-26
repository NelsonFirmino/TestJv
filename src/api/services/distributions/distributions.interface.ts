export interface DistributionParams {
  dtInicio: string;
  dtFim: string;
  idEspecializada: string;
  idProcurador: string;
  idSecretaria: string;
  txSecretaria?: string;
}

export interface PatchDistributionAdvisorParams {
  idAssessor: number;
  idUsuarioCadastro: number;
  idsDistribuicao?: number[];
}

export interface PatchDistributionAdvisorResponse {
  status: string;
  message: string;
};


export interface GetDistributionsResponse {
  status: string;
  message: string;
  data: Data;
}

interface Data {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}


export interface GetRedistributionsReasonsResponse {
  status: string
  message: string
  firstPage: number
  lastPage: number
  totalItens: number
  data: RedistributionReason[]
}

export interface RedistributionReason {
  id: number
  txMotivo: string
  dtCadastro: string
  hrCadastro: string
  idUsuarioCadastro: number
}

export interface PostRedistributionParams {
  idEspecializada: number;
  idMotivo: number;
  idDistribuicaoAntiga: number;
  idProcurador: number;
  idUsuarioCadastro: number;
  txObservacao: string;
}

export interface PostRedistributionResponse {
  status: string
  message: string
  data: Redistribution
}

export interface Redistribution {
  id: number
  idDistribuicaoAntiga: number
  idEspecializada: number
  idProcurador: number
  txProcuradorDestino: string
  idTriagemNova: number
  dtCadastro: string
  hrCadastro: string
  idUsuarioCadastro: number
  idMotivo: number
  idProcesso: number
  dtPrazo: string
  txObservacao: string
}
