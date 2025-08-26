import { useQuery } from "react-query";
import { autocompleteSpecials } from "../api/services/autocompleteSpecials/autocompleteSpecials";
import { AutocompleteParams } from "../api/services/autocompleteSpecials/autocompleteSpecials.interface";

export const useAutocompleteSpecials = (params: AutocompleteParams) => {
  const { data, isLoading: isLoadingProcess } = useQuery([params], () =>
    autocompleteSpecials(params)
  );

  const autocompleteList = data?.data
    ? data.data.map((atc) => ({
        label: atc.txNumeroFormatado,
        value: atc.id,
      }))
    : [];

  return { autocompleteList, isLoadingProcess };
};
