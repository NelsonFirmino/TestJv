import axiosInstance from "../../../axiosInstance";
import {
  DistributionsParams,
  DistributionsResponse,
} from "./distributions.interface";

export const getDistributions = async ({
  dtFim,
  dtInicio,
  idContador = "0",
  idEspecializada = "0",
  idProcurador = "0",
  idRazao = "0",
}: DistributionsParams): Promise<DistributionsResponse> => {
  const distribution = await axiosInstance.get<DistributionsResponse>(
    "/api/v1.0/contadoria/relatorios/distribuicoes",
    {
      params: {
        dtFim,
        dtInicio,
        idContador,
        idEspecializada,
        idProcurador,
        idRazao,
      },
    }
  );

  return distribution.data;
};
