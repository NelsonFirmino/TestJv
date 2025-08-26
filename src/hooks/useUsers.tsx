import { useQuery } from "react-query";
import { getUsers } from "../api/services/users/users";

export const useUsers = (perfil_id: number) => {
    const { data, isLoading: isLoadingUsers } = useQuery([`usuarios-${perfil_id}`],() => getUsers(perfil_id),
      {
        staleTime: 1000 * 60 * 60 * 24, // 1 dia
      }
    );
  
    return { data, isLoadingUsers };
  };