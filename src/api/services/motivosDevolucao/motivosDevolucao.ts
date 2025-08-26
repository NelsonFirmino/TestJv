import axiosInstance from "../../axiosInstance";
import { GetResponse, PutPostParams } from "./motivosdevolucao.interface";

export const postMotivoDevolucao = async ({
  txMotivo,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/motivos-devolucao`, {
    txMotivo,
    idUsuarioCadastro,
  });

  return response.data;
};

export const getMotivoDevolucao = async (): Promise<GetResponse> => {
  const motivosDevolucao = await axiosInstance.get(`/api/v1.0/motivos-devolucao?page=1&pageSize=100`);

  return motivosDevolucao.data;
};

export const getMotivoDevolucaoByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/motivos-devolucao/${id}`);

  return response.data;
};

export const putMotivoDevolucaoByID = async ({
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

export const deleteMotivoDevolucaoByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.delete(
    `/api/v1.0/motivos-devolucao/${id}`
  );

  return response.data;
};
