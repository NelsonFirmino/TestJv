import axiosInstance from "../../axiosInstance";
import {
  GetCompletedActsParams,
  GetCompletedActsResponse,
} from "./completedacts.interface";

export const getCompletedActs = async ({
  dtInicio,
  dtFim,
  txProcesso,
  idEspecializada,
  idProcurador,
}: GetCompletedActsParams): Promise<GetCompletedActsResponse> => {
  let params: any = {
    dtInicio,
    dtFim,
    txProcesso,
    idEspecializada,
    idProcurador,
  };
  
  const completedActsList = await axiosInstance.get(
    "/api/v1.0/Atos/atos-concluidos",
    {
      params,
    }
  );

  return completedActsList.data;
};
