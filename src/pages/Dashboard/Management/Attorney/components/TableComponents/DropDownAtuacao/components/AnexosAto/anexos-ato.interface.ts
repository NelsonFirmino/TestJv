import { Dispatch, SetStateAction } from "react";

export interface AnexosAtoProps {
  idAto: number;
  txNumeroProcesso: string;
  keyStateOpenModal: string | false;
  keyString: string | false;
  setKeyStateOpenModal: Dispatch<SetStateAction<string | false>>;
}

export interface SubmitAnexoAto {
  anexo: any;
}