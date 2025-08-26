import axiosInstance from "../../axiosInstance";
import { GetMateriasResponse } from "./materias.interface";

export const getMaterias = async (): Promise<GetMateriasResponse> => {
  const materiasList = await axiosInstance.get("/api/v1.0/Materias", {
    params: {
      page: 1,
      pageSize: 100,
    },
  });

  return materiasList.data;
};

export const deleteMateria = async (
  id: number
): Promise<GetMateriasResponse> => {
  const deleteMateria = await axiosInstance.delete(`/api/v1.0/Materias/${id}`);
  return deleteMateria.data;
};

export const postMateria = async (
  txMateria: string
): Promise<GetMateriasResponse> => {
  const postMateria = await axiosInstance.post(`/api/v1.0/Materias`, {
    txMateria,
  });

  return postMateria.data;
};

export const updateMateria = async (
  id: number,
  txMateria: string
): Promise<GetMateriasResponse> => {
  const updateMateria = await axiosInstance.put(`/api/v1.0/Materias/${id}`, {
    txMateria,
  });

  return updateMateria.data;
};
