export interface SubmitLogin {
  user: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  sessionId: string;
  id: number;
  txUsuario: string;
  isChefe: boolean;
  setores: Setor[];
  procuradoresAssessores: ProcuradoresAssessores[];
  idPerfil: number;
  txPerfil: string;
  token: string;
}

export interface Setor {
  id: number;
  txSetor: string;
  isChefe: boolean;
  isBloqueado: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  idSetor_Pai?: number;
}

export interface ProcuradoresAssessores {
  id: number;
  idProcurador: number;
  txProcurador: string;
  idAssessor: number;
  txAssessor: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
