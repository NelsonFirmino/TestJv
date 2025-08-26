export interface GetCredenciaisPjeResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: CredenciaisPje[];
}

export interface CredenciaisPje {
  id?: number;
  txUsuario?: string;
  idUsuario?: number | string;
  txSenha?: string;
  idTribunal?: number;
  txTribunal?: string;
  nuInstancia?: number;
  dtAtualizacao?: string;
  dtCadastro?: string;
  hrCadastro?: string;
  idUsuarioCadastro?: number;
}

//-------------------------Tribunais PJE-------------------------

export interface TribunaisPjeResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: TribunaisPje[];
}

export interface TribunaisPje {
  id: number;
  txTribunal: string;
}
