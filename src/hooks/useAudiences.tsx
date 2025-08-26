import { useQuery } from "react-query";
import { GetAudiencesResponse } from "../api/services/audiencies/audiences.interface";
import { getAudiences } from "../api/services/audiencies/audiences";

export const useAudiences = () => {
  const { data, isLoading: loadingAudiencesList } =
    useQuery<GetAudiencesResponse>("audiencesList", getAudiences, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  const audiencesList = data?.data.map((au) => ({
    label: au.txTipoAudiencia,
    value: au.id,
  }));

  audiencesList?.sort((a, b) => a.label.trim().localeCompare(b.label.trim()));

  return { audiencesList, loadingAudiencesList };
};
