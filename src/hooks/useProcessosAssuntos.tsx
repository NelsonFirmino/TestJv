import { useQuery } from "react-query";
import { getProcessoAssuntos } from "../api/services/assuntos/assuntos";

export const useProcessosAssuntos = (id: string) => {
  const { data, isLoading: loadingProcessosAssuntosList } = useQuery(
    [`processosAssuntosList-${id}`, id],
    () => getProcessoAssuntos(id),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  var processosAssuntosList = data?.data.map((ad: any) => ad.idAssunto);

  return { processosAssuntosList, loadingProcessosAssuntosList };
};
