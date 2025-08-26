import axiosInstance from "../../axiosInstance";
import * as I from "./users.interface";

export const getUser = async (id: number): Promise<I.GetUserDataResponse> => {
  const processData = await axiosInstance.get(`/api/v1.0/Usuarios/${id}`);

  return processData.data;
};

export const getUsers = async (id_perfil: number): Promise<I.GetUsersResponse> => {
  try {
    const { data } = await axiosInstance.get('/api/v1.0/usuarios', {
      params: {
        id_perfil
      }
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};
