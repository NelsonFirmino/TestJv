import axiosInstance from "../../axiosInstance";
import {
  GetParams,
  GetReasonsRequestsResponse,
  PutPostParams,
} from "./reasonsRequests.interface";

export const getReasons = async (): Promise<GetReasonsRequestsResponse> => {
  const assuntos = await axiosInstance.get(
    `/api/v1.0/razoes-pedidos?pageSize=1000`
  );
  return assuntos?.data;
};

export const getReasonsRequests = async ({
  page = "1",
  pageSize = "100",
  txRazaoPedido = "",
}: GetParams): Promise<GetReasonsRequestsResponse> => {
  const reasonsRequests = await axiosInstance.get("/api/v1.0/razoes-pedidos", {
    params: {
      page,
      pageSize,
      txRazaoPedido,
    },
  });

  return reasonsRequests?.data;
};

export const postReasonsRequests = async ({
  idUsuarioCadastro,
  txInformacao,
  txRazaoPedido,
}: PutPostParams): Promise<GetReasonsRequestsResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/razoes-pedidos`, {
    idUsuarioCadastro,
    txInformacao,
    txRazaoPedido,
  });

  return response.data;
};

export const getReasonsRequestsByID = async (
  id: number
): Promise<GetReasonsRequestsResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/razoes-pedidos/${id}`);

  return response.data;
};

export const putReasonsRequestsByID = async ({
  id,
  idUsuarioCadastro,
  txInformacao,
  txRazaoPedido,
}: PutPostParams): Promise<GetReasonsRequestsResponse> => {
  const response = await axiosInstance.put(`/api/v1.0/razoes-pedidos/${id}`, {
    id,
    idUsuarioCadastro,
    txInformacao,
    txRazaoPedido,
  });

  return response.data;
};

export const deleteReasonsRequestsByID = async (
  id: number
): Promise<GetReasonsRequestsResponse> => {
  const response = await axiosInstance.delete(`/api/v1.0/razoes-pedidos/${id}`);

  return response.data;
};
