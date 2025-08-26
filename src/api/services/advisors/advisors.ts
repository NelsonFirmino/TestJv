import axiosInstance from "../../axiosInstance";
import { GetAdvisorsResponse } from "./advisors.interface";

export const getAdvisors = async (): Promise<GetAdvisorsResponse> => {
  const advisors = await axiosInstance.get("/api/v1.0/Assessores");

  return advisors.data;
};
