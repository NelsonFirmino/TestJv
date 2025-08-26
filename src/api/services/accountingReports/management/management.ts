import axiosInstance from "../../../axiosInstance";
import {
  ReportsManagementParams,
  ReportsManagementResponse,
} from "./management.interface";

export const getReportsManagement = async ({
  dtFim,
  dtInicio,
  idContador = "0",
  idProcurador = "0",
  idRazao = "0",
  resource,
}: ReportsManagementParams): Promise<ReportsManagementResponse> => {
  let endpoint = "";
  switch (resource) {
    case 0:
      endpoint = "estatistica-excesso";
      break;
    case 1:
      endpoint = "distribuicoes-quantitativo";
      break;
    case 2:
      endpoint = "movimentacao";
      break;
    case 3:
      endpoint = "quantitativo-resposta";
      break;
  }
  const reportsManagement = await axiosInstance.get<ReportsManagementResponse>(
    `/api/v1.0/contadoria/relatorios/${endpoint}`,
    {
      params: {
        dtFim,
        dtInicio,
        idContador,
        idProcurador,
        idRazao,
      },
    }
  );

  return reportsManagement.data;
};
