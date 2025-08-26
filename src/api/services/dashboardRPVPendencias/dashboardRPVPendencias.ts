import axiosInstance from "../../axiosInstance";
import {
  GetDashboardRPVPendenciasParams,
  GetDashboardRPVPendenciasResponse,
} from "./dashboardRPVPendencias.interface";

export const getDashboardRPVPendencias = async ({
  idUsuarioLogado,
}: GetDashboardRPVPendenciasParams): Promise<GetDashboardRPVPendenciasResponse> => {
  const dashboardRPV = await axiosInstance.get(
    `/api/v1.0/rpv/dashrpv/listarpendencias`,
    {
      params: {
        idUsuarioLogado,
      },
    }
  );
  return dashboardRPV.data;
};
