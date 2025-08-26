import { useQuery } from "react-query";
import { getProcessData } from "../api/services/processData/processData";

export const useProcessData = (processId?: string) => {
  const { data: processData, isLoading: isLoadingProcessData } = useQuery(
    [`processData-${processId}`, processId],
    () => getProcessData(processId),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { processData, isLoadingProcessData };
};
