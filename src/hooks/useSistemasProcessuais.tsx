import { useQuery } from "react-query";
import { getSistemasProcessuais } from "../api/services/sistemasProcessuais/sistemasProcessuais";

export const useSistemasProcessuais = () => {
  const { data: sistemasProcessuais, isLoading: isLoadingSistemasProcessuais } =
    useQuery([`sistemasProcessuais`], () => getSistemasProcessuais(), {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  return { sistemasProcessuais, isLoadingSistemasProcessuais };
};
