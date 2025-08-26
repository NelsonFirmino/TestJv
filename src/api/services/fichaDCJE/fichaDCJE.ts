import axiosInstance from "../../axiosInstance";
import {
  FichaProcessualByIDResponse,
  GetParams,
  GetResponse,
} from "./fichadcje.interface";

export const getFichaDCJE = async ({
  idProcesso,
  idProcurador,
  idFichaProcessual,
  dtIni,
  dtFim,
  isResposta,
  isEncerradas,
  page,
  pageSize,
}: GetParams): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/ficha-dcje`, {
    params: {
      idProcesso,
      idProcurador,
      idFichaProcessual,
      dtIni,
      dtFim,
      isResposta,
      isEncerradas,
      page,
      pageSize,
    },
  });

  return response.data;
};

export const getFichaDCJEByID = async (id: number): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/ficha-dcje/${id}`);

  return response.data;
};

export const getFichaDCJEByID2 = async (
  id: number
): Promise<FichaProcessualByIDResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/ficha-dcje/${id}`);

  return response.data;
};

export const deleteFichaDCJEByID = async (id: number): Promise<GetResponse> => {
  const response = await axiosInstance.delete(`/api/v1.0/ficha-dcje/${id}`);

  return response.data;
};
