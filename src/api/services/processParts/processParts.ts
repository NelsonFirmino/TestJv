import axiosInstance from "../../axiosInstance";
import {
  AddProcessPartParams,
  AutoCompletePartsParams,
  AutoCompletePartsResponse,
  DeleteProcessPartResponse,
  GetProcessPartsResponse,
  ListaParteResponse,
} from "./processParts.interface";

export const postProcessPart = async (
  params: AddProcessPartParams
): Promise<void> => {
  const processParts = await axiosInstance.post(
    `/api/v1.0/processos-partes`,
    params
  );

  return processParts.data;
};

export const getProcessPart = async (
  processId?: string
): Promise<GetProcessPartsResponse> => {
  const processParts = await axiosInstance.get(
    `/api/v1.0/Processos/${processId}/partes`
  );

  return processParts.data;
};

export const autoCompleteParts = async ({
  txCpf,
  txParte,
  fieldSearch,
  typeSearch,
  page,
  pageSize,
}: AutoCompletePartsParams): Promise<AutoCompletePartsResponse> => {
  let params: any = {
    page,
    pageSize,
  };

  switch (fieldSearch) {
    case "0":
      if (typeSearch === "0") {
        txParte.length > 0
          ? (params.txParte = txParte + "%")
          : (params.txParte = "");
      } else {
        txParte.length > 0
          ? (params.txParte = "%" + txParte?.toUpperCase() + "%")
          : (params.txParte = "");
      }
      break;
    case "1":
      params.txCpf = txCpf!.replace(/\D/g, "");
      break;
    case "2":
      params.txCpf = txCpf!.replace(/\D/g, "");
      break;
    default:
      params.txCpf = txCpf!.replace(/\D/g, "");
  }

  const processParts = await axiosInstance.get(
    `/api/v1.0/Partes/autocomplete`,
    { params }
  );

  return processParts.data;
};

export const deleteProcessPart = async (
  partId?: number
): Promise<DeleteProcessPartResponse> => {
  const processParts = await axiosInstance.delete(
    `/api/v1.0/processos-partes/${partId}`
  );

  return processParts.data;
};

export const getListaPartesProcessos =
  async (): Promise<ListaParteResponse> => {
    const listaPartesProcessos = await axiosInstance.get(
      `/api/v1.0/processos-partes/sem-documento`
    );

    return listaPartesProcessos.data;
  };
