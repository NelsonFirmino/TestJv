import { useQuery } from "react-query";
import { GetSpecialsResponse } from "../api/services/specials/specials.interface";
import { getAllSpecials } from "../api/services/specialsAll/specialsAll";

export const useSpecialsAll = () => {
  const { data, isLoading: loadingSpecialsList } =
    useQuery<GetSpecialsResponse>("specialsAllList", getAllSpecials, {
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

function repeatStringNumTimes(str: string, times: number) {
  var repeatedString = "";
  while (times > 0) {
    repeatedString += str;
    times--;
  }
  return repeatedString;
}
