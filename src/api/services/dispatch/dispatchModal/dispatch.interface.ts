import { SubmitDespachos } from "../../../../pages/Dashboard/Management/Attorney/components/Modals/Despacho/interfaces/despacho.inteface";

export interface PostDispatchParams {
  idAto: SubmitDespachos["idAto"];
  idTipoDespacho: SubmitDespachos["idTipoDespacho"]["value"];
  idProcurador: SubmitDespachos["idProcurador"];
  idUsuarioCadastro: string;
  txObservacao: SubmitDespachos["txObservacao"];
}

export interface PostDispatchV2Params {
  idAto?: number;
  idDistribuicao?: number;
  idTipoDespacho: number;
  idProcurador: number;
  idUsuarioCadastro: string;
  txObservacao: string;
}

export interface GetDispatchResponse {
  status: string;
  message: string;
  data: Dispatch;
}

interface Dispatch {
  id?: number;
  idAto: number;
  idDistribuicao: number;
  txNumeroProcesso: string;
  idTipoDespacho: number;
  idProcurador: number;
  txProcurador: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txObservacao: string;
  txTipo: string;
  txStatusCadastroAto: string;
}

export interface GetDispatchObservationsResponse {
  status: string;
  message: string;
  data: DispatchObservation[];
}

export interface DispatchObservation {
  id: number;
  idDespacho: number;
  txObservacao: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
