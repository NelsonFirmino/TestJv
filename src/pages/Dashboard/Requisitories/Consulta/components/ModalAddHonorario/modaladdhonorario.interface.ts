export interface ModalAddProps {
  idRequisitorio?: number;
  vaHonorario?: number;
  txCpfCnpj?: string;
  txNome?: string;
  idUsuarioCadastro?: number;
  setShowModalAdd?: (showModal: boolean) => void;
}
