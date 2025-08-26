import { useQuery } from "react-query";
import { GetMenuSPAByProfileId } from "../api/services/menu/menu";

export const useMenuProfile = (profile_id: number) => {
  const { data: menuProfile, isLoading: isLoadingMenuProfile } = useQuery(
    [`menu-profile-${profile_id}`, profile_id],
    () => GetMenuSPAByProfileId(profile_id),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { menuProfile, isLoadingMenuProfile };
};
