import axiosInstance from "../../axiosInstance";
import { GetPartesParams, GetPartesResponse } from "./partes.interface";

export const getPartes = async (): Promise<GetPartesResponse> => {
  const partes = await axiosInstance.get(
    `/api/v1.0/Partes?page=1&pageSize=1000`
  );

  return partes.data;
};

export const getParteEspecifica = async ({
  txCpf,
  txParte,
}: GetPartesParams): Promise<GetPartesResponse> => {
  const parteEspec = await axiosInstance.get(`/api/v1.0/Partes/autocomplete`, {
    params: {
      page: 1,
      pageSize: 100,
      txCpf,
      txParte,
    },
  });

  return parteEspec.data;
};

export const deleteParte = async (id: number): Promise<GetPartesResponse> => {
  const deleteParte = await axiosInstance.delete(`/api/v1.0/Partes/${id}`);
  return deleteParte.data;
};

export const postParte = async (
  txParte: string,
  txTipoPessoa: string,
  txCpfCnpj: string,
  idUsuarioCadastro: string
): Promise<GetPartesResponse> => {
  const postParte = await axiosInstance.post(`/api/v1.0/Partes`, {
    txParte,
    txTipoPessoa,
    txCpfCnpj,
    idUsuarioCadastro,
  });

  return postParte.data;
};

export const updateParte = async (
  id: number,
  txParte: string,
  txTipoPessoa: string,
  txCpfCnpj: string,
  idUsuarioCadastro: string
): Promise<GetPartesResponse> => {
  const updateParte = await axiosInstance.put(`/api/v1.0/Partes/${id}`, {
    txParte,
    txTipoPessoa,
    txCpfCnpj,
    idUsuarioCadastro,
  });

  return updateParte.data;
};
