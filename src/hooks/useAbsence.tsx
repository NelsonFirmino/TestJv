import { useQuery } from "react-query";
import { getAbsence } from "../api/services/absences/absences";

export const useAbsense = (absense_id: string) => {
  const { data: absense, isLoading: isLoadingAbsense } = useQuery(
    [`absense-${absense_id}`, absense_id],
    () => getAbsence(absense_id),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { absense, isLoadingAbsense };
};
