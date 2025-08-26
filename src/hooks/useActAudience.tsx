import { useQuery } from "react-query";
import { getActAudienceById } from "../api/services/audiencies/audiences";

export const useActAudience = (actId: string) => {
  const { data: actAudience, isLoading: isLoadingActAudience } = useQuery(
    [`actAudience-${actId}`, actId],
    () => getActAudienceById(actId),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { actAudience, isLoadingActAudience };
};
