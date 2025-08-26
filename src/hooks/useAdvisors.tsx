import { useQuery } from "react-query";
import { GetAdvisorsResponse } from "../api/services/advisors/advisors.interface";
import { getAdvisors } from "../api/services/advisors/advisors";

export const useAdvisors = () => {
  const { data, isLoading: loadingAdvisorsList } =
    useQuery<GetAdvisorsResponse>("advisorsList", getAdvisors, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  const advisorsList = data?.data.map((ad) => ({
    label: ad.txAssessor,
    value: ad.id,
  }));

  advisorsList?.sort((a, b) => a.label.trim().localeCompare(b.label.trim()));

  return { advisorsList, loadingAdvisorsList };
};
