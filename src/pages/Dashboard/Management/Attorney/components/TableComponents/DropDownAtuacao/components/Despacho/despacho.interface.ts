import { Dispatch, SetStateAction } from "react";

export interface DespachoProps {
  idAto: number;
  txNumeroProcesso: string;
  keyStateOpenModal: string | false;
  keyString: string | false;
  setKeyStateOpenModal: Dispatch<SetStateAction<string | false>>;
}

export interface SubmitDespacho {
  idTipoDespacho: { label: string; value: number } | null;
  txObservacao: string;
}