import axiosInstance from "../../axiosInstance";
import { GetProcessLinksResponse } from "./processLinks.interface";

export const getProcessLinks = async (
  processId?: string
): Promise<GetProcessLinksResponse> => {
  const processLinks = await axiosInstance.get(
    `/api/v1.0/Processos/${processId}/vinculados`
  );

  return processLinks.data;
};
