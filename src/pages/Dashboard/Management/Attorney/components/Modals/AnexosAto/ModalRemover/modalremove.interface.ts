export interface SubmitModalRemove {
  id?: number;
}

export interface ModalRemoveProps {
  id?: number;
  idProcesso?: number;
  setShowModalRemove: (showModal: boolean) => void;
}
