import axiosInstance from "../../axiosInstance";
import {
  GetParams,
  GetResponse,
  PutPostParams,
} from "./rpvorigemdespesas.interface";

export const postOrigemDespesas = async ({
  txOrigem,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/rpv/origem`, {
    txOrigem,
    idUsuarioCadastro,
  });

  return response.data;
};

export const getOrigemDespesas = async ({
  page = "1",
  pageSize = "100",
}: GetParams): Promise<GetResponse> => {
  let params: any = {
    page,
    pageSize,
  };
  const response = await axiosInstance.get(`/api/v1.0/rpv/origem`, {
    params,
  });

  return response.data;
};

export const getOrigemDespesasByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/rpv/origem/${id}`);

  return response.data;
};

export const putOrigemDespesasByID = async ({
  id,
  txOrigem,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.put(`/api/v1.0/rpv/origem/${id}`, {
    txOrigem,
    idUsuarioCadastro,
  });

  return response.data;
};

export const deleteOrigemDespesasByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.delete(`/api/v1.0/rpv/origem/${id}`);

  return response.data;
};
