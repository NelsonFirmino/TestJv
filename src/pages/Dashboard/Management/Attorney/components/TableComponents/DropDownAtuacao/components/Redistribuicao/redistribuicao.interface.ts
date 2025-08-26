import { Dispatch, SetStateAction } from "react";

export interface RedistribuicaoProps {
  idAto: number;
  txNumeroProcesso: string;
  keyStateOpenModal: string | false;
  keyString: string | false;
  setKeyStateOpenModal: Dispatch<SetStateAction<string | false>>;
}

export interface SubmitRedistribuicao {
  idEspecializada: { label: string; value: number } | null;
  idMotivo: { label: string; value: number } | null;
  idProcurador: { label: string; value: number } | null;
  txObservacao: string;
}