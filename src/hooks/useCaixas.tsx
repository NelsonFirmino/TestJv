import { useQuery } from "react-query";
import { getCaixas } from "../api/services/caixas/caixas";

export const useCaixas = () => {
  const { data: caixas, isLoading: isLoadingCaixas } = useQuery(
    [`caixas`],
    () => getCaixas(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { caixas, isLoadingCaixas };
};
