import { useQuery } from "react-query";
import { getActDCJEAttachments } from "../api/services/dcje/actsDCJE/actsDCJEAttachments/actsDCJEAttachments";

export const useActDCJEAttachments = (id: number, options = {}) => {
  const { data: actDCJEAttachments, isLoading: isLoadingActDCJEAttachments } =
    useQuery(
      id && [`actDCJEAttachments-${id}`, id],
      () => getActDCJEAttachments(id),
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 day
        ...options,
      }
    );

  return { actDCJEAttachments, isLoadingActDCJEAttachments };
};
