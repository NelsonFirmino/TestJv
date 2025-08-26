import axiosInstance from "../../axiosInstance";
import { GetSecretariesResponse } from "./secretaries.interface";

export const getSecretaries = async (): Promise<GetSecretariesResponse> => {
  const secretariesList = await axiosInstance.get("/api/v1.0/Secretarias", {
    params: {
      page: 1,
      pageSize: 10,
    },
  });

  return secretariesList.data;
};
