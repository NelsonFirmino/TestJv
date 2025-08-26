import { useQuery } from "react-query";
import { listTypesOfAbsences } from "../api/services/absences/absences";
import { GetTypeOfAbsencesResponse } from "../api/services/absences/absences.interface";

export const useListTypesOfAbsences = () => {
  const { data, isLoading: isLoadingTypesOfAbsences } =
    useQuery<GetTypeOfAbsencesResponse>(
      "listTypesOfAbsences",
      listTypesOfAbsences,
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  const typesOfAbsences = data?.data.map((ta) => ({
    label: ta.txTipoAusencia,
    value: ta.id,
  }));

  typesOfAbsences?.sort((a, b) => a.label.trim().localeCompare(b.label.trim()));

  return { typesOfAbsences, isLoadingTypesOfAbsences };
};
