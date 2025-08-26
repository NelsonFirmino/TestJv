import { useQuery } from "react-query";
import { getActById } from "../api/services/acts/acts";

export const useAct = (actId: string) => {
  const { data: act, isLoading: isLoadingAct } = useQuery(
    [`act-${actId}`, actId],
    () => getActById(actId),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { act, isLoadingAct };
};
