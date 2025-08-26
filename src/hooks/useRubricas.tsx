import { useQuery } from "react-query";
import { getListRubricas } from "../api/services/rubrica/rubrica";
import { GetListRubricasResponse } from "../api/services/rubrica/rubrica.interface";

export const useRubricas = () => {
  const { data: rubricas, isLoading: isLoadingRubricas } =
    useQuery<GetListRubricasResponse>("listRubricas", getListRubricas, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  return { rubricas, isLoadingRubricas };
};
