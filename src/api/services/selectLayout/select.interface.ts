export interface UsersListResponse {
  status: string;
  message: string;
  data: User[];
}

export interface User {
  id: number;
  txProcurador: string;
  isBloqueado: boolean;
  isDistribuicaoAutomatica: boolean;
  isChefe: boolean;
  setores: Setor[];
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
