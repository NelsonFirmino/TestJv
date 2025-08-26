import { useQuery } from "react-query";
import { getProcessSecretaries } from "../api/services/processSecretaries/processSecretaries";
import { GetProcessSecretariesResponse } from "../api/services/processSecretaries/processSecretaries.interface";

export const useProcessSecretaries = () => {
  const { data: processSecretaries, isLoading: isLoadingProcessSecretaries } =
    useQuery<GetProcessSecretariesResponse>(
      "processSecretaries",
      getProcessSecretaries,
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  return { processSecretaries, isLoadingProcessSecretaries };
};

export const useProcessSecretariesSelect = () => {
  const { data, isLoading: isLoadingProcessSecretariesList } =
    useQuery<GetProcessSecretariesResponse>(
      "processSecretaries",
      getProcessSecretaries,
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  const processSecretariesList = data?.data?.map((obj) => ({
    label: obj.txSistemaProcessual,
    value: obj.id,
  }));

  return { processSecretariesList, isLoadingProcessSecretariesList };
};
