import axiosInstance from "../../axiosInstance";
import {
  GetProcessExtractParams,
  GetProcessExtractResponse,
} from "./processextractbyparty.interface";

export const getProcessExtractByParty = async (
  txCpfCnpj: string,
): Promise<GetProcessExtractResponse> => {
  
  const processExtractList = await axiosInstance.get(`/api/v1.0/processos-partes/documento?txCpfCnpj=${txCpfCnpj}&page=1&pageSize=10`, {
  });

  return processExtractList.data;
};
