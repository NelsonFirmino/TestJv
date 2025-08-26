import { useQuery } from "react-query";
import { getTribunaisPje } from "../api/services/credenciais-pje/credenciaisPje-Service";
import { TribunaisPjeResponse } from "../api/services/credenciais-pje/credenciaisPje-Service.interface";

export const useTribunaisPje = () => {
  const { data: tribunaisPje, isLoading: isLoadingTribunaisPje } =
    useQuery<TribunaisPjeResponse>("listTribunaisPje", getTribunaisPje, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  return { tribunaisPje, isLoadingTribunaisPje };
};
