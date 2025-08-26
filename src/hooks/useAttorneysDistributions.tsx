import { useQuery } from "react-query";
import { getAttorneyProcessesInOperation } from "../api/services/attorneys/processesInOperation/attorneys.processesInOperation";

export const useAttorneysDistributions = (id: string) => {
  const {
    data: attorneyDistributionsList,
    isLoading: isLoadingAttorneysDistributionsList,
  } = useQuery(id, () => getAttorneyProcessesInOperation({ id }), {
    staleTime: 1000 * 60 * 60 * 24, // 1 dia
    keepPreviousData: true,
  });

  return { attorneyDistributionsList, isLoadingAttorneysDistributionsList };
};
