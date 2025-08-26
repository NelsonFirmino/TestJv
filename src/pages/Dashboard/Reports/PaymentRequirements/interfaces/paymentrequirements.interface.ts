export interface SubmitPAYREQ {
  dtInicio: Date;
  dtFim: Date;
  txCpfCnpj: string;
  cpfOuCnpj: boolean;
  txProcesso: string;
  txTipo: {
    value: string;
    label: string;
  };
  isHonorarios: {
    value: string;
    label: string;
  };
  idOrigem: {
    value: string;
    label: string;
  };
  idNatureza: {
    value: string;
    label: string;
  };
  idEspecializada: {
    value: string;
    label: string;
  };
  isCiencia?: any;
  exportar?: any;
}

export interface NatuI {
  id: number;
  txNatureza: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

export interface OriI {
  id: number;
  txOrigem: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
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
