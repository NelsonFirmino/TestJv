import { SubmitAttAdvisors } from "../../../pages/Dashboard/Management/AttorneyAdvisors/interfaces/attorneyadvisors.interface";

export interface AdvisorAttorneysParams {
  idAssessor: SubmitAttAdvisors["advisors"]["value"];
  idProcurador: string;
  idUsuarioCadastro: string;
}

export interface GetAdvisorAttorneysotResponse {
  status: string;
  message: string;
  firstPage: string;
  lastPage: string;
  nextPage: string;
  totalItens: string;
  data: Advisor[];
}

interface Advisor {
  id: string;
  idProcurador: string;
  txProcurador: string;
  idAssessor: number;
  txAssessor: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: string;
}
