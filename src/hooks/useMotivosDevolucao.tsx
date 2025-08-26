import { useQuery } from "react-query";
import { getMotivoDevolucao } from "../api/services/motivosDevolucao/motivosDevolucao";

export const useMotivosDevolucao = () => {
  const { data: motivosDevolucaoAll, isLoading: isLoadingMotivosDevolucao } =
    useQuery([`motivosDevolucao`], () => getMotivoDevolucao(), {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  return { motivosDevolucaoAll, isLoadingMotivosDevolucao };
};

export const useMotivosDevolucaoSelect = () => {
  const { data, isLoading: isLoadingMotivosDevolucao } = useQuery(
    [`motivosDevolucaoSelect`],
    () => getMotivoDevolucao(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const motivosDevolucao = data?.data.map((at) => ({
    label: at.txMotivo,
    value: at.id,
  }));

  return { motivosDevolucao, isLoadingMotivosDevolucao };
};
