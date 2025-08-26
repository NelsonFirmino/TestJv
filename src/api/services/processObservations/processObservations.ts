import axiosInstance from "../../axiosInstance";
import {
  DeleteProcessObservationsResponse,
  GetProcessObservationsResponse,
  PostProcessObservationParams,
  PostProcessObservationsResponse,
} from "./processObservations.interface";

export const getProcessObservations = async (
  processId?: string
): Promise<GetProcessObservationsResponse> => {
  const processObservations = await axiosInstance.get(
    `/api/v1.0/Processos/${processId}/observacoes`
  );

  return processObservations.data;
};

export const postProcessObservations = async ({
  idProcesso,
  txObservacao,
  idUsuarioCadastro,
}: PostProcessObservationParams): Promise<PostProcessObservationsResponse> => {
  const processObservation = await axiosInstance.post(
    "/api/v1.0/processos-observacoes",
    {
      idProcesso,
      txObservacao,
      idUsuarioCadastro,
    }
  );

  return processObservation.data;
};

export const deleteProcessObservations = async (
  idProcesso: string
): Promise<DeleteProcessObservationsResponse> => {
  const processObservation = await axiosInstance.delete(
    `/api/v1.0/processos-observacoes/${idProcesso}`
  );

  return processObservation.data;
};
