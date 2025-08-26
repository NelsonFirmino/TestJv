import { useQuery } from "react-query";
import { getNaturezaDespesas } from "../api/services/rpvNaturezaDespesas/rpvNaturezaDespesas";

export const useRpvNaturezaDespesas = () => {
  const { data: naturezaDespesas, isLoading: isLoadingNaturezaDespesas } =
    useQuery([`naturezaDespesas`], () => getNaturezaDespesas({}), {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  return { naturezaDespesas, isLoadingNaturezaDespesas };
};

export const useRpvNaturezaDespesasSelect = () => {
  const { data: naturezaDespesas, isLoading: isLoadingNaturezaList } = useQuery(
    [`naturezaDespesas`],
    () => getNaturezaDespesas({}),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const naturezaList = naturezaDespesas?.data.map((at) => ({
    label: at.txNatureza,
    value: at.id,
  }));

  return { naturezaList, isLoadingNaturezaList };
};
