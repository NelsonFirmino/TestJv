import axiosInstance from "../../axiosInstance";
import { GetProcessOverviewResponse } from "./processOverview.interface";

export const getProcessOverview = async (
  processId?: string
): Promise<GetProcessOverviewResponse> => {
  const processOverview = await axiosInstance.get(
    `/api/v1.0/relatorios/${processId}/espelho-processo`
  );

  return processOverview.data;
};
