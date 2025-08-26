export interface ModalAddObservationProps {
  setShowModalAddObservation: (isOpen: boolean) => void;
  showModalAddObservation: boolean;
  txFormatedProcessNumber: string;
  processId: string;
}

export interface SubmitProcessObservation {
  txObservacao: string;
}
