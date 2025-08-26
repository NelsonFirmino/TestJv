export interface GetAccountantsResponse {
  status: string;
  message: string;
  data: Accountant[];
}

export interface Accountant {
  id: number;
  txContador: string;
  isBloqueado: boolean;
}
