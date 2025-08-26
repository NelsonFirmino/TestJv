import { useQuery } from "react-query";
import { getDispatchObservations } from "../api/services/dispatch/dispatchModal/dispatch";

export const useActDispatchObservations = (actId: number) => {
    const { data: actDispatchObservations, isLoading: isLoadingActDispatchObservations } = useQuery(
        [`act-dispatch-observations-${actId}`, actId],
        () => getDispatchObservations(actId),
        {
            staleTime: 1000 * 60 * 60 * 24, // 1 dia
        }
    );

    return { actDispatchObservations, isLoadingActDispatchObservations };
};
