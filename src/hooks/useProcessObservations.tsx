import { useQuery } from "react-query";
import { getProcessObservations } from "../api/services/processObservations/processObservations";

export const useProcessObservations = (processId?: string) => {
  const {
    data: processObservations,
    isLoading: isLoadingProcessObservationss,
  } = useQuery(
    [`processObservations-${processId}`, processId],
    () => getProcessObservations(processId),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { processObservations, isLoadingProcessObservationss };
};
