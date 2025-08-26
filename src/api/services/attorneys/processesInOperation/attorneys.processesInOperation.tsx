import axiosInstance from "../../../axiosInstance";
import { GetAttorneyProcessesInOperationParams, GetAttorneyProcessesInOperationResponse } from "./attorneys.processesInOperation.interface";

export const getAttorneyProcessesInOperation = async ({
  id,
  dtPrazoFinal,
  dtPrazoInicial
}: GetAttorneyProcessesInOperationParams): Promise<GetAttorneyProcessesInOperationResponse> => {
  const { data } = await axiosInstance.get(
    `/api/v1.0/Procuradores/${id}/distribuicoes`, {
    params: {
      dtPrazoFinal,
      dtPrazoInicial
    }
  }
  );

  return data;
};
