export interface SubmitCadastroRubrica {
  id: number;
  nuRubrica: number;
  isIrrf: boolean;
  isPrevidencia: boolean;
  nuTipoCalculo: number;
  txRubrica: string;
  txAbreviatura: string;
  txTipoRubrica: string;
  idUsuarioCadastro: number;
}

export interface ModalEditProps {
  setShowModal: (open: boolean) => void;
  idIndice: number;
}
