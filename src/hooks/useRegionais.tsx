import { useQuery } from "react-query";
import { getComarcas } from "../api/services/comarcas/comarcas";
import { getRegionais } from "../api/services/regionais/regionais";

export const useRegionais = () => {
  const { data, isLoading: loadingRegionaisList } = useQuery(
    ["regionais"],
    () => getRegionais(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const regionaisList = data?.data.map((at) => ({
    label: at.txRegional,
    value: at.id,
  }));


  return { regionaisList, loadingRegionaisList };
};
