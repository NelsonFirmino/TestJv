export interface ModalRemoveObservationProps {
  setShowModalRemoveObservation: (isOpen: boolean) => void;
  showModalRemoveObservation: boolean;
  processId: string;
  dataTable: any;
}

export interface SubmitProcessObservation {
  txObservacao: string;
}
