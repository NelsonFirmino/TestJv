import { useQuery } from "react-query";
import { selectLayout } from "../api/services/selectLayout/selectLayout";

export const useSelectLayout = (perfilId: number, idAssessor: number) => {
  const { data, isLoading: isLoadingUsersList } = useQuery(
    [`select-layout-${perfilId}-${idAssessor}`, perfilId, idAssessor],
    () => selectLayout(perfilId, idAssessor),
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    }
  );

  const usersList = data?.data?.map((user) => ({
    label: user.txProcurador,
    value: user.id,
    id: user.id,
  }));

  usersList?.sort((a, b) => a.label.trim().localeCompare(b.label.trim()));

  return { usersList, isLoadingUsersList };
};
