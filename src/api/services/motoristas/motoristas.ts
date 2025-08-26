import axiosInstance from "../../axiosInstance";
import { GetResponse, PutPostParams } from "./motoristas.interface";

export const postMotorista = async ({
  txMotorista,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/Motoristas`, {
    txMotorista,
  });

  return response.data;
};

export const getMotoristas = async (): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/Motoristas?page=1&pageSize=100`);

  return response.data;
};

export const getMotoristaByID = async (id: number): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/Motoristas/${id}`);

  return response.data;
};

export const putMotoristaByID = async ({
  id,
  txMotorista,
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.put(`/api/v1.0/Motoristas/${id}`, {
    txMotorista,
  });

  return response.data;
};

export const deleteMotoristaByID = async (id: number): Promise<GetResponse> => {
  const response = await axiosInstance.delete(`/api/v1.0/Motoristas/${id}`);

  return response.data;
};
