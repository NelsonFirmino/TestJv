import { useQuery } from "react-query";
import { GetProceduralFormClosed } from "../api/services/process/process";

export const useFichasProcessuaisEncerradas = (pagination, user, getValues) => {
  return useQuery(
    ["fichas-processuais-encerradas", pagination, user],
    () =>
      GetProceduralFormClosed({
        dtFim: getValues("dtFim") || null,
        dtIni: getValues("dtIni") || null,
        page: pagination.page,
        pageSize: pagination.pageSize,
        idPerfil: user["jvris.User.Perfil"],
        idUsuarioCadastro: user["Jvris.User.Id"],
        isChefe: user["Jvris.User.isChefe"],
      }),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};
