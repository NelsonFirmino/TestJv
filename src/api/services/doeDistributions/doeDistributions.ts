import axiosInstance from "../../axiosInstance";
import {
  GetDOEDistributionsParams,
  GetDOEDistributionsResponse,
} from "./doeDistributions.interface";

export const getDOEDistributions = async ({
  dtFim,
  dtInicio,
  idSecretaria,
  idEspecializada,
  idProcurador,
  isEspecializadasFilhas,
}: GetDOEDistributionsParams): Promise<GetDOEDistributionsResponse> => {
  const doeDistributions = await axiosInstance.get<GetDOEDistributionsResponse>(
    "/api/v1.0/relatorios/rel-distribuicoes-doe",
    {
      params: {
        dtFim,
        dtInicio,
        idSecretaria,
        idEspecializada,
        idProcurador,
        isEspecializadasFilhas,
      },
    }
  );

  doeDistributions.data.dtInicio = dtInicio;
  doeDistributions.data.dtFim = dtFim;

  return doeDistributions.data;
};
