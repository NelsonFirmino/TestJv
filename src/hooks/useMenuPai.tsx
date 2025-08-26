import { useQuery } from "react-query";
import { getMenuPai } from "../api/services/menu/menu";

export const useMenuPai = () => {
  const { data: menuPaiData, isLoading: isLoadingMenuPai } = useQuery(
    ["menus_pai"],
    () => getMenuPai(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const menuPai = menuPaiData?.data.map((at) => ({
    label: at.txMenu,
    value: at.id,
  }));

  return { menuPai, isLoadingMenuPai };
};
