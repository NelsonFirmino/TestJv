import { useQuery } from "react-query";
import { GetProcessoPecas } from "../api/services/process/process";

export const useProcessoPecas = (idProcesso: string) => {
    const { data: processoPecas, isLoading: isLoadingProcessoPecas } = useQuery(
      [`processoPecas-${idProcesso}`],
      () => GetProcessoPecas(idProcesso),
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );
  
    return { processoPecas, isLoadingProcessoPecas };
  };
  