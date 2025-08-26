export interface SubmitDCJE {
  startDate: Date;
  endDate: Date;
  special?:
    | {
        value: string;
        label: string;
      }
    | string;
  rpvoperator?: {
    value: string;
    label: string;
  };
}

export interface EspI {
  id: number;
  txEspecializada: string;
  isRpv: boolean;
  idSetorPai: number;
  idSecretaria: number;
  nuNivel: number;
  totalSetor: number;
  isBloqueado: boolean;
}
export interface OpI {
  id: number;
  idPerfil: number;
  idUsuario: number;
  txUsuario: string;
}
