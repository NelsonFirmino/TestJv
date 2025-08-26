export interface ModalAddProps {
  txProcurador?: string;
  idEspecializada?: number;
  idProcurador?: number;
  idUsuarioCadastro?: number;
  isChefe?: boolean;
  isDistribuicaoAutomatica?: boolean;
  nuPercentualDistribuicao?: string;

  setShowModalAdd?: (showModal: boolean) => void;
}
