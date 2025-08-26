import { useQuery } from "react-query";
import { GetSecretariesResponse } from "../api/services/secretaries/secretaries.interface";
import { getMaterias } from "../api/services/materias/materias";
import { GetMateriasResponse } from "../api/services/materias/materias.interface";

export const useMaterias = () => {
  const { data: materias, isLoading: isLoadingMateriasList } =
    useQuery<GetMateriasResponse>("materiasList", getMaterias, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  const materiasList = materias?.data.map((at) => ({
    label: at.txMateria,
    value: at.id,
  }));

  return { materiasList, isLoadingMateriasList };
};

export const useMateria = () => {
  const { data: materias, isLoading: isLoadingMaterias } = useQuery(
    [`materias`],
    () => getMaterias(),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { materias, isLoadingMaterias };
};
