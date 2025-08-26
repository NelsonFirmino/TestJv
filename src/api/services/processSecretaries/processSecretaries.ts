import axiosInstance from "../../axiosInstance";
import { GetProcessSecretariesResponse } from "./processSecretaries.interface";

export const getProcessSecretaries = async (): Promise<GetProcessSecretariesResponse> => {
  const processSecretariesList = await axiosInstance.get("/api/v1.0/sistemas-processuais", {
    params: {
      page: 1,
      pageSize: 10,
    },
  });

  return processSecretariesList.data;
};
