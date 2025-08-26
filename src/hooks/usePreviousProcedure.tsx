import { useQuery } from "react-query";
import { getPreviousProcedure } from "../api/services/previousProcedure/previousProcedure";

export const usePreviousProcedure = (processId?: string) => {
  const { data: previousProcedure, isLoading: isLoadingPreviousProcedure } =
    useQuery(
      [`previousProcedure-${processId}`, processId],
      () => getPreviousProcedure(processId),
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  return { previousProcedure, isLoadingPreviousProcedure };
};
