import { useQuery } from "react-query";
import { getActObservationsById } from "../api/services/acts/acts";

export const useActObservations = (actId: string) => {
  const { data: actObservations, isLoading: isLoadingActObservations } =
    useQuery(
      [`actObservation-${actId}`, actId],
      () => getActObservationsById(actId),
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  return { actObservations, isLoadingActObservations };
};
