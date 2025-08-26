import axiosInstance from "../../axiosInstance";
import {
  AudiencesParams,
  GetAudienceByAttorneyIdParams,
  GetActAudienceByIdResponse,
  GetAudiencesResponse,
  PostAudienceParams,
  GetAudienceByAttorneyIdResponse,
} from "./audiences.interface";

export const getAudiences = async (): Promise<GetAudiencesResponse> => {
  const audiences = await axiosInstance.get(
    "/api/v1.0/tipos-audiencia?page=1&pageSize=50"
  );

  return audiences.data;
};

export const getAudienceByAttorneyId = async ({ id, dtInicio, dtFim }: GetAudienceByAttorneyIdParams):
  Promise<GetAudienceByAttorneyIdResponse> => {
  const { data } = await axiosInstance.get(
    `/api/v1.0/procuradores/${id}/audiencias`, {
      params: {
        dtInicio,
        dtFim
      }
    }
  );

  return data;
};

export const getActAudienceById = async (
  actId: string
): Promise<GetActAudienceByIdResponse> => {
  const actAudience = await axiosInstance.get(
    `/api/v1.0/Atos/${actId}/audiencia`
  );

  return actAudience.data;
};

export const postAudience = async ({
  idAto,
  idTipoAudiencia,
  isVirtual = false,
  txlink = "",
  dtAudiencia,
  hrAudiencia,
  idUsuarioCadastro
}: PostAudienceParams): Promise<GetAudiencesResponse> => {
  const { data } = await axiosInstance.post<GetAudiencesResponse>("/api/v1.0/Audiencias", {
    idAto,
    idTipoAudiencia,
    isVirtual,
    txlink,
    dtAudiencia,
    hrAudiencia,
    idUsuarioCadastro
  });

  return data;
};

export const postAudiences = async ({
  idAto,
  idTipoAudiencia,
  isVirtual = false,
  txlink = "",
  dtAudiencia,
  hrAudiencia,
  idUsuarioCadastro,
}: AudiencesParams): Promise<GetAudiencesResponse> => {
  const response = await axiosInstance
    .post("/api/v1.0/Audiencias", {
      idAto,
      idTipoAudiencia,
      isVirtual,
      txlink,
      dtAudiencia,
      hrAudiencia,
      idUsuarioCadastro,
    })
    .then((response) => {
      return response.data;
    });

  return response;
};

export const putAudiences = async ({
  idAto,
  idTipoAudiencia,
  isVirtual = false,
  txlink = "",
  dtAudiencia,
  hrAudiencia,
  isPreposto = false,
  idUsuarioCadastro,
}: AudiencesParams): Promise<GetAudiencesResponse> => {
  const response = await axiosInstance
    .put(`/api/v1.0/Audiencias/${idAto}`, {
      idAto,
      idTipoAudiencia,
      isVirtual,
      txlink,
      dtAudiencia,
      hrAudiencia,
      isPreposto,
      idUsuarioCadastro,
    })
    .then((response) => {
      return response.data;
    });

  return response;
};

export const deleteAudiences = async ({
  idAto,
}: AudiencesParams): Promise<GetAudiencesResponse> => {
  const response = await axiosInstance
    .delete(`/api/v1.0/Audiencias/${idAto}`)
    .then((response) => {
      return response.data;
    });

  return response;
};

export const deleteAudience = async (audience_id: number): Promise<void> => {
  const response = await axiosInstance.delete(
    `/api/v1.0/Audiencias/${audience_id}`
  );

  return response.data;
};
