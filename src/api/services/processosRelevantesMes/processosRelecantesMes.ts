import axiosInstance from "../../axiosInstance";
import {
  GetProcessosRelevantesMesParams,
  ProcessosRelevantesMesResponse,
} from "./processosRelecantesMes.interface";

export const getProcessosRelevantesMes = async ({
  idProcurador,
  dtInicio,
  dtFim,
}: GetProcessosRelevantesMesParams): Promise<ProcessosRelevantesMesResponse> => {
  const processosRelevantesMes =
    await axiosInstance.get<ProcessosRelevantesMesResponse>(
      `/api/v1.0/relatorios/dashboard-procurador/dados`,
      {
        params: {
          idProcurador,
          dtInicio,
          dtFim,
        },
      }
    );

  return processosRelevantesMes.data;
};
