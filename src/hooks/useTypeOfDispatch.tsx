import { useQuery } from "react-query";
import { GetDispatchListResponse } from "../api/services/dispatch/typeOfDispatch/attorneys.interface";
import { getDispatchList } from "../api/services/dispatch/typeOfDispatch/attorneys";

export const useTypeOfDispatch = () => {
  const { data, isLoading: loadingTypeOfDispatchList } =
    useQuery<GetDispatchListResponse>("accountantsList", getDispatchList, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });

  const dispatchList = data?.data.map((at) => ({
    label: at.txTipoDespacho,
    value: at.id,
  }));

  return { dispatchList, loadingTypeOfDispatchList };
};
