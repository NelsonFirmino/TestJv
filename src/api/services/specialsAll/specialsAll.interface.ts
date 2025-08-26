export interface GetSpecialsResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: Special[];
}

export interface Special {
  id: number;
  txEspecializada: string;
  isRpv: boolean;
  idSetorPai: number;
  idSecretaria: number;
  nuNivel: number;
  totalSetor: number;
  isBloqueado: boolean;
}
