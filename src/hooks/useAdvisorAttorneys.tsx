import { useQuery } from "react-query";
import { getAdvisorAttorneys } from "../api/services/advisorAttorneys/advisorAttorneys";
import { GetAdvisorAttorneysotResponse } from "../api/services/advisorAttorneys/advisorAttorneys.interface";

export const useAdvisorAttorneys = () => {
  const { data, isLoading: loadingAdvisorAttorneysList } =
    useQuery<GetAdvisorAttorneysotResponse>(
      "advisorAttorneysList",
      getAdvisorAttorneys,
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  const advisorAttorneysList = data?.data.map((ad) => ({
    label: ad.txAssessor,
    value: ad.idAssessor,
    idProcurador: ad.idProcurador,
  }));

  return { advisorAttorneysList, loadingAdvisorAttorneysList };
};
