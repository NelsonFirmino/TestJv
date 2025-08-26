import { getPontosFacultativos } from '../api/services/pontos-facultativos/pontos-facultativos';
import { useQuery } from "react-query";

//* =============== [PAGINACAO]
export const usePontosFacultativos = () => {
  const { data: pontosFacultativos, isLoading: isLoadingPontosFacultativos } =
  useQuery(["pontosFacultativos"],
    () => getPontosFacultativos(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { pontosFacultativos, isLoadingPontosFacultativos };
};
