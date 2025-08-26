import axiosInstance from "../../axiosInstance";
import { GetSpecialsResponse, PutPostParams } from "./setores.interface";

export const postSetores = async ({
  txSetor,
  isBloqueado,
  idSetor_Pai,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetSpecialsResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/Setores`, {
    txSetor,
    isBloqueado,
    idSetor_Pai,
    idUsuarioCadastro,
  });

  return response.data;
};

export const getSetores = async (): Promise<GetSpecialsResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/Setores`);

  return response.data;
};

export const putSetoresByID = async ({
  id,
  txSetor,
  isChefe,
  isBloqueado,
  idSetor_Pai,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetSpecialsResponse> => {
  const response = await axiosInstance.put(`/api/v1.0/Setores/${id}`, {
    txSetor,
    isChefe,
    isBloqueado,
    idSetor_Pai,
    idUsuarioCadastro,
  });

  return response.data;
};

export const deleteSetoresByID = async (
  id: number
): Promise<GetSpecialsResponse> => {
  const response = await axiosInstance.delete(`/api/v1.0/Setores/${id}`);

  return response.data;
};

export const getUsuariosBySetorID = async (
  id: number
): Promise<GetSpecialsResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/Setores/${id}/usuarios`);

  return response.data;
};
