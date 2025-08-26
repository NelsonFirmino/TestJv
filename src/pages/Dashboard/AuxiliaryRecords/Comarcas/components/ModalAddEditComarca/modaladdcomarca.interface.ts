export interface SubmitModalAddEditComarca {
  id?: number;
  txComarca?: string;
  idRegional?: number;
}

export interface ModalAddEditComarcaProps {
  id?: number;
  txComarca?: string;
  idRegional?: number;
  setShowModalAddEditComarca: (showModal: boolean) => void;
}
