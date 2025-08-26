export interface origenI {
    dtCadastro: string;
    hrCadastro: string;
    id: number;
    idUsuarioCadastro: number;
    txOrigem: string;
}

export interface GetOrigemResponse {
    status: string
    message: string
    firstPage: number
    lastPage: number
    totalItens: number
    data: Origem[]
  }
  
  export interface Origem {
    id: number
    txOrigem: string
    dtCadastro: string
    hrCadastro: string
    idUsuarioCadastro: number
  }
  
