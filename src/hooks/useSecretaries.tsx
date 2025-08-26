import { useQuery } from "react-query";
import { getSecretaries } from "../api/services/secretaries/secretaries";
import { GetSecretariesResponse } from "../api/services/secretaries/secretaries.interface";

export const useSecretaries = () => {
  const { data, isLoading: loadingSecretariesist } =
    useQuery<GetSecretariesResponse>("secretariesList", getSecretaries, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  const secretariesList = data?.data.map((at) => ({
    label: at.txSecretaria,
    value: at.id,
  }));

  return { secretariesList, loadingSecretariesist };
};
