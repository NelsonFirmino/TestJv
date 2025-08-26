import { useQuery } from "react-query";
import { getActAttachmentsById } from "../api/services/acts/acts";

export const useActAttachments = (actId: string) => {
  const { data: actAttachments, isLoading: isLoadingActAttachments } = useQuery(
    [`actAttachments-${actId}`, actId],
    () => getActAttachmentsById(actId),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  return { actAttachments, isLoadingActAttachments };
};
