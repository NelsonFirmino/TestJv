import { useQuery } from "react-query";
import { GetAdvisorsByAttorneyId } from "../api/services/assessores";

export const useAdvisorsByAttorney = (attorneyId: number) => {
    const { data, isLoading: isLoadingAdvisorsByAttorney } = useQuery(
        [`advisord-attorney-${attorneyId}`, attorneyId],
        () => GetAdvisorsByAttorneyId(attorneyId),
        {
            staleTime: 1000 * 60 * 60 * 24, // 1 dia
        }
    );

    const advisorsByAttorney = data?.data?.map((at) => ({
        label: at.txAssessor,
        value: at.id,
    }));

    return { advisorsByAttorney, isLoadingAdvisorsByAttorney };
};
