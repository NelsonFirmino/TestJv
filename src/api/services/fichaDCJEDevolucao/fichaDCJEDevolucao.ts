import axiosInstance from "../../axiosInstance";
import {
  GetParams,
  GetResponse,
  PutPostParams,
} from "./fichadcjedevolucao.interface";

export const postFichaDCJEDevolucao = async ({
  idFichaProcessual,
  idMotivo,
  txObservacoes,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.post(
    `/api/v1.0/fichas-dcje-devolucoes`,
    {
      idFichaProcessual,
      idMotivo,
      txObservacoes,
      idUsuarioCadastro,
    }
  );

  return response.data;
};

export const getFichaDCJEDevolucao = async ({
  page,
  pageSize,
}: GetParams): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/fichas-dcje-devolucoes`, {
    params: {
      page,
      pageSize,
    },
  });

  return response.data;
};

export const getFichaDCJEDevolucaoByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.get(
    `/api/v1.0/fichas-dcje-devolucoes/${id}`
  );

  return response.data;
};

export const deleteFichaDCJEDevolucaoByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.delete(
    `/api/v1.0/fichas-dcje-devolucoes/${id}`
  );

  return response.data;
};
