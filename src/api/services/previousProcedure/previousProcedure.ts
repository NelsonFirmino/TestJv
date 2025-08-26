import axiosInstance from "../../axiosInstance";
import { GetPreviousProcedureResponse } from "./previousProcedure.interface";

export const getPreviousProcedure = async (
  processId?: string
): Promise<GetPreviousProcedureResponse> => {
  const previousProcedure = await axiosInstance.get(
    `/api/v1.0/processos/${processId}/tramitacao-anterior`
  );

  return previousProcedure.data;
};
