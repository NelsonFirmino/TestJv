export interface ModalAddProps {
  idFichaProcessual?: number;
  numProcesso?: string;

  idMotivo?: number;
  txObservacao?: string;

  setShowModalDevolucao?: (showModal: boolean) => void;
}
