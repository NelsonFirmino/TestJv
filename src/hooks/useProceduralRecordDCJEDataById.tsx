import { useQuery } from "react-query";
import { getProceduralRecordDCJEDataById } from "../api/services/dcje/dcje";

export const useProceduralRecordDCJEDataById = (idAto: string) => {
  const {
    data: proceduralRecordDCJEDataById,
    isLoading: isLoadingProceduralRecordDCJEDataById,
  } = useQuery(
    [`proceduralRecordDCJEDataById-${idAto}`, idAto],
    () => getProceduralRecordDCJEDataById(idAto),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return {
    proceduralRecordDCJEDataById,
    isLoadingProceduralRecordDCJEDataById,
  };
};
