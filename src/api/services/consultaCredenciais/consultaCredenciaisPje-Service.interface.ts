export interface Credencial {
  id: number;
  idUsuario: number;
  idTribunal: number;
  txTribunal: string;
  nuInstancia: number;
  dtAtualizacao: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

export interface CredencialResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: Credencial[];
}
