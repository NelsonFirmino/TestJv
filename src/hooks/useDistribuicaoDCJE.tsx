import { useQuery } from "react-query";
import {
  getDistribuicaoDCJEDistribuidos,
  getDistribuicaoDCJENaoDistribuidos,
} from "../api/services/distribuicaoDCJE/distribuicaoDCJE";

import { GetParams } from "../api/services/distribuicaoDCJE/distribuicaodcje.interface";

export const useDistribuicaoDCJEDistribuidos = ({
  idContador,
  dtInicio,
  dtFim,
  idProcesso,
  idProcurador,
}: GetParams) => {
  const {
    data: distribuicoesDistribuidas,
    isLoading: isLoadingDistribuicoesDistribuidas,
  } = useQuery(
    [`distribuicaoDCJEDistribuidos`],
    () =>
      getDistribuicaoDCJEDistribuidos({
        idContador,
        dtInicio,
        dtFim,
        idProcesso,
        idProcurador,
      }),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { distribuicoesDistribuidas, isLoadingDistribuicoesDistribuidas };
};

export const useDistribuicaoDCJENaoDistribuidos = ({
  dtInicio,
  dtFim,
  idProcurador,
  idProcesso,
}: GetParams) => {
  const {
    data: distribuicoesNaoDistribuidas,
    isLoading: isLoadingDistribuicoesNaoDistribuidas,
  } = useQuery(
    [`distribuicaoDCJENaoDistribuidos`],
    () =>
      getDistribuicaoDCJENaoDistribuidos({
        dtInicio,
        dtFim,
        idProcurador,
        idProcesso,
      }),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return {
    distribuicoesNaoDistribuidas,
    isLoadingDistribuicoesNaoDistribuidas,
  };
};
