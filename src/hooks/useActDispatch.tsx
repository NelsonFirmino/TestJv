import { useQuery } from "react-query";
import { getDispatch } from "../api/services/dispatch/dispatchModal/dispatch";

export const useActDispatch = (actId: number) => {
    const { data: actDispatch, isLoading: isLoadingActDispatch } = useQuery(
        [`act-dispatch-${actId}`, actId],
        () => getDispatch(actId),
        {
            staleTime: 1000 * 60 * 60 * 24, // 1 dia
        }
    );

    return { actDispatch, isLoadingActDispatch };
};
