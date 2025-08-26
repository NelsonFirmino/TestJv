import axiosInstance from "../../../axiosInstance";
import { GetDispatchListResponse } from "./attorneys.interface";

export const getDispatchList = async (): Promise<GetDispatchListResponse> => {
  const dispatchList = await axiosInstance.get("/api/v1.0/tipos-despacho?page=1&pageSize=10");

  return dispatchList.data;
};
