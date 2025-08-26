import axiosInstance from "../../axiosInstance";
import {
  GetProcessClassByIdResponse,
  GetProcessClassResponse,
} from "./processClass.interface";

export const getProcessClass = async (): Promise<GetProcessClassResponse> => {
  const processClass = await axiosInstance.get(
    `/api/v1.0/Classes?page=1&pageSize=801`
  );

  return processClass.data;
};

export const getProcessClassById = async (
  idClass: number
): Promise<GetProcessClassByIdResponse> => {
  const processClass = await axiosInstance.get(`/api/v1.0/Classes/${idClass}`);

  return processClass.data;
};
