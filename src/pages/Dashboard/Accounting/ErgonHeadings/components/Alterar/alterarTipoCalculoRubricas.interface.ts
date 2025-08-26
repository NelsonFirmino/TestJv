export interface SubmitAlterarTipoCalculoRubricas {
  id: number;
  nuRubrica: number;
  isIrrf: boolean;
  isPrevidencia: boolean;
  nuTipoCalculo: number;
  txRubrica: string;
  txAbreviatura: string;
  txTipoRubrica: string;
  idUsuarioCadastro: number;
  dtCadastro: string;
  hrCadastro: string;
}

export interface ModalEditProps {
  setShowModal: (open: boolean) => void;
  idIndice: number;
}
