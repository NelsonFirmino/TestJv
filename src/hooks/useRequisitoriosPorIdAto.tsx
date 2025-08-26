import { useQuery } from "react-query";
import { getRequisitoriosPorIdAto } from "../api/services/rpv/Requisitorio";

export const useRequisitoriosPorIdAto = (id?: number) => {
  const {
    data: requisitoriosPorIdAto,
    isLoading: isLoadingRequisitoriosPorIdAto,
  } = useQuery(
    [`getRequisitoriosPorIdAto-${id}`, id],
    () => getRequisitoriosPorIdAto(id),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { requisitoriosPorIdAto, isLoadingRequisitoriosPorIdAto };
};
