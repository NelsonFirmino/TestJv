export interface ModalAddActObservationProps {
  setShowModalAddActObservation: (isOpen: boolean) => void;
  showModalAddActObservation: boolean;
  txFormatedProcessNumber: string;
  processIdKeyCacheRevalidate: string;
  actId: number;
}

export interface SubmitProcessActObservation {
  txObservacao: string;
}
