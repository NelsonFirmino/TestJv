import { useQuery } from "react-query";
import { autoCompleteAssuntos } from "../api/services/assuntos/assuntos";

export const useAutoCompleteAssuntos = (txAssunto: string) => {
  const { data: assuntosList, isLoading: isLoadingAutocompleteAssuntos } =
    useQuery(["assuntoAuto"], () => autoCompleteAssuntos(txAssunto));

    const autocompleteAssuntos = assuntosList?.data.map((at) => ({
      label: at.txAssunto,
      value: at.id,
    }));
  
  return { autocompleteAssuntos, isLoadingAutocompleteAssuntos };
};
