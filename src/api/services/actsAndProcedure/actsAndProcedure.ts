import axiosInstance from "../../axiosInstance";
import { GetActsAndProcedure } from "./actsAndProcedure.interface";

export const getActsAndProcedure = async (
  processId?: string
): Promise<GetActsAndProcedure> => {
  const { data } = await axiosInstance.get(
    `/api/v1.0/Processos/${processId}/atos`
  );

  return data;
};
