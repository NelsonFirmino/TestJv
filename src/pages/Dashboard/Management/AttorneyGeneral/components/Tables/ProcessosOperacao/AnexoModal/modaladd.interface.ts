export interface ModalAddProps {
  dados: Dado[];
  setShowModalAdd?: (showModal: boolean) => void;
}

export interface Dado {
  id: number;
  idAto: number;
  txDescricao: string;
  idAnexo?: string;
  dtCadastro?: string;
  hrCadastro?: string;
  idUsuarioCadastro?: number;
  file_stream: string;
  name: string;
  txTipoArquivo?: string;
}
