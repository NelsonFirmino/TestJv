export interface ModalAddProps {
  id?: number;
  txRazaoPedido?: string;
  txInformacao?: string;
  idRubrica?: number;

  idUsuarioCadastro?: number;

  setShowModalAdd?: (showModal: boolean) => void;
}
