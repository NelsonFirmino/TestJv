import { useQuery } from "react-query";
import { getTribunais } from "../api/services/tribunais/tribunais";

export const useTribunais = () => {
  const { data, isLoading: isLoadingTribunais } = useQuery(
    [`tribunais`],
    () => getTribunais({}),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const tribunais = data?.data.map((at) => ({
    label: at.txTribunal,
    value: at.id,
  }));

  return { tribunais, isLoadingTribunais };
};

export const useAllTribunais = () => {
  const { data: tribunais, isLoading: isLoadingTribunais } = useQuery(
    [`tribunais`],
    () => getTribunais({}),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { tribunais, isLoadingTribunais };
};
