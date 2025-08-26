import { useQuery } from "react-query";
import {
  getReasonsRequestsRubric,
  getReasonsRequestsRubricByRazaoPedido,
} from "../api/services/reasonsRequestsRubrics/reasonsRequestsRubrics";
import { GetResponse } from "../api/services/reasonsRequestsRubrics/reasonsRequestsRubrics.interface";

export const useGetReasonsRequestsRubric = () => {
  const {
    data: reasonsRequestsRubricList,
    isLoading: loadingReasonsRequestsRubricList,
  } = useQuery<GetResponse>(
    "reasonsRequestsRubricList",
    () => getReasonsRequestsRubric({}),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { reasonsRequestsRubricList, loadingReasonsRequestsRubricList };
};
