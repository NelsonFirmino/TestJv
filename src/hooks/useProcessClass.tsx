import { useQuery } from "react-query";
import { getProcessClass } from "../api/services/processClass/processClass";

export const useProcessClass = () => {
  const { data, isLoading: isLoadingProcessClass } = useQuery(
    "getProcessClass",
    getProcessClass,
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const processClass = data?.data.map((pc) => ({
    label: pc.txClasse,
    value: pc.id,
  }));

  return { processClass, isLoadingProcessClass };
};
