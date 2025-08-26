export interface SubmitEditIndice {
  dtIndice?: string;
  vaSelic: string;
  vaIpca: string;
  vaTr: string;
  vaPoupanca: string;
}

export interface ModalEditProps {
  setShowModal: (open: boolean) => void;
  idIndice: number;
}
