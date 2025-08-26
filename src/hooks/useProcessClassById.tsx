import { useQuery } from "react-query";
import { getProcessClassById } from "../api/services/processClass/processClass";

export const useProcessClassById = (classId: number) => {
  const { data: processClass, isLoading: isLoadingProcessClass } = useQuery(
    [`processClass-${classId}`, classId],
    () => getProcessClassById(classId),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  return { processClass, isLoadingProcessClass };
};
