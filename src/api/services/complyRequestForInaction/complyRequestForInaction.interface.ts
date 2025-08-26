export interface GetComplyRequestForInactionParams {
  id: number;
  isRecusado: boolean;
  idUsuarioCadastro: string;
  txObservacao: string;
}

export interface GetComplyRequestForInactionResponse {
  status: string;
  message: string;
  data: ComplyRequestForInaction;
}

export interface ComplyRequestForInaction {
  id: number;
  isRecusado: boolean;
  dtCadastro?: string;
  hrCadastro?: string;
  idUsuarioCadastro: number;
  txObservacao: string;
}

export interface PostComplyRequestForInactionParamsV2 {
  id: number;
  isRecusado: boolean;
  idUsuarioCadastro: string;
  txObservacao: string;
}
