import { useQuery } from "react-query";
import { getFichaDCJEByID2 } from "../api/services/fichaDCJE/fichaDCJE";

export const useDCJE = (id: number) => {
  const { data: fichaDCJE, isLoading: isLoadingFichaDCJE } = useQuery(
    [`ficha-dcje-${id}`, id],
    () => getFichaDCJEByID2(id),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { fichaDCJE, isLoadingFichaDCJE };
};
