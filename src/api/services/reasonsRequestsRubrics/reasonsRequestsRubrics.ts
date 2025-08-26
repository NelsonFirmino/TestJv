import axiosInstance from "../../axiosInstance";
import {
  PutPostParams,
  GetParams,
  GetResponse,
} from "./reasonsRequestsRubrics.interface";

export const getReasonsRequestsRubric = async ({
  page = "1",
  pageSize = "10",
}: GetParams): Promise<GetResponse> => {
  const reasonsRequests = await axiosInstance.get(
    "/api/v1.0/razoes-pedidos-rubricas",
    {
      params: {
        page,
        pageSize,
      },
    }
  );

  return reasonsRequests?.data;
};

export const postReasonsRequestsRubric = async ({
  idErgonRubrica,
  idRazaoPedido,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.post(
    `/api/v1.0/razoes-pedidos-rubricas`,
    {
      idErgonRubrica,
      idRazaoPedido,
    }
  );

  return response.data;
};

export const getReasonsRequestsRubricByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.get(
    `/api/v1.0/razoes-pedidos-rubricas/${id}`
  );

  return response.data;
};

export const putReasonsRequestsRubricByID = async ({
  id,
  idErgonRubrica,
  idRazaoPedido,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.put(
    `/api/v1.0/razoes-pedidos-rubricas/${id}`,
    {
      idErgonRubrica,
      idRazaoPedido,
    }
  );

  return response.data;
};

export const deleteReasonsRequestsRubricByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.delete(
    `/api/v1.0/razoes-pedidos-rubricas/${id}`
  );

  return response.data;
};

export const getReasonsRequestsRubricByRazaoPedido = async ({
  id,
}: GetParams): Promise<GetResponse> => {
  const reasonsRequests = await axiosInstance.get(
    `/api/v1.0/razoes-pedidos-rubricas/${id}/razaopedido`
  );

  return reasonsRequests?.data;
};
