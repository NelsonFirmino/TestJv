import { useQuery } from "react-query";
import { getTiposAusencias } from "../api/services/tiposAusencias/tiposAusencias";

export const useTiposAusencias = () => {
  const { data: tiposAusencias, isLoading: isLoadingTiposAusencias } = useQuery(
    [`tiposAusencias`],
    () => getTiposAusencias({}),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { tiposAusencias, isLoadingTiposAusencias };
};
