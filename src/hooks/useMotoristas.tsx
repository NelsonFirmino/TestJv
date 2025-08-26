import { useQuery } from "react-query";
import { getMotoristas } from "../api/services/motoristas/motoristas";

export const useMotoristas = () => {
  const { data: motoristas, isLoading: isLoadingMotoristas } = useQuery(
    [`motoristas`],
    () => getMotoristas(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { motoristas, isLoadingMotoristas };
};
