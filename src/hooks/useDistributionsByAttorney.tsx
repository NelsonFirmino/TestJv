import { useQuery } from "react-query";
import { getDistributionByAttorneyId } from "../api/services/attorneys/attorneys";

export const useDistributionsByAttorney = (attorneyId: number) => {
    const { data: distributions, isLoading: isLoadingDistributions } = useQuery(
        [`distributions-attorney-${attorneyId}`, attorneyId],
        () => getDistributionByAttorneyId(attorneyId),
        {
            staleTime: 1000 * 60 * 60 * 24, // 1 dia
        }
    );

    return { distributions, isLoadingDistributions };
};
