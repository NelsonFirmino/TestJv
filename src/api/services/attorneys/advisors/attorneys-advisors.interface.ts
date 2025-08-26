export interface AttorneysAdvisorsParams {
  idProcurador: string;
}

export interface GetAttorneysAdvisorsResponse {
  status: string;
  message: string;
  data: AttorneyAdvisorsInterface[];
}
export interface AttorneyAdvisorsInterface {
  id: number;
  txAssessor: string;
  isBloqueado: boolean;
}
