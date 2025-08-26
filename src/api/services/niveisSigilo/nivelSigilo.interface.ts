export interface GetNivelSigiloParams {
  idUsuario?: number;
  nuSigilo?: number;
}

export interface NivelSigiloResponse {
  status: string;
  message: string;
  data: NivelSigilo[];
}

export interface NivelSigilo {
  id: number;
  txUsuario: string;
  txCpf: string;
  idPerfil: number;
  isBloqueado: boolean;
  txLogin: string;
  isChefe: boolean;
  setores: any[];
  setoresUsuarios: any[];
  procuradoresAssessores: any[];
}
