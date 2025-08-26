import axiosInstance from "../../axiosInstance";
import { GetAccountantsResponse } from "./accountants.interface";

export const getAccountants = async (): Promise<GetAccountantsResponse> => {
  const attorneys = await axiosInstance.get("/api/Contadores");

  return attorneys.data;
};
