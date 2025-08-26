import axiosInstance from "../../axiosInstance";
import {
  GetResponse,
  GetTiposAusenciasParams,
  PutPostParams,
} from "./tiposausencias.interface";

export const postTiposAusencias = async ({
  txTipoAusencia,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/tipos-ausencias`, {
    txTipoAusencia,
  });

  return response.data;
};

export const getTiposAusencias = async ({
  page = "1",
  pageSize = "2000",
}: GetTiposAusenciasParams): Promise<GetResponse> => {
  let params: any = {
    page,
    pageSize,
  };
  const response = await axiosInstance.get(`/api/v1.0/tipos-ausencias`, {
    params,
  });

  return response.data;
};

export const getTiposAusenciasByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/tipos-ausencias/${id}`);

  return response.data;
};

export const putTiposAusenciasByID = async ({
  id,
  txTipoAusencia,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.put(`/api/v1.0/tipos-ausencias/${id}`, {
    txTipoAusencia,
  });

  return response.data;
};

export const deleteTiposAusenciasByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.delete(
    `/api/v1.0/tipos-ausencias/${id}`
  );

  return response.data;
};
