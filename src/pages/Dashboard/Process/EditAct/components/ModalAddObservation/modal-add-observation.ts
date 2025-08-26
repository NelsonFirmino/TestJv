export interface ModalAddObservationProps {
  setShowModalAddObservation: (params: {
    open: boolean;
    idAto: string;
  }) => void;
  showModalAddObservation: {
    open: boolean;
    idAto: string;
  };
}

export interface SubmitRegisterObservation {
  txObservacao: string;
}
