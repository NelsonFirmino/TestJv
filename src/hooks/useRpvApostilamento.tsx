import { useQuery } from "react-query";
import {
  getApostilamento,
  getApostilamentoByID,
} from "../api/services/rpvApostilamento/rpvApostilamento";
import { GetParams } from "../api/services/rpvApostilamento/rpvapostilamento.interface";

export const useRpvApostilamento = ({ id }: GetParams) => {
  const { data: apostilamentos, isLoading: isLoadingApostilamentos } = useQuery(
    [`apostilamentos`],
    () => getApostilamentoByID({ id }),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { apostilamentos, isLoadingApostilamentos };
};
