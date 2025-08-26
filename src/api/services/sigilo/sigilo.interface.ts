export interface GetUsersWithPermissionParams {
  id_processo: number;
}

export interface GetUsersWithPermissionResponse {
  status: string;
  message: string;
  data: UserSigilo[];
}

export interface GetSigiloLevelByProcessParams {
  id_processo: number;
}

export interface GetSigiloLevelByProcessResponse {
  status: string;
  message: string;
  data: {
    idAto: number;
    nuSigilo: number;
    isAtuante: boolean;
    isAssessorGabinete: boolean;
    isVinculoEspecializada: boolean;
    isIndicado: boolean;
    idProcurador: number;
    idProcesso: number;
  };
}

export interface UserSigilo {
  id: number;
  idPerfil: number;
  isBloqueado: boolean;
  isChefe: boolean;
  procuradoresAssessores: any[];
  setores: any[];
  setoresUsuarios: any[];
  txCpf: string;
  txLogin: string;
  txUsuario: string;
}

export interface GetUsersBySigiloAndLoggedUserParams {
  idUsuario: number;
  nuSigilo: number;
}

export interface GetUsersBySigiloAndLoggedUserResponse {
  status: string;
  message: string;
  data: UserSigilo[];
}

export interface PatchRemoveUsersAccessProcessParams {
  remover: true;
  listaUsuariosProcessos: UserToRemove[];
}

export interface PatchAddUsersAccessProcessParams {
  listaUsuariosProcessos: UserToRemove[];
}

export interface PatchAddUsersAccessProcessResponse {
  status: string;
  message: string;
}

interface UserToRemove {
  idProcesso: number;
  idUsuario: number;
  nuSigilo: number;
  idAto: number;
  idTriagem: number;
}

export interface DeleteUserAccessProcessParams {
  id: number;
  idProcesso: number;
  idUsuario: number;
}
