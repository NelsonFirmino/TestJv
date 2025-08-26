import { useQuery } from "react-query";
import { GetSpecialsResponse } from "../api/services/specials/specials.interface";
import { getAllSpecials, getSpecials } from "../api/services/specials/specials";

export const useSpecials = () => {
  const { data, isLoading: loadingSpecialsList } =
    useQuery<GetSpecialsResponse>("specialsList", getSpecials, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  const specialsList = data?.data.map((at) => ({
    label:
      repeatStringNumTimes("→", at.nuNivel) +
      (at.nuNivel == 0 ? "" : " ") +
      at.txEspecializada,
    value: at.id,
  }));

  return { specialsList, loadingSpecialsList };
};

export const useAllSpecials = () => {
  const { data, isLoading: loadingSpecialsList } =
    useQuery<GetSpecialsResponse>("allSpecialsList", getAllSpecials, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  const specialsList = data?.data.map((at) => ({
    label:
      repeatStringNumTimes("→", at.nuNivel) +
      (at.nuNivel == 0 ? "" : " ") +
      at.txEspecializada +
      (at.isBloqueado ? " (BLOQUEADO)" : ""),
    value: at.id,
    txEspecializada: at.txEspecializada,
    isRpv: at.isRpv,
    idSetorPai: at.idSetorPai,
    idSecretaria: at.idSecretaria,
    isBloqueado: at.isBloqueado,
    totalSetor: at.totalSetor,
  }));

  return { specialsList, loadingSpecialsList };
};

function repeatStringNumTimes(str: string, times: number) {
  var repeatedString = "";
  while (times > 0) {
    repeatedString += str;
    times--;
  }
  return repeatedString;
}
