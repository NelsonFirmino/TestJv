import { useQuery } from "react-query";
import { getProcessAttachments } from "../api/services/processAttachments/processAttachments";

export const useProcessAttachments = (processId: string) => {
  const { data: processAttachments, isLoading: isLoadingProcessAttachments } =
    useQuery(
      [`processAttachments-${processId}`, processId],
      () => getProcessAttachments(processId),
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  return { processAttachments, isLoadingProcessAttachments };
};
