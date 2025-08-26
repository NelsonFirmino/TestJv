import { useQuery } from "react-query";
import { getPartes } from "../api/services/partes/partes";

export const usePartes = () => {
  const { data: partes, isLoading: isLoadingPartes } = useQuery(
    ["partes"],
    () => getPartes(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { partes, isLoadingPartes };
};
