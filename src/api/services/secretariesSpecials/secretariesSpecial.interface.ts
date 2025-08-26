
export interface GetSecretariesParams {
  idSecretaria: string;
}

export interface GetSecretariesResponse {
  status: string
  message: string
  data: Secretary[];
}

export interface Secretary {
  id: number;
  txEspecializada: string;
  isRpv: boolean;
  idSetorPai: number;
  idSecretaria: number;
  nuNivel: number;
  totalSetor: number;
  isBloqueado?: boolean;
}
