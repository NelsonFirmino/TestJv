import { useQuery } from "react-query";
import { getActProcedureById } from "../api/services/acts/acts";

export const useActProcedures = (actId: number) => {
  const { data: actProcedures, isLoading: isLoadingActProcedures } = useQuery(
    [`actProcedures-${actId}`, actId],
    () => getActProcedureById(actId),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { actProcedures, isLoadingActProcedures };
};
