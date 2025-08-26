import axiosInstance from "../../axiosInstance";
import { AssuntosParams, GetAnexosAtoResponse } from "./anexosAto.interface";

export const getAnexosAto = async (
  id: number
): Promise<GetAnexosAtoResponse> => {
  const anexosAto = await axiosInstance.get(`/api/v1.0/Atos/${id}/anexos`, {});
  if (anexosAto.data.status === "NotFound") {
    return Promise.reject("Não foram encontrados Atos");
  }
  return anexosAto.data;
};

export const deleteAnexoAto = async (
  id: number
): Promise<GetAnexosAtoResponse> => {
  const deleteAnexoAto = await axiosInstance.delete(
    `/api/v1.0/atos-anexos/${id}`
  );
  return deleteAnexoAto.data;
};

export const postAnexo = async ({
  id,
  idAto,
  txDescricao,
  idUsuarioCadastro,
  file_stream,
}: AssuntosParams): Promise<GetAnexosAtoResponse> => {
  const postAnexo = await axiosInstance.post(`/api/v1.0/atos-anexos`, {
    id,
    idAto,
    txDescricao,
    idUsuarioCadastro,
    file_stream,
  });

  return postAnexo.data;
};
