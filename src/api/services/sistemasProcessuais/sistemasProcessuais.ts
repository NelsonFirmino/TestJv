import axiosInstance from "../../axiosInstance";
import { GetResponse, PutPostParams } from "./sistemasprocessuais.interface";

export const postSistemasProcessuais = async ({
  txSistemaProcessual,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/sistemas-processuais`, {
    txSistemaProcessual,
  });

  return response.data;
};

export const getSistemasProcessuais = async (): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/sistemas-processuais`);

  return response.data;
};

export const getSistemasProcessuaisByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.get(
    `/api/v1.0/sistemas-processuais/${id}`
  );

  return response.data;
};

export const putSistemasProcessuaisByID = async ({
  id,
  txSistemaProcessual,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.put(
    `/api/v1.0/sistemas-processuais/${id}`,
    {
      txSistemaProcessual,
    }
  );

  return response.data;
};

export const deleteSistemasProcessuaisByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.delete(
    `/api/v1.0/sistemas-processuais/${id}`
  );

  return response.data;
};
