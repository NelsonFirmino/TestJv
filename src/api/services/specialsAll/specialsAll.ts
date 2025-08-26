import axiosInstance from "../../axiosInstance";
import { GetSpecialsResponse } from "./specialsAll.interface";

export const getAllSpecials = async (): Promise<GetSpecialsResponse> => {
  const specialsAllList = await axiosInstance.get(
    "/api/v1.0/Especializada/Ordernada",
    {
      params: { isBloqueado: "" },
    }
  );

  return specialsAllList.data;
};
