import axiosInstance from "../../axiosInstance";
import { GetResponse, PutPostParams } from "./rpvRequisitorios.interface";

export const postRpvRequisitorio = async ({
  idUsuarioLogado,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/rpv/requisitorio`, {
    idUsuarioLogado,
  });

  return response.data;
};

export const getRpvRequisitorio = async (): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/rpv/requisitorio`);

  return response.data;
};

export const getRpvRequisitorioByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/rpv/requisitorio/${id}`);

  return response.data;
};

export const putRpvRequisitorioByID = async ({
  id,
  idUsuarioLogado,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.put(`/api/v1.0/rpv/requisitorio/${id}`, {
    idUsuarioLogado,
  });

  return response.data;
};

export const deleteRpvRequisitorioByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.delete(
    `/api/v1.0/rpv/requisitorio/${id}`
  );

  return response.data;
};
