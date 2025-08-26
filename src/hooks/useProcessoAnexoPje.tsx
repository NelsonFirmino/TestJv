import { useQuery } from "react-query";
import { GetProcessoAnexoPJe } from "../api/services/process/process";

export const useProcessoAnexoPJe = (processId: string) => {
  const { data: processoAnexoPJe, isLoading: isLoadingProcessoAnexoPJe } =
    useQuery(
      [`processoAnexoPje-${processId}`, processId],
      () => GetProcessoAnexoPJe(processId),
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  return { processoAnexoPJe, isLoadingProcessoAnexoPJe };
};
