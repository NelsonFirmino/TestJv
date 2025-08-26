import { useQuery } from "react-query";
import { autoCompleteParts } from "../api/services/processParts/processParts";
import { AutoCompletePartsParams } from "../api/services/processParts/processParts.interface";

export const useAutoCompleteParts = (params: AutoCompletePartsParams) => {
  const { data: autocompleteParts, isLoading: isLoadingAutocompleteParts } =
    useQuery([params], () => autoCompleteParts(params));

  return { autocompleteParts, isLoadingAutocompleteParts };
};
