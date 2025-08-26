import axiosInstance from "../../axiosInstance";
import { GetRegionaisResponse } from "./regionais.interface";

export const getRegionais = async (): Promise<GetRegionaisResponse> => {
  const regionais = await axiosInstance.get("/api/v1.0/Regionais?page=1&pageSize=10");

  return regionais.data;
};
