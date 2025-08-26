import { useQuery } from "react-query";
import { GetAccountantsResponse } from "../api/services/accountants/accountants.interface";
import { getAccountants } from "../api/services/accountants/accountants";

export const useAccountants = () => {
  const { data, isLoading: loadingAccountantsList } =
    useQuery<GetAccountantsResponse>("accountantsList", getAccountants, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  const accountantsList = data?.data.map((at) => ({
    label: at.txContador,
    value: at.id,
  }));

  return { accountantsList, loadingAccountantsList };
};
