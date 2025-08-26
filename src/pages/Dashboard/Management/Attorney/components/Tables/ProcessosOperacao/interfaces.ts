export interface createSubOptI {
    changeTo: string;
    onClick?: (index: number) => void;
    //dataSelected: any;
    option: string;
}

export interface Anexo {
    id: number
    idAto: number
    txDescricao: string
    idAnexo?: string
    dtCadastro?: string
    hrCadastro?: string
    idUsuarioCadastro?: number
    file_stream: string
    name: string
    txTipoArquivo?: string
  }
