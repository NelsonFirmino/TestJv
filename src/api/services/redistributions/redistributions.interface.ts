export interface PostComplyChiefParams {
    id: number;
    idEspecializada: number;
    idProcurador: number;
    idUsuarioCadastro: number;
    isRecusado: boolean;
    txObservacao: string;
}

export interface PostComplyChiefResponse {
  status: string
  message: string
  data: ComplyChief
}

export interface ComplyChief {
  id: number
  isRecusado: boolean
  idEspecializada: number
  dtCadastro: string
  hrCadastro: string
  idUsuarioCadastro: number
}
