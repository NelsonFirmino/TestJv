import { useQuery } from "react-query";
import { getReasonsRequests } from "../api/services/reasonsRequests/reasonsRequests";
import { GetReasonsRequestsResponse } from "../api/services/reasonsRequests/reasonsRequests.interface";

export const useReasonsRequests = () => {
  const { data, isLoading: loadingReasonsRequestsList } =
    useQuery<GetReasonsRequestsResponse>(
      "reasonsRequestsList",
      () => getReasonsRequests({ pageSize: "200" }),
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  const reasonsRequestsList = data?.data.map((at) => ({
    label: at.txRazaoPedido,
    value: at.id,
  }));

  return { reasonsRequestsList, loadingReasonsRequestsList };
};

export const useGetReasonsRequests = () => {
  const { data: reasonsRequestsList, isLoading: loadingReasonsRequestsList } =
    useQuery<GetReasonsRequestsResponse>(
      "getReasonsRequestsList",
      () => getReasonsRequests({ pageSize: "200" }),
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  return { reasonsRequestsList, loadingReasonsRequestsList };
};
