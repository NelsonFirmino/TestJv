export interface ModalChangeTypeProps {
  id: number;
  txSipRubrica: string;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

export interface SubmitChangeType {
  incidencia: { label: string; value: string };
}
