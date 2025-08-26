import axiosInstance from "../../axiosInstance";
import {
  AutocompleteAssuntosParams,
  GetAutocompleteAssuntosResponse,
} from "./autocompleteAssuntos.interface";

export const autocompleteAssuntos = async ({
  txAssunto,
}: AutocompleteAssuntosParams): Promise<GetAutocompleteAssuntosResponse> => {
  const assuntos = await axiosInstance.get("/api/v1.0/Assuntos/autocomplete", {
    params: { txAssunto },
  });

  return assuntos.data;
};
