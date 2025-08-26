import axiosInstance from "../../axiosInstance";
import {
  AutocompleteParams,
  AutocompleteResponse,
} from "./autocompleteSpecials.interface";

export const autocompleteSpecials = async ({
  page = 1,
  pageSize = 20,
  txNumero,
}: AutocompleteParams): Promise<AutocompleteResponse> => {
  const specialsList = await axiosInstance.get(
    "/api/v1.0/processos/autocomplete",
    {
      params: {
        page,
        pageSize,
        txNumero,
      },
    }
  );

  return specialsList.data;
};
