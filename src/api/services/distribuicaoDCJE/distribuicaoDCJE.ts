import axiosInstance from "../../axiosInstance";
import {
  GetParams,
  GetResponse,
  PutPostParams,
} from "./distribuicaodcje.interface";

export const postDistribuicaoDCJE = async ({
  idFichaProcessual,
  idContador,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/distribuicao-dcje`, {
    idFichaProcessual,
    idContador,
    idUsuarioCadastro,
  });

  return response.data;
};

export const getDistribuicaoDCJEByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/distribuicao-dcje/${id}`);

  return response.data;
};

export const putDistribuicaoDCJEByID = async ({
  id,
  idFichaProcessual,
  idContador,
  idUsuarioCadastro,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.put(
    `/api/v1.0/distribuicao-dcje/${id}`,
    {
      idFichaProcessual,
      idContador,
      idUsuarioCadastro,
    }
  );

  return response.data;
};

export const deleteDistribuicaoDCJEByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.delete(
    `/api/v1.0/distribuicao-dcje/${id}`
  );

  return response.data;
};

export const getDistribuicaoDCJEDistribuidos = async ({
  idContador,
  dtInicio,
  dtFim,
  idProcesso,
  idProcurador,
}: GetParams): Promise<GetResponse> => {
  const response = await axiosInstance.get(
    `/api/v1.0/distribuicao-dcje/distribuidos`,
    {
      params: {
        idContador,
        dtInicio,
        dtFim,
        idProcesso,
        idProcurador,
      },
    }
  );

  return response.data;
};

export const getDistribuicaoDCJENaoDistribuidos = async ({
  dtInicio,
  dtFim,
  idProcurador,
  idProcesso,
}: GetParams): Promise<GetResponse> => {
  const response = await axiosInstance.get(
    `/api/v1.0/distribuicao-dcje/nao-distribuidos`,
    {
      params: {
        dtInicio,
        dtFim,
        idProcurador,
        idProcesso,
      },
    }
  );

  return response.data;
};
