import { useQuery } from "react-query";
import { getIndiceById } from "../api/services/indices/indices";

export const useIndice = (indiceId: number) => {
  const { data: indice, isLoading: isLoadingIndice } = useQuery(
    [`indice-${indiceId}`, indiceId],
    () => getIndiceById(indiceId),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { indice, isLoadingIndice };
};
