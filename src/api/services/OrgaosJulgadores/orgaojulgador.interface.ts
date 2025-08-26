export interface GetOrgaoJulgadorParams {
  page?: string;
  pageSize?: string;
}

export interface PutPostOrgaoJulgadorParams {
  id?: number;
  txOrgaoJulgador: string;
  txSigla: string;
  nuInstancia: number;
  idTribunal: number;
  idComarca: number;
  isAtivo: boolean;
}

export interface GetOrgaoJulgadorResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: OrgaoJulgador[];
}

interface OrgaoJulgador {
  id: number;
  txOrgaoJulgador?: string;
  txSigla?: string;
  nuInstancia?: number;
  idTribunal?: number;
  idComarca?: number;
  txTribunal?: string;
  txComarca?: string;
  isAtivo: boolean;
}

export interface GetOrgaoJulgadorTribunalInstanciaParams {
  idTribunal: string;
  nuInstancia: string;
}

export interface GetOrgaoJulgadorTribunalInstanciaResponse {
  status: string;
  message: string;
  data: OrgaoJulgador[];
}
