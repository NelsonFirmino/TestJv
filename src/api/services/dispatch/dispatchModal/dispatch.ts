import axiosInstance from "../../../axiosInstance";
import {
  GetDispatchObservationsResponse,
  GetDispatchResponse,
  PostDispatchParams,
  PostDispatchV2Params,
} from "./dispatch.interface";

export const getDispatch = async (id: number): Promise<GetDispatchResponse> => {
  const { data } = await axiosInstance.get(`/api/v1.0/despachos/${id}/ato`);

  return data;
};

export const getDispatchObservations = async (
  idAto: number
): Promise<GetDispatchObservationsResponse> => {
  const { data } = await axiosInstance.get(
    `/api/v1.0/despachos/${idAto}/observacoes`
  );

  return data;
};

export const postDispatch = async ({
  idAto,
  idTipoDespacho,
  idProcurador,
  idUsuarioCadastro,
  txObservacao,
}: PostDispatchParams): Promise<GetDispatchResponse> => {
  const { data } = await axiosInstance.post("/api/v1.0/Despachos", {
    idAto,
    idTipoDespacho,
    idProcurador,
    idUsuarioCadastro,
    txObservacao,
  });

  if (!Boolean(data.status === "Created")) {
    throw new Error(data.message);
  }

  return data;
};

export const postDispatchV2 = async ({
  idAto,
  idTipoDespacho,
  idProcurador,
  idUsuarioCadastro,
  txObservacao,
}: PostDispatchV2Params): Promise<GetDispatchResponse> => {
  const { data } = await axiosInstance.post("/api/v1.0/Despachos", {
    idAto,
    idTipoDespacho,
    idProcurador,
    idUsuarioCadastro,
    txObservacao,
  });

  if (!Boolean(data.status === "Created")) {
    throw new Error(data.message);
  }

  return data;
};

export const deleteDispatch = async (
  id?: number
): Promise<GetDispatchResponse> => {
  const processParts = await axiosInstance.delete(`/api/v1.0/Despachos/${id}`);

  return processParts.data;
};
