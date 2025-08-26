import { useQuery } from "react-query";
import { getProceduralRecordDCJEDataByActId } from "../api/services/dcje/actsDCJE/actsDCJE";

export const useProceduralRecordDCJEDataByActId = (idAto: string) => {
    const {
        data: proceduralRecordDCJEDataByActId,
        isLoading: isLoadingProceduralRecordDCJEDataByActId
    } = useQuery(
        [`proceduralRecordDCJEDataByActId-${idAto}`, idAto],
        () => getProceduralRecordDCJEDataByActId(idAto),
        {
            staleTime: 1000 * 60 * 60 * 24 // 1 dia
        }
    );

    return {
        proceduralRecordDCJEDataByActId,
        isLoadingProceduralRecordDCJEDataByActId
    };
};
