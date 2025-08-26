import { useQuery } from "react-query";
import { getProcessLinks } from "../api/services/processLinks/processLinks";

export const useProcessLinks = (processId?: string) => {
  const { data: processLinks, isLoading: isLoadingProcessLinkss } = useQuery(
    [`processLinks-${processId}`, processId],
    () => getProcessLinks(processId),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { processLinks, isLoadingProcessLinkss };
};
