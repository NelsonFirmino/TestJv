export interface UsuarioSigilo {
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
