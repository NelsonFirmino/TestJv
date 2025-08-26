import { useQuery } from "react-query";
import { GetDashboardRPVParams } from "../api/services/dashboardRPV/dashboardRPV.interface";
import jwt_decode from "jwt-decode";
import { getDashboardRPV } from "../api/services/dashboardRPV/dashboardRPV";

export const useDashboardRPV = ({
  txAssunto,
  txNumeroFormatado,
  dtDistribuicao,
}: GetDashboardRPVParams) => {
  const token = localStorage.getItem("token");
  const decodedToken: any = jwt_decode(token!);
  const { data: dashboardRPV, isLoading: isLoadingDashboardRPV } = useQuery(
    [
      `dashboardRPV-${decodedToken["Jvris.User.Id"]}`,
      {
        idUsuarioLogado: decodedToken["Jvris.User.Id"],
        txAssunto,
        txNumeroFormatado,
        dtDistribuicao,
      },
    ],
    () =>
      getDashboardRPV({
        idUsuarioLogado: decodedToken["Jvris.User.Id"],
        txAssunto,
        txNumeroFormatado,
        dtDistribuicao,
      }),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { dashboardRPV, isLoadingDashboardRPV };
};
