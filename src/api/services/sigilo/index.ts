import axiosInstance from "../../axiosInstance";
import * as I from "./sigilo.interface";

export const GetUsersWithPermission = async ({
  id_processo,
}: I.GetUsersWithPermissionParams): Promise<I.GetUsersWithPermissionResponse> => {
  try {
    const { data } = await axiosInstance.get(`/api/v1.0/sigilo/${id_processo}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const GetSigiloLevelByProcess = async ({
  id_processo,
}: I.GetSigiloLevelByProcessParams): Promise<I.GetSigiloLevelByProcessResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/sigilo/nivel/${id_processo}`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const GetUsersBySigiloAndLoggedUser = async ({
  idUsuario,
  nuSigilo,
}: I.GetUsersBySigiloAndLoggedUserParams): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/sigilo/${idUsuario}/${nuSigilo}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const PatchRemoveUsersAccessProcess = async ({
  remover = true,
  listaUsuariosProcessos,
}: I.PatchRemoveUsersAccessProcessParams): Promise<any> => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1.0/Sigilo/lote/alterar/permissao/processo`,
      {
        remover,
        listaUsuariosProcessos,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const PatchAddUsersAccessProcess = async ({
  listaUsuariosProcessos,
}: I.PatchAddUsersAccessProcessParams): Promise<I.PatchAddUsersAccessProcessResponse> => {
  try {
    const { data } = await axiosInstance.patch(
      `/api/v1.0/Sigilo/lote/alterar/permissao/processo`,
      {
        listaUsuariosProcessos,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const DeleteUserAccessProcess = async ({
  id,
  idProcesso,
  idUsuario,
}: I.DeleteUserAccessProcessParams): Promise<I.PatchAddUsersAccessProcessResponse> => {
  try {
    const config = {
      data: {
        // Coloca o corpo da requisição aqui
        id,
        idProcesso,
        idUsuario,
      },
    };
    const { data } = await axiosInstance.request({
      url: "/api/v1.0/sigilo",
      method: "delete",
      ...config,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
