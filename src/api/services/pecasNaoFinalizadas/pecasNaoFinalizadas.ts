import axiosInstance from "../../axiosInstance";
import {
  PecasNaoFinalizadasParams,
  PecasNaoFinalizadasResponse,
} from "./pecasNaoFinalizadas.interface";

export const getPecasNaoFinalizadasByAttorneyId = async ({
  id,
}): Promise<PecasNaoFinalizadasResponse> => {
  const { data } = await axiosInstance.get(
    `/api/v1.0/Pecas/${id}/nao-finalizado`
  );

  return data;
};
