import { useQuery } from "react-query";
import { getComarcas } from "../api/services/comarcas/comarcas";

export const useComarcas = () => {
  const { data: comarcas, isLoading: loadingComarcasList } = useQuery(
    ["comarcas"],
    () => getComarcas(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { comarcas, loadingComarcasList };
};

export const useComarcasSelect = () => {
  const { data, isLoading: isLoadingComarcas } = useQuery(
    [`comarcas`],
    () => getComarcas(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const comarcas = data?.data.map((at) => ({
    label: at.txComarca,
    value: at.id,
  }));

  return { comarcas, isLoadingComarcas };
};
