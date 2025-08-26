import { useQuery } from "react-query";
import {
  getNivelSigiloCinco,
  getNivelSigiloDois,
  getNivelSigiloQuatro,
  getNivelSigiloTres,
  getNivelSigiloUm,
  getNivelSigiloZero,
} from "../api/services/niveisSigilo/nivelSigilo";

export const useNivelSigiloZero = (idUsuario?: number) => {
  const { data, isLoading: isLoadingNivelZero } = useQuery(
    [`nivelZero-${idUsuario}`, idUsuario],
    () => getNivelSigiloZero(idUsuario),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const nivelZero = data?.data.map((at) => ({
    label: at.txUsuario,
    value: at.id,
  }));

  return { nivelZero, isLoadingNivelZero };
};

export const useNivelSigiloUm = (idUsuario?: number) => {
  const { data, isLoading: isLoadingNivelUm } = useQuery(
    [`nivelUm-${idUsuario}`, idUsuario],
    () => getNivelSigiloUm(idUsuario),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const nivelUm = data?.data.map((at) => ({
    label: at.txUsuario,
    value: at.id,
  }));

  return { nivelUm, isLoadingNivelUm };
};

export const useNivelSigiloDois = (idUsuario?: number) => {
  const { data, isLoading: isLoadingNivelDois } = useQuery(
    [`nivelDois-${idUsuario}`, idUsuario],
    () => getNivelSigiloDois(idUsuario),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const nivelDois = data?.data.map((at) => ({
    label: at.txUsuario,
    value: at.id,
  }));

  return { nivelDois, isLoadingNivelDois };
};

export const useNivelSigiloTres = (idUsuario?: number) => {
  const { data, isLoading: isLoadingNivelTres } = useQuery(
    [`nivelTres-${idUsuario}`, idUsuario],
    () => getNivelSigiloTres(idUsuario),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const nivelTres = data?.data.map((at) => ({
    label: at.txUsuario,
    value: at.id,
  }));

  return { nivelTres, isLoadingNivelTres };
};

export const useNivelSigiloQuatro = (idUsuario?: number) => {
  const { data, isLoading: isLoadingNivelQuatro } = useQuery(
    [`nivelQuatro-${idUsuario}`, idUsuario],
    () => getNivelSigiloQuatro(idUsuario),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const nivelQuatro = data?.data.map((at) => ({
    label: at.txUsuario,
    value: at.id,
  }));

  return { nivelQuatro, isLoadingNivelQuatro };
};

export const useNivelSigiloCinco = (idUsuario?: number) => {
  const { data, isLoading: isLoadingNivelCinco } = useQuery(
    [`nivelCinco-${idUsuario}`, idUsuario],
    () => getNivelSigiloCinco(idUsuario),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const nivelCinco = data?.data.map((at) => ({
    label: at.txUsuario,
    value: at.id,
  }));

  return { nivelCinco, isLoadingNivelCinco };
};
