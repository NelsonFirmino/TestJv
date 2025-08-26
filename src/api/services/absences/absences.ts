import axiosInstance from "../../axiosInstance";
import {
  GetAbsenceResponse,
  GetAbsencesAttorneyProps,
  GetAbsencesAttorneyResponse,
  GetAttachmentAbsenceResponse,
  GetObservationsAbsenceResponse,
  GetTypeOfAbsencesResponse,
  PostAbsenceAdaptParams,
  PostAbsenceAttachmentsParams,
  PostAbsenceObservationParams,
  PostAbsenceParams,
  PostAbsenceResponse,
  PutAbsenceParams,
} from "./absences.interface";

export const listAbsencesAttorney =
  async (): Promise<GetAbsencesAttorneyResponse> => {
    const absences = await axiosInstance.get(
      `/api/v1.0/Ausencias/procurador/0`
    );

    return absences.data;
  };

export const listTypesOfAbsences =
  async (): Promise<GetTypeOfAbsencesResponse> => {
    const typesAbsences = await axiosInstance.get<GetTypeOfAbsencesResponse>(
      "/api/v1.0/tipos-ausencias",
      {
        params: {
          page: 1,
          pageSize: 100,
        },
      }
    );

    return typesAbsences.data;
  };

export const getAbsence = async (
  absence_id: string
): Promise<GetAbsenceResponse> => {
  try {
    const absence = await axiosInstance.get<GetAbsenceResponse>(
      `/api/v1.0/Ausencias/${absence_id}`
    );
    return absence.data;
  } catch (error) {
    throw error;
  }
};

export const getAttachmentAbsence = async (
  absence_id: string
): Promise<GetAttachmentAbsenceResponse> => {
  try {
    const absence = await axiosInstance.get<GetAttachmentAbsenceResponse>(
      `/api/v1.0/Ausencias/${absence_id}/anexos`
    );
    return absence.data;
  } catch (error) {
    throw error;
  }
};

export const getObservationAbsence = async (
  absence_id: string
): Promise<GetObservationsAbsenceResponse> => {
  try {
    const absence = await axiosInstance.get<GetObservationsAbsenceResponse>(
      `/api/v1.0/Ausencias/${absence_id}/observacoes`
    );
    return absence.data;
  } catch (error) {
    throw error;
  }
};

export const postAbsenceAdapt = async ({
  idProcurador,
  idTipoAusencia,
  dtInicio,
  dtDefeso,
  dtFim,
  file_stream,
  txObservacao,
  txTipoArquivo,
  file_name,
  idUsuarioCadastro,
}: PostAbsenceAdaptParams) => {
  await postAbsence({
    dtDefeso,
    dtFim,
    dtInicio,
    idProcurador,
    idTipoAusencia,
    idUsuarioCadastro,
  }).then(async (data) => {
    await postAbsenceAttachment({
      file_stream,
      file_name,
      idAusencia: data.data.id,
      idUsuarioCadastro,
      txTipoArquivo,
    });
    await postAbsenceObservation({
      idAusencia: data.data.id,
      idUsuarioCadastro,
      txObservacao,
    });
  });
  try {
  } catch (err) {
    return err;
  }
};

export const postAbsence = async ({
  idProcurador,
  idTipoAusencia,
  dtInicio,
  dtDefeso,
  dtFim,
  idUsuarioCadastro,
}: PostAbsenceParams): Promise<PostAbsenceResponse> => {
  const absence = await axiosInstance.post("/api/v1.0/Ausencias", {
    idUsuarioCadastro,
    idProcurador,
    idTipoAusencia,
    dtInicio,
    dtDefeso,
    dtFim,
  });

  return absence.data;
};

export const putAbsence = async ({
  id,
  idProcurador,
  idTipoAusencia,
  dtInicio,
  dtDefeso,
  dtFim,
  idUsuarioCadastro,
}: PutAbsenceParams): Promise<PutAbsenceParams> => {
  try {
    const absence = await axiosInstance.put(`/api/v1.0/Ausencias/${id}`, {
      idUsuarioCadastro,
      idProcurador,
      idTipoAusencia,
      dtInicio,
      dtDefeso,
      dtFim,
    });

    return absence.data;
  } catch (error) {
    throw error;
  }
};

export const postAbsenceAttachment = async ({
  idAusencia,
  idUsuarioCadastro,
  file_stream,
  txTipoArquivo,
  file_name,
}: PostAbsenceAttachmentsParams) => {
  await axiosInstance.post("/api/v1.0/ausencias-anexos", {
    idAusencia,
    idUsuarioCadastro,
    file_stream,
    file_name,
    txTipoArquivo,
    txDescricao: file_name,
  });
};

export const postAbsenceObservation = async ({
  idAusencia,
  idUsuarioCadastro,
  txObservacao,
}: PostAbsenceObservationParams) => {
  await axiosInstance.post("/api/v1.0/ausencia-observacoes", {
    idAusencia,
    idUsuarioCadastro,
    txObservacao,
  });
};

export const getAbsencesAttorney = async ({
  idEspecializada,
  dtInicio,
  dtFim,
  usuarioSelecionado,
}: GetAbsencesAttorneyProps): Promise<GetAbsencesAttorneyResponse> => {
  const absences = await axiosInstance.get(
    `/api/v1.0/Ausencias/procurador/${
      usuarioSelecionado ? usuarioSelecionado : "0"
    }`,
    {
      params: {
        idEspecializada,
        dtInicio,
        dtFim,
      },
    }
  );

  return absences.data;
};

export const deleteAbsencesAttorney = async (
  id: number
): Promise<GetAbsencesAttorneyResponse> => {
  const absences = await axiosInstance.delete(`/api/v1.0/Ausencias/${id}`);

  return absences.data;
};

export const deleteAbsenceAttachment = async (
  id: number
): Promise<GetAbsencesAttorneyResponse> => {
  try {
    const absences = await axiosInstance.delete(
      `/api/v1.0/ausencias-anexos/${id}`
    );

    return absences.data;
  } catch (error) {
    throw error;
  }
};
