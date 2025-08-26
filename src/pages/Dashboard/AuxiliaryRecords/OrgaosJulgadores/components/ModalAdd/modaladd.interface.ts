export interface ModalAddProps {
  id?: number;
  txOrgaoJulgador?: string;
  txSigla?: string;
  nuInstancia?: number;
  idTribunal?: number;
  idComarca?: number;
  isAtivo?: boolean;
  setShowModalAdd?: (showModal: boolean) => void;
}
