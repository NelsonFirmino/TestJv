import axiosInstance from "../../axiosInstance";
import { GetCaixasResponse } from "./caixas.interface";

export const getCaixas = async (): Promise<GetCaixasResponse> => {
  const caixas = await axiosInstance.get(
    `/api/v1.0/Caixas?page=1&pageSize=10000`
  );

  return caixas.data;
};

export const deleteCaixa = async (id: number): Promise<GetCaixasResponse> => {
  const deleteCaixa = await axiosInstance.delete(`/api/v1.0/Caixas/${id}`);
  return deleteCaixa.data;
};

export const postCaixa = async (
  txCaixa: string,
  idUsuarioCadastro: string
): Promise<GetCaixasResponse> => {
  const postCaixa = await axiosInstance.post(`/api/v1.0/Caixas`, {
    txCaixa,
    idUsuarioCadastro,
  });

  return postCaixa.data;
};

export const updateCaixa = async (
  id: number,
  txCaixa: string,
  idUsuarioCadastro: string
): Promise<GetCaixasResponse> => {
  const updateCaixa = await axiosInstance.put(`/api/v1.0/Caixas/${id}`, {
    txCaixa,
    idUsuarioCadastro,
  });

  return updateCaixa.data;
};
