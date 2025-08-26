import axiosInstance from "../../axiosInstance";
import {
  GetProfileMenusParams,
  GetProfileMenusResponse,
} from "./profile.interface";

export const getProfileMenus = async ({
  profileId,
}: GetProfileMenusParams): Promise<GetProfileMenusResponse> => {
  try {
    const profileMenus = await axiosInstance.get<GetProfileMenusResponse>(
      `/api/v1.0/Perfis/${profileId}/menus`
    );

    return profileMenus.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
