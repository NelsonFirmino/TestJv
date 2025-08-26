import axiosInstance from "../../../axiosInstance";
import {
  AttorneysAdvisorsParams,
  GetAttorneysAdvisorsResponse,
} from "./attorneys-advisors.interface";

export const getAttorneysAdvisors = async ({
  idProcurador = "",
}: AttorneysAdvisorsParams): Promise<GetAttorneysAdvisorsResponse> => {
  const attorneysAdvisors = await axiosInstance.get(
    `/api/v1.0/Procuradores/${idProcurador}/assessores`,
    {
      params: {
        idProcurador,
      },
    }
  );

  return attorneysAdvisors.data;
};
