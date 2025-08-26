import { useQuery } from "react-query";
import { getActsAndProcedure } from "../api/services/actsAndProcedure/actsAndProcedure";

export const useActsAndProcedure = (processId?: string) => {
  const { data: actAndProcedure, isLoading: isLoadingctAndProcedure } =
    useQuery(
      [`actAndProcedure-${processId}`, processId],
      () => getActsAndProcedure(processId),
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  return { actAndProcedure, isLoadingctAndProcedure };
};
