import { Dispatch, SetStateAction } from "react";

export interface AtribuirAssessorProps {
  idAto: number;
  txNumeroProcesso: string;
  idAssessor?: { label: string; value: number } | null;

  idDistribuicao: number;
  keyStateOpenModal: string | false;
  keyString: string | false;
  setKeyStateOpenModal: Dispatch<SetStateAction<string | false>>;
}

export interface SubmitAtribuirAssessor {
  idEspecializada: { label: string; value: number } | null;
  idMotivo: { label: string; value: number } | null;
  idProcurador: { label: string; value: number } | null;
  txObservacao: string;
  idAssessor: { label: string; value: number } | null;
}
