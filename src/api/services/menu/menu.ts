import axiosInstance from "../../axiosInstance";
import { MenuProfileResponse, MenuResponse } from "./menu.interface";

export const GetMenuSPAByProfileId = async (
  profile_id: number
): Promise<MenuProfileResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/Perfis/${profile_id}/menus-spa`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMenus = async (): Promise<MenuResponse> => {
  try {
    const menus = await axiosInstance.get(
      "/api/v1.0/MenusSPA?page=1&pageSize=100"
    );

    return menus.data;
  } catch (error) {
    console.error(error);
  }
};

export const getMenuPai = async (): Promise<MenuResponse> => {
  try {
    const menuPai = await axiosInstance.get(
      "/api/v1.0/MenusSPA/listar-menus-pai"
    );

    return menuPai.data;
  } catch (error) {
    console.error(error);
  }
};

// export const deleteComarca = async (
//   id: number
// ): Promise<GetComarcasResponse> => {
//   const deleteComarca = await axiosInstance.delete(`/api/v1.0/Comarcas/${id}`);
//   return deleteComarca.data;
// };

export const postMenu = async (
  txMenu: string,
  txPagina: string,
  nuOrdem: number,
  idMenu_Pai?: number,
  txIcone?: string
): Promise<MenuResponse> => {
  const postMenu = await axiosInstance.post(`/api/v1.0/MenusSPA/`, {
    txMenu,
    txPagina,
    nuOrdem,
    idMenu_Pai,
    txIcone,
  });

  return postMenu.data;
};

export const updateMenu = async (
  id: number,
  txMenu: string,
  txPagina: string,
  nuOrdem: number,
  idMenu_Pai?: number,
  txIcone?: string
): Promise<MenuResponse> => {
  const updateMenu = await axiosInstance.put(`/api/v1.0/MenusSPA/${id}`, {
    txMenu,
    txPagina,
    nuOrdem,
    idMenu_Pai,
    txIcone,
  });

  return updateMenu.data;
};

export const deleteMenu = async (id: number): Promise<MenuResponse> => {
  const deleteMenu = await axiosInstance.delete(`/api/v1.0/MenusSPA/${id}`);
  return deleteMenu.data;
};
