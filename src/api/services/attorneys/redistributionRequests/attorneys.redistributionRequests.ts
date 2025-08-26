import axiosInstance from "../../../axiosInstance";
import { GetAttorneyRedistributionRequestsResponse } from "./attorneys.redistributionRequests.interface";

export const getAttorneyRedistributionRequests = async (
  id: string,
): Promise<GetAttorneyRedistributionRequestsResponse> => {
  const AttorneysRedistributionRequests = await axiosInstance.get(
    `/api/v1.0/redistribuicoes/pedidos/procurador-chefe/${id}`,
  );

  return AttorneysRedistributionRequests.data;
};
