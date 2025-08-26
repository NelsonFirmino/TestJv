import axiosInstance from "../../axiosInstance";
import { GetResponse, PutPostParams } from "./motivosdevolucao.interface";

export const postMotivosDevolucao = async ({
  txMotivo,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/motivos-devolucao`, {
    txMotivo,
    idUsuarioCadastro,
  });

  return response.data;
};

export const getMotivosDevolucao = async (
  page = "1",
  pageSize = "100"
): Promise<GetResponse> => {
  let params: any = {
    page,
    pageSize,
  };
  const response = await axiosInstance.get(`/api/v1.0/motivos-devolucao`, {
    params,
  });

  return response.data;
};

export const getMotivosDevolucaoByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/motivos-devolucao/${id}`);

  return response.data;
};

export const putMotivosDevolucaoByID = async ({
  id,
  txMotivo,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.put(
    `/api/v1.0/motivos-devolucao/${id}`,
    {
      txMotivo,
      idUsuarioCadastro,
    }
  );

  return response.data;
};

export const deleteMotivosDevolucaoByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.delete(
    `/api/v1.0/motivos-devolucao/${id}`
  );

  return response.data;
};
