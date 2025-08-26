import { useQuery } from "react-query";
import { listAbsencesAttorney } from "../api/services/absences/absences";

export const useAbsencesAttorney = () => {
  const { data: absencesAttorney, isLoading: isLoadingAbsencesAttorney } =
    useQuery([`absencesAttorney}`], () => listAbsencesAttorney, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  return { absencesAttorney, isLoadingAbsencesAttorney };
};
