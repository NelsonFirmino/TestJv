import axiosInstance from "../../axiosInstance";
import {
  GetProcessRelevanceResponse,
  PutProcessRelevanceParams,
} from "./processrelevance.interface";

export const getProcessRelevance =
  async (): Promise<GetProcessRelevanceResponse> => {
    const processRelevanceList = await axiosInstance.get(
      "/api/v1.0/Processos/relevancias"
    );

    return processRelevanceList.data;
  };

export const putProcessRelevance = async ({
  idProcesso,
  txRelevancia,
  idUsuarioCadastro,
}: PutProcessRelevanceParams): Promise<GetProcessRelevanceResponse> => {
  const response = await axiosInstance
    .put(`/api/v1.0/Processos/${idProcesso}/relevancia`, {
      txRelevancia,
      idUsuarioCadastro,
    })
    .then((res) => {
      return res.data;
    });

  return response;
};
