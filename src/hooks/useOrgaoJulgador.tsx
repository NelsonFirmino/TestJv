import { useQuery } from "react-query";
import { getOrgaosJulgadores } from "../api/services/OrgaosJulgadores/orgaojulgador";

export const useOrgaoJulgador = () => {
  const { data: orgaosJulgadores, isLoading: isLoadingOrgaosJulgadores } =
    useQuery([`orgaosJulgadores`], () => getOrgaosJulgadores({}), {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  return { orgaosJulgadores, isLoadingOrgaosJulgadores };
};
