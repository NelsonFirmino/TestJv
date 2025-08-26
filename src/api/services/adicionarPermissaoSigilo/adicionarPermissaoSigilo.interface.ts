export interface UsuarioProcesso {
  idProcesso: number;
  idUsuario: number;
  nuSigilo: number;
  idAto: number;
}

export interface AdicionarPermissaoSigiloParams {
  usuarioProcesso: UsuarioProcesso[];
}

export interface AdicionarPermissaoSigiloParamsResponse {
  status: string;
  message: string;
}
