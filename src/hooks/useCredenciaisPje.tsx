import { useQuery } from "react-query";
import { getCredenciaisPje } from "../api/services/credenciais-pje/credenciaisPje-Service";
import jwt_decode from "jwt-decode";

//* =============== [PAGINACAO]
export const useCredenciaisPje = () => {
  const token = localStorage.getItem("token");
  const decodedToken: any = jwt_decode(token!);

  const { data, isLoading } = useQuery(
    ["credenciaisPje"],
    () => getCredenciaisPje(decodedToken["Jvris.User.Id"]),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const credenciaisPje = Array.isArray(data?.data) ? data : { data: [] };

  return { credenciaisPje, isLoadingCredenciaisPje: isLoading };
};
