import axiosInstance from "../../axiosInstance";
import {
  GetParams,
  GetResponse,
  PutPostParams,
} from "./rpvnaturezadespesas.interface";

export const postNaturezaDespesas = async ({
  txNatureza,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/rpv/natureza`, {
    txNatureza,
    idUsuarioCadastro,
  });

  return response.data;
};

export const getNaturezaDespesas = async ({
  page = "1",
  pageSize = "100",
}: GetParams): Promise<GetResponse> => {
  let params: any = {
    page,
    pageSize,
  };
  const response = await axiosInstance.get(`/api/v1.0/rpv/natureza`, {
    params,
  });

  return response.data;
};

export const getNaturezaDespesasByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/rpv/natureza/${id}`);

  return response.data;
};

export const putNaturezaDespesasByID = async ({
  id,
  txNatureza,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.put(`/api/v1.0/rpv/natureza/${id}`, {
    txNatureza,
    idUsuarioCadastro,
  });

  return response.data;
};

export const deleteNaturezaDespesasByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.delete(`/api/v1.0/rpv/natureza/${id}`);

  return response.data;
};
