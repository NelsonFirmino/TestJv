export interface SubmitAddIndice {
  dtIndice?: string;
  vaSelic: string;
  vaIpca: string;
  vaTr: string;
  vaPoupanca: string;
}

export interface ModalAddIndiceProps {
  isOpenModal: boolean;
  setOpenModal: (open: boolean) => void;
}
