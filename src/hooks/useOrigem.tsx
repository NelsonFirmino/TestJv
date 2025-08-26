import { useQuery } from "react-query";
import { getOrigem } from "../api/services/rpv/origem";

export const useOrigem = () => {
  const { data, isLoading: isLoadingOrigem } = useQuery(
    [`origem`],
    () => getOrigem(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const origem = data?.data.map((at) => ({
    label: at.txOrigem,
    value: at.id,
  }));

  return { origem, isLoadingOrigem };
};
