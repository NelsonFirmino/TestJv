import { useQuery } from "react-query";
import { getAnexosAto } from "../api/services/anexosAto/anexosAto";

export const useAnexosAto = (id: number) => {
  const { data: anexosAto, isLoading: isLoadingAnexosAto } = useQuery(
    [`act-${id}`, id],
    () => getAnexosAto(id),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { anexosAto, isLoadingAnexosAto };
};
