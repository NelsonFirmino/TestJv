import { useQuery } from "react-query";
import { getRedistributionsByAttorneyId } from "../api/services/attorneys/attorneys";

export const useRedistributionsByAttorney = (attorneyId: number) => {
    const { data: redistributions, isLoading: isLoadingRedistributions } = useQuery(
        [`redistributions-attorney-${attorneyId}`, attorneyId],
        () => getRedistributionsByAttorneyId(attorneyId),
        {
            staleTime: 1000 * 60 * 60 * 24, // 1 dia
        }
    );

    return { redistributions, isLoadingRedistributions };
};
