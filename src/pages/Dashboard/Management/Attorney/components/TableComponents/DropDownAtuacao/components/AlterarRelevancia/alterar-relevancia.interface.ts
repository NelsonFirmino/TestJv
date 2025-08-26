import { Dispatch, SetStateAction } from "react";

export interface AlterarRelevanciaProps {
  idAto: number;
  idProcesso: number;
  txRelevancia: string;
  txNumeroProcesso: string;
  keyStateOpenModal: string | false;
  keyString: string | false;
  setKeyStateOpenModal: Dispatch<SetStateAction<string | false>>;
}

export interface SubmitAlterarRelevancia {
  isProcess: boolean;
  isAto: boolean;
  isUrgente?: boolean;
  tipoRelevancia?: { label: string; value: string } | null;
}