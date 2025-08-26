import { useQuery } from "react-query";
import { getProcessAttachmentsDCJE } from "../api/services/processAttachments/processAttachments";

export const useProcessAttachmentsDCJE = (processId: string) => {
  const {
    data: processAttachmentsDCJE,
    isLoading: isLoadingProcessAttachmentsDCJE,
  } = useQuery(
    [`processAttachmentsDCJEMirror-${processId}`, processId],
    () => getProcessAttachmentsDCJE(processId),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { processAttachmentsDCJE, isLoadingProcessAttachmentsDCJE };
};
