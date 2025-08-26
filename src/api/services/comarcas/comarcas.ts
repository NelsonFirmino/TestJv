import axiosInstance from "../../axiosInstance";
import { GetComarcasResponse } from "./comarcas.interface";

export const getComarcas = async (): Promise<GetComarcasResponse> => {
  const comarcas = await axiosInstance.get(
    "/api/v1.0/Comarcas?page=1&pageSize=100"
  );

  return comarcas.data;
};

export const deleteComarca = async (
  id: number
): Promise<GetComarcasResponse> => {
  const deleteComarca = await axiosInstance.delete(`/api/v1.0/Comarcas/${id}`);
  return deleteComarca.data;
};

export const postComarca = async (
  txComarca: string,
  idRegional: number,
  idUsuarioCadastro: string
): Promise<GetComarcasResponse> => {
  const postComarca = await axiosInstance.post(`/api/v1.0/Comarcas`, {
    txComarca,
    idUsuarioCadastro,
    idRegional,
  });

  return postComarca.data;
};

export const updateComarca = async (
  id: number,
  txComarca: string,
  idRegional: number,
  idUsuarioCadastro: string
): Promise<GetComarcasResponse> => {
  const updateComarca = await axiosInstance.put(`/api/v1.0/Comarcas/${id}`, {
    txComarca,
    idUsuarioCadastro,
    idRegional,
  });

  return updateComarca.data;
};
