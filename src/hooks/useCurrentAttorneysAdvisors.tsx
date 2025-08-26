import { useQuery } from "react-query";
import { getAttorneysAdvisors } from "../api/services/attorneys/advisors/attorneys-advisors";
import { GetAttorneysAdvisorsResponse } from "../api/services/attorneys/advisors/attorneys-advisors.interface";
import { SharedState } from "../context/SharedContext";

export const useCurrentAttorneysAdvisors = () => {
  const { user } = SharedState();

  const { data, isLoading: loadingAttorneysAdvisorsList } =
    useQuery<GetAttorneysAdvisorsResponse>(
      [`currentAttorneysAdvisors-${user["Jvris.User.Id"]}`, user["Jvris.User.Id"]],
      () => getAttorneysAdvisors({ idProcurador: user["Jvris.User.Id"] }),
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  const attorneysAdvisorsList = data?.data?.map((ad) => ({
    txAssessor: ad.txAssessor,
    id: ad.id,
    value: ad.id,
    label: ad.txAssessor,
  }));

  attorneysAdvisorsList?.sort((a, b) =>
    a.label.trim().localeCompare(b.label.trim())
  );

  return { attorneysAdvisorsList, loadingAttorneysAdvisorsList };
};
