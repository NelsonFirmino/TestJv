import { useQuery } from "react-query";
import jwt_decode from "jwt-decode";
import { getDashboardRPVPendencias } from "../api/services/dashboardRPVPendencias/dashboardRPVPendencias";

export const useDashboardRPVPendencias = () => {
  const token = localStorage.getItem("token");
  const decodedToken: any = jwt_decode(token!);
  const {
    data: dashboardRPVPendencias,
    isLoading: isLoadingDashboardRPVPendencias,
  } = useQuery(
    [
      `dashboardRPVPendencias-${decodedToken["Jvris.User.Id"]}`,
      {
        idUsuarioLogado: decodedToken["Jvris.User.Id"],
      },
    ],
    () =>
      getDashboardRPVPendencias({
        idUsuarioLogado: decodedToken["Jvris.User.Id"],
      }),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { dashboardRPVPendencias, isLoadingDashboardRPVPendencias };
};
