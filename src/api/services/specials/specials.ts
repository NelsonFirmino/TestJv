import axiosInstance from "../../axiosInstance";
import {
  GetSpecialAttoneyResponse,
  GetSpecialsResponse,
  PutPostParams,
  PutPostSpecialAttorneyParams,
} from "./specials.interface";

export const getSpecials = async (): Promise<GetSpecialsResponse> => {
  const specialsList = await axiosInstance.get(
    "/api/v1.0/Especializada/Ordernada",
    {
      params: { isBloqueado: false },
    }
  );

  return specialsList.data;
};

export const getAllSpecials = async (): Promise<GetSpecialsResponse> => {
  const specialsList = await axiosInstance.get(
    "/api/v1.0/Especializada/Ordernada"
  );

  return specialsList.data;
};

export const postEspecializada = async ({
  id,
  txEspecializada,
  isRpv,
  idSecretaria,
  idSetorPai,
  isBloqueado,
}: PutPostParams): Promise<GetSpecialsResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/Especializada`, {
    id,
    txEspecializada,
    isRpv,
    idSecretaria,
    idSetorPai,
    isBloqueado,
  });

  return response.data;
};

export const getEspecializada = async (): Promise<GetSpecialsResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/Especializada`);

  return response.data;
};

export const getEspecializadaByParams = async ({
  idSecretaria,
  idSetorPai,
  isBloqueado,
}: PutPostParams): Promise<GetSpecialsResponse> => {
  const response = await axiosInstance.get(
    `/api/v1.0/Especializada/Ordernada`,
    {
      params: { idSecretaria, idSetorPai, isBloqueado },
    }
  );

  return response.data;
};

export const getEspecializadaByID = async (
  id: number
): Promise<GetSpecialsResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/Especializada/${id}`);

  return response.data;
};

export const putEspecializadaByID = async ({
  id,
  txEspecializada,
  isRpv,
  idSecretaria,
  idSetorPai,
  isBloqueado,
}: PutPostParams): Promise<GetSpecialsResponse> => {
  const response = await axiosInstance.put(`/api/v1.0/Especializada/${id}`, {
    txEspecializada,
    isRpv,
    idSecretaria,
    idSetorPai,
    isBloqueado,
  });

  return response.data;
};

export const deleteEspecializadaByID = async (
  id: number
): Promise<GetSpecialsResponse> => {
  const response = await axiosInstance.delete(`/api/v1.0/Especializada/${id}`);

  return response.data;
};

export const getProcuradoresByEspecializada = async (
  id: number
): Promise<GetSpecialAttoneyResponse> => {
  const response = await axiosInstance.get(
    `/api/v1.0/Especializada/${id}/procuradores2`
  );

  return response.data;
};

export const postEspecializadaByIDAndProcurador = async ({
  idEspecializada,
  idProcurador,
  idUsuarioCadastro,
  isChefe,
  isDistribuicaoAutomatica,
  nuPercentualDistribuicao,
}: PutPostSpecialAttorneyParams): Promise<GetSpecialAttoneyResponse> => {
  const response = await axiosInstance.post(
    `/api/v1.0/Especializada/${idEspecializada}/procuradores/${idProcurador}`,
    {
      idUsuarioCadastro,
      isChefe,
      isDistribuicaoAutomatica,
      nuPercentualDistribuicao,
    }
  );

  return response.data;
};

export const deleteEspecializadaByIDAndProcurador = async (
  idEspecializada: number,
  idProcurador: number
): Promise<GetSpecialAttoneyResponse> => {
  const response = await axiosInstance.delete(
    `/api/v1.0/Especializada/${idEspecializada}/procuradores/${idProcurador}`
  );

  return response.data;
};
