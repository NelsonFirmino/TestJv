export interface GetModelsResponse {
    status: string;
    message: string;
    data: Model[];
  }
  export interface GetModelsTypesResponse {
    status: string;
    message: string;
    data: ModelsTypes[];
    firstPage: number;
    lastPage: number;
    totalItens: number;
  }
  export interface ModelsTypes {
    id?: number
    txTipoPeca: string
    dtCadastro: string
    hrCadastro: string
    idUsuarioCadastro: number
  }
  export interface PostModelRequest {
      id?: number
      txDescricao: string
      idTipoDocumento: number
      txTipoDocumento: string
      dtCadastro: string
      hrCadastro: string
      idUsuarioCadastro: number
      txAutor: string
      txModeloPeca: string
  }
  export interface Model {
    id: number
    txDescricao: string
    idTipoDocumento: number
    txTipoDocumento: string
    dtCadastro: string
    hrCadastro: string
    idUsuarioCadastro: number
    txAutor: string
    txModeloPeca: string
  }
  
  