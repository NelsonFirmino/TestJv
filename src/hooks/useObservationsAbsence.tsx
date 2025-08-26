import { useQuery } from "react-query";
import { getObservationAbsence } from "../api/services/absences/absences";

export const useObservationsAbsense = (absense_id: string) => {
  const { data: absenseObservation, isLoading: isLoadingAbsenseObservation } =
    useQuery(
      [`absenseObservation-${absense_id}`, absense_id],
      () => getObservationAbsence(absense_id),
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  return { absenseObservation, isLoadingAbsenseObservation };
};
