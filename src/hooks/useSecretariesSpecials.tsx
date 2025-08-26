import { useQuery } from "react-query";
import { getSecretariesSpecials } from "../api/services/secretariesSpecials/secretariesSpecial";
import { GetSecretariesResponse } from "../api/services/secretariesSpecials/secretariesSpecial.interface";

export const useSecretariesSpecials = (idSecretaria?: string) => {
  const {
    data: secretariesSpecialList,
    isLoading: isloadingSecretariesSpecialList,
  } = useQuery(
    [`secretariesSpecialList-${idSecretaria}`, idSecretaria],
    () => getSecretariesSpecials({idSecretaria}),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const newFormatedSpecialsList = secretariesSpecialList?.data?.map((at) => ({
    label:
      repeatStringNumTimes("→", at.nuNivel) +
      (at.nuNivel == 0 ? "" : " ") +
      at.txEspecializada,
    value: at.id,
  }));

  function repeatStringNumTimes(str: string, times: number) {
    var repeatedString = "";
    while (times > 0) {
      repeatedString += str;
      times--;
    }
    return repeatedString;
  }

  return { newFormatedSpecialsList, isloadingSecretariesSpecialList };
};
