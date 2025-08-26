import { useQuery } from "react-query";
import { getAttachmentAbsence } from "../api/services/absences/absences";

export const useAttachmentAbsense = (absense_id: string) => {
  const { data: attachmentAbsence, isLoading: isLoadingAttachmentAbsence } =
    useQuery(
      [`absenseAttachment-${absense_id}`, absense_id],
      () => getAttachmentAbsence(absense_id),
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  return { attachmentAbsence, isLoadingAttachmentAbsence };
};
