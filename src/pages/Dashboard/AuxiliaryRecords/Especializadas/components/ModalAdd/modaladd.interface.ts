export interface ModalAddProps {
  id?: number;
  txEspecializada?: string;
  isRpv?: boolean;
  idSetor_Pai?: number;
  idSecretaria?: number;
  isBloqueado?: boolean;

  txSetor?: string;
  idUsuarioCadastro?: number;

  setShowModalAdd?: (showModal: boolean) => void;
}
