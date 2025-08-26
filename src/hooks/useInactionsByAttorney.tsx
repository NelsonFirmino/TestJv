import { useQuery } from "react-query";
import { getRequestsForInactionByAttorneyId } from "../api/services/attorneys/attorneys";

export const useInactionsByAttorney = (attorneyId: number) => {
    const { data: inactions, isLoading: isLoadingInactions } = useQuery(
        [`inactions-attorney-${attorneyId}`, attorneyId],
        () => getRequestsForInactionByAttorneyId(attorneyId),
        {
            staleTime: 1000 * 60 * 60 * 24, // 1 dia
        }
    );

    return { inactions, isLoadingInactions };
};
