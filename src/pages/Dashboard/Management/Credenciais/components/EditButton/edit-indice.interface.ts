export interface SubmitEditCredentials {
  id?: number;
  txUsuario?: string;
  idUsuario?: string;
  txSenha?: string;
  idTribunal?: number;
  txTribunal?: string;
  nuInstancia?: number;
  dtAtualizacao?: string;
  dtCadastro?: string;
  hrCadastro?: string;
  idUsuarioCadastro?: number;
}

export interface ModalEditProps {
  setShowModal: (open: boolean) => void;
  idIndice: number;
}
