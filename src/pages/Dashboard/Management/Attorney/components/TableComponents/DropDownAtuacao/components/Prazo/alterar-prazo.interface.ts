import { Dispatch, SetStateAction } from "react";

export interface AlterarPrazoProps {
  idAto: number;
  dtPrazo: string;
  txNumeroProcesso: string;
  keyStateOpenModal: string | false;
  keyString: string | false;
  setKeyStateOpenModal: Dispatch<SetStateAction<string | false>>;
}

export interface SubmitAlterarPrazo {
  dtPrazo: string;
}