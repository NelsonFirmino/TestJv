import axiosInstance from "../../axiosInstance";
import {
  GetActObservationsResponse,
  PostActObservationParams,
  PostActObservationResponse,
} from "./act-observations.interface";

export const getActObservations = async (
  idAto?: string
): Promise<GetActObservationsResponse> => {
  const actObservations = await axiosInstance.get(
    `/api/v1.0/Atos/${idAto}/observacoes`
  );

  return actObservations.data;
};

export const getActObservationsV2 = async (idAto: string): Promise<GetActObservationsResponse> => {
  const { data } = await axiosInstance.get(`/api/v1.0/Atos/${idAto}/observacoes`);

  if (!Boolean(data.status === "OK")) {
        throw new Error(data.message);
  }

  return data;
};

export const postActObservation = async ({
  idAto,
  txObservacao,
  idUsuarioCadastro,
}: PostActObservationParams): Promise<any> => {
  const actObservation = await axiosInstance.post(
    `/api/v1.0/atos-observacoes`,
    {
      idAto,
      txObservacao,
      idUsuarioCadastro,
    }
  );

  return actObservation.data;
};


export const PostActObservationV2 = async ({
  idAto,
  txObservacao,
  idUsuarioCadastro,
}: PostActObservationParams): Promise<PostActObservationResponse> => {
  const { data } = await axiosInstance.post<PostActObservationResponse>(
    `/api/v1.0/atos-observacoes`,
    {
      idAto,
      txObservacao,
      idUsuarioCadastro,
    }
  );

  if (!Boolean(data.status === "Created")) {
        throw new Error(data.message);
  }

  return data;
};