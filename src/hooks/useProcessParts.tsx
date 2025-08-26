import { useQuery } from "react-query";
import { getListaPartesProcessos, getProcessPart } from "../api/services/processParts/processParts";

export const useProcessParts = (processId?: string) => {
  const { data: processParts, isLoading: isLoadingProcessParts } = useQuery(
    [`processParts-${processId}`, processId],
    () => getProcessPart(processId),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { processParts, isLoadingProcessParts };
};


export const useListaPartesProcessos = () => {
  const { data: listaPartes, isLoading: isLoadingListaPartes } = useQuery(
    ["listaPartesProcessos"],
    () => getListaPartesProcessos(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { listaPartes, isLoadingListaPartes };
};
