import axiosInstance from "../../axiosInstance";
import {
  GetParams,
  GetResponse,
  PutPostParams,
} from "./rpvapostilamento.interface";

export const postApostilamento = async ({
  idRequisitorio,
  dtLimitePagamento,
  vaPagamento,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/rpv/apostilamento`, {
    idRequisitorio,
    dtLimitePagamento,
    vaPagamento,
    idUsuarioCadastro,
  });

  return response.data;
};

export const getApostilamento = async ({
  page = "1",
  pageSize = "100",
}: GetParams): Promise<GetResponse> => {
  let params: any = {
    page,
    pageSize,
  };
  const response = await axiosInstance.get(`/api/v1.0/rpv/apostilamento`, {
    params,
  });

  return response.data;
};

export const getApostilamentoByID = async ({
  id,
}: GetParams): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/rpv/apostilamento/${id}`);

  return response.data;
};

export const putApostilamentoByID = async ({
  idRequisitorio,
  dtLimitePagamento,
  vaPagamento,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.put(
    `/api/v1.0/rpv/apostilamento/${idRequisitorio}`,
    {
      idRequisitorio,
      dtLimitePagamento,
      vaPagamento,
      idUsuarioCadastro,
    }
  );

  return response.data;
};

export const deleteApostilamentoByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.delete(
    `/api/v1.0/rpv/apostilamento/${id}`
  );

  return response.data;
};
