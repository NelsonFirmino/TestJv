import axiosInstance from "../../axiosInstance";
import { GetTribunaisResponse, GetTribunaisParams } from "./tribunais.interface";

export const getTribunais = async ({
  page = "1",
  pageSize = "50",
}: GetTribunaisParams): Promise<GetTribunaisResponse> => {
  let params: any = {
    page,
    pageSize,
  };
  const response = await axiosInstance.get(`/api/v1.0/Tribunais`, {
    params,
  });

  return response.data;
};

export const deleteTribunal = async (
  id: number
): Promise<GetTribunaisResponse> => {
  const deleteTribunal = await axiosInstance.delete(`/api/v1.0/Tribunais/${id}`);
  return deleteTribunal.data;
};

export const postTribunal = async (
  txTribunal: string,
  txSigla: string
): Promise<GetTribunaisResponse> => {
  const postTribunal = await axiosInstance.post(`/api/v1.0/Tribunais`, {
    txTribunal,
    txSigla,
  });

  return postTribunal.data;
};

export const updateTribunal = async (
  id: number,
  txTribunal: string,
  txSigla: string
): Promise<GetTribunaisResponse> => {
  const updateTribunal = await axiosInstance.put(`/api/v1.0/Tribunais/${id}`, {
    txTribunal,
    txSigla,
  });

  return updateTribunal.data;
};
