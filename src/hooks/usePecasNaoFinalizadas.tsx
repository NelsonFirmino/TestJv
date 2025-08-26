import { useQuery } from "react-query";
import { getPecasNaoFinalizadasByAttorneyId } from "../api/services/pecasNaoFinalizadas/pecasNaoFinalizadas";

export const usePecasNaoFinalizadas = (id: number) => {
  const { data: pecasNaoFinalizadas, isLoading: isLoadingPecasNaoFinalizadas } =
    useQuery(
      [`pecasNaoFinalizadas-${id}`, id],
      () => getPecasNaoFinalizadasByAttorneyId({id}),
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );

  return { pecasNaoFinalizadas, isLoadingPecasNaoFinalizadas };
};
