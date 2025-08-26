import axiosInstance from "../../axiosInstance";
import { GetProcessParams, GetProcessResponse } from "./process.interface";

export const getProcess = async ({
  consultData,
  page = "1",
  pageSize = "1000",
  resource = 0,
}: GetProcessParams): Promise<GetProcessResponse> => {
  let endpoint = "";
  let params: any = {
    txNumero: consultData,
    page,
    pageSize,
  };

  switch (resource) {
    case 0:
      endpoint = "Processos/autocomplete";
      break;
    case 1:
      params = {
        txCpfCnpj: consultData,
        page,
        pageSize,
      };
      endpoint = "processos-partes/documento";
      break;
  }

  const processsList = await axiosInstance.get(`/api/v1.0/${endpoint}`, {
    params,
  });

  return processsList.data;
};
