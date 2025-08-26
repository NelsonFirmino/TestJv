import { useQuery } from "react-query";
import { getAttorneyBySpecialId } from "../api/services/attorneys/attorneys";

export const useAttorneyBySpecialId = (specialId: number) => {
    const { data, isLoading: isLoadingAttorneysBySpecial } = useQuery(
        [`attorneysBySpecial-${specialId}`, specialId],
        () => getAttorneyBySpecialId(specialId),
        {
            staleTime: 1000 * 60 * 60 * 24, // 1 dia
        }
    );

    const attorneysBySpecial = data?.data?.map((at) => ({
        label: at.txProcurador,
        value: at.id,
    }));

    return { attorneysBySpecial, isLoadingAttorneysBySpecial };
};
