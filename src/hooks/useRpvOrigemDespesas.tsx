import { useQuery } from "react-query";
import { getOrigemDespesas } from "../api/services/rpvOrigemDespesas/rpvOrigemDespesas";

export const useRpvOrigemDespesas = () => {
  const { data: origemDespesas, isLoading: isLoadingOrigemDespesas } = useQuery(
    [`origemDespesas`],
    () => getOrigemDespesas({}),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { origemDespesas, isLoadingOrigemDespesas };
};
