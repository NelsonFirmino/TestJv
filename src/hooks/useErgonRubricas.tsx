import { useQuery } from "react-query";
import { GetErgonRubricas } from "../api/services/ergonrubricas/ergonRubricas";

export const useErgonRubricas = () => {
  const { data: ergonRubricas, isLoading: isLoadingErgonRubricas } = useQuery(
    [`ergonRubricas`],
    () => GetErgonRubricas(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { ergonRubricas, isLoadingErgonRubricas };
};
