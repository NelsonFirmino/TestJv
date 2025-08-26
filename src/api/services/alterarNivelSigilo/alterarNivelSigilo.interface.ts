export interface AtosSigilosos {
  idProcesso: number;
  idUsuario: number;
  nuSigilo: number;
  idAto: number;
}

export interface AlterarNivelSigiloParams {
  atosSigilosos: AtosSigilosos[];
}

export interface AlterarNivelSigiloResponse {
  status: string;
  message: string;
}
