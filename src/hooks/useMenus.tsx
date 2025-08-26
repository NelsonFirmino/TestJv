import { useQuery } from "react-query";
import { getComarcas } from "../api/services/comarcas/comarcas";
import { getMenus } from "../api/services/menu/menu";

export const useMenus = () => {
  const { data: menus, isLoading: isLoadingMenus } = useQuery(
    ["menus"],
    () => getMenus(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { menus, isLoadingMenus };
};
