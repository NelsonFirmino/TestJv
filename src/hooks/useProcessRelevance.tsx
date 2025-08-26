import { useQuery } from "react-query";
import { GetProcessRelevanceResponse } from "../api/services/processRelevance/processrelevance.interface";
import { getProcessRelevance } from "../api/services/processRelevance/processRelevance";

export const useProcessRelevance = () => {
  const { data, isLoading: loadingProcessRelevanceResponseList } =
    useQuery<GetProcessRelevanceResponse>(
      "processRelevanceList",
      getProcessRelevance,
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  const processRelevanceList = data?.data?.map((obj) => ({
    label: obj.txRelevancia,
    value: obj.idRelevancia,
    nuNivel: obj.nuNivel,
  }));

  return { processRelevanceList, loadingProcessRelevanceResponseList };
};
