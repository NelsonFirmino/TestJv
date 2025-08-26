import { useQuery } from "react-query";
import { getAssuntosSemPaginacao } from "../api/services/assuntos/assuntos";

export const useAssuntosSemPaginacao = () => {
  const {
    data: assuntosSemPaginacao,
    isLoading: isLoadingAssuntosSemPaginacao,
  } = useQuery([`assuntosSemPaginacao`], () => getAssuntosSemPaginacao(), {
    staleTime: 1000 * 60 * 60 * 24, // 1 dia
  });

  return { assuntosSemPaginacao, isLoadingAssuntosSemPaginacao };
};
