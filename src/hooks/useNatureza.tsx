import { useQuery } from "react-query";
import { getNatureza } from "../api/services/rpv/natureza";

export const useNatureza = () => {
  const { data, isLoading: isLoadingNatureza } = useQuery(
    [`natureza`],
    () => getNatureza(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const natureza = data?.data.map((at) => ({
    label: at.txNatureza,
    value: at.id,
  }));

  return { natureza, isLoadingNatureza };
};
