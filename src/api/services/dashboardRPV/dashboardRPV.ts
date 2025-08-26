import axiosInstance from "../../axiosInstance";
import {
  GetDashboardRPVListarFiltroParams,
  GetDashboardRPVListarFiltroResponse,
  GetDashboardRPVParams,
  GetDashboardRPVResponse,
} from "./dashboardRPV.interface";

export const getDashboardRPV = async ({
  idUsuarioLogado,
  txAssunto,
  txNumeroFormatado,
  dtDistribuicao,
}: GetDashboardRPVParams): Promise<GetDashboardRPVResponse> => {
  const dashboardRPV = await axiosInstance.get(
    `/api/v1.0/rpv/dashrpv/listardashRPVcomfiltro`,
    {
      params: {
        idUsuarioLogado,
        txNumeroFormatado,
        dtDistribuicao,
        txAssunto,
      },
    }
  );

  return dashboardRPV.data;
};

export const getDashboardRPVListarComFiltro = async ({
  idUsuarioLogado,
  txTipo,
  dtInicio,
  dtFim,
  txProcesso,
  txCpfCnpj,
  txCpfCnpjDevedor,
  idNatureza,
}: GetDashboardRPVListarFiltroParams): Promise<GetDashboardRPVListarFiltroResponse> => {
  const dashboardRPV = await axiosInstance.get(
    `/api/v1.0/rpv/dashrpv/listarcomfiltro`,
    {
      params: {
        idUsuarioLogado,
        txTipo,
        dtInicio,
        dtFim,
        txProcesso,
        txCpfCnpj,
        txCpfCnpjDevedor,
        idNatureza,
      },
    }
  );

  return dashboardRPV.data;
};
