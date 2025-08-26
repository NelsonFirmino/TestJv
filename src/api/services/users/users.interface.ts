export interface GetUserDataResponse {
  status: string;
  message: string;
  data: User;
}

export interface User {
  id: number;
  txUsuario: string;
  txCpf: string;
  idPerfil: number;
  txPerfil: string;
  isBloqueado: boolean;
  txLogin: string;
  isChefe: boolean;
  setores: Sector[];
  setoresUsuarios: UserSector[];
  procuradoresAssessores: AdvisorAttorney[];
}

export interface Sector {
  id: number;
  txSetor: string;
  isChefe: boolean;
  isBloqueado: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  idSetor_Pai?: number;
}

export interface UserSector {
  id: number;
  idSetor: number;
  txSetor: string;
  idUsuario: number;
  isChefe: boolean;
  isDistribuicaoAutomatica: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

export interface AdvisorAttorney {
  id: number;
  idProcurador: number;
  txProcurador: string;
  idAssessor: number;
  txAssessor: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}


export interface GetUsersResponse {
  status: string
  message: string
  data: ListedUser[]
}

export interface ListedUser {
  id: number
  txUsuario: string
  txCpf: string
  idPerfil: number
  txPerfil: string
  isBloqueado: boolean
  txLogin: string
  isChefe: boolean
  setores: Sector[]
  setoresUsuarios: UserSector[]
  procuradoresAssessores: any[]
  txMatricula?: string
}

export interface Sector {
  id: number
  txSetor: string
  isChefe: boolean
  isBloqueado: boolean
  dtCadastro: string
  hrCadastro: string
  idUsuarioCadastro: number
  idSetor_Pai?: number
}

export interface UserSector {
  id: number
  idSetor: number
  idUsuario: number
  isChefe: boolean
  isDistribuicaoAutomatica: boolean
  dtCadastro: string
  hrCadastro: string
  idUsuarioCadastro: number
  nuPercentualDistribuicao?: number
}
