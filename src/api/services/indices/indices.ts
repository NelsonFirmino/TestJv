import axiosInstance from "../../axiosInstance";
import {
  DeleteIndiceResponse,
  GetIndiceByIdResponse,
  ListIndicesParams,
  ListIndicesResponse,
  PostIndiceParams,
  PostIndiceResponse,
  PutIndiceParams,
} from "./indices.interface";

export const getIndiceById = async (
  idIndice: number
): Promise<GetIndiceByIdResponse> => {
  const indice = await axiosInstance.get(`/api/v1.0/Indices-dcje/${idIndice}`);

  return indice.data;
};

export const postIndice = async ({
  dtIndice,
  vaIpca,
  vaPoupanca,
  vaSelic,
  vaTr,
  idUsuarioCadastro,
}: PostIndiceParams): Promise<PostIndiceResponse> => {
  const indice = await axiosInstance.post(`/api/v1.0/Indices-dcje`, {
    dtIndice,
    vaIpca,
    vaPoupanca,
    vaSelic,
    vaTr,
    idUsuarioCadastro,
  });

  return indice.data;
};

export const putIndice = async ({
  idIndice,
  dtIndice,
  vaIpca,
  vaPoupanca,
  vaSelic,
  vaTr,
  idUsuarioCadastro,
}: PutIndiceParams): Promise<GetIndiceByIdResponse> => {
  const indice = await axiosInstance.put(`/api/v1.0/Indices-dcje/${idIndice}`, {
    dtIndice,
    vaIpca,
    vaPoupanca,
    vaSelic,
    vaTr,
    idUsuarioCadastro,
  });

  return indice.data;
};

export const listIndices = async ({
  dtFim,
  dtInicio,
  page = 1,
  pageSize = 10,
}: ListIndicesParams): Promise<ListIndicesResponse> => {
  const indices = await axiosInstance.get("/api/v1.0/Indices-dcje", {
    params: {
      dtFim,
      dtInicio,
      page,
      pageSize,
    },
  });

  return indices.data;
};

export const deleteIndice = async (
  idIndice: number
): Promise<DeleteIndiceResponse> => {
  const deletedIndice = await axiosInstance.delete(
    `/api/v1.0/Indices-dcje/${idIndice}`
  );

  return deletedIndice.data;
};
