import axiosInstance from "../../axiosInstance";
import {
  GetParams,
  GetResponse,
  PutPostParams,
} from "./rpvhonorarios.interface";

export const postHonorario = async ({
  idRequisitorio,
  vaHonorario,
  txCpfCnpj,
  txNome,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/rpv/honorario`, {
    idRequisitorio,
    vaHonorario,
    txCpfCnpj,
    txNome,
    idUsuarioCadastro,
  });

  return response.data;
};

export const getHonorario = async ({
  page = "1",
  pageSize = "100",
}: GetParams): Promise<GetResponse> => {
  let params: any = {
    page,
    pageSize,
  };
  const response = await axiosInstance.get(`/api/v1.0/rpv/honorario`, {
    params,
  });

  return response.data;
};

export const getHonorarioByID = async (id: number): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/rpv/honorario/${id}`);

  return response.data;
};

export const putHonorarioByID = async ({
  idRequisitorio,
  vaHonorario,
  txCpfCnpj,
  txNome,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.put(
    `/api/v1.0/rpv/honorario/${idRequisitorio}`,
    {
      idRequisitorio,
      vaHonorario,
      txCpfCnpj,
      txNome,
      idUsuarioCadastro,
    }
  );

  return response.data;
};

export const deleteHonorarioByID = async (id: number): Promise<GetResponse> => {
  const response = await axiosInstance.delete(`/api/v1.0/rpv/honorario/${id}`);

  return response.data;
};
