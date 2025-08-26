import axiosInstance from "../../axiosInstance";
import {
  ActAttachmentParams,
  AtosConclusoesEnvOrgOrigem,
  Attachment,
  DeleteActResponse,
  DespachoAcatoChefiaResponse,
  GetActAttachmentResponse,
  GetActByIdResponse,
  GetActObservatiosResponse,
  GetActProcedureResponse,
  GetDispatchResponse,
  PostActAdaptParams,
  PostActObservationParams,
  PostActResponse,
  PutActParams,
  PutActRelevanceParams,
  PutActRelevanceResponse,
  PutActTimeParams,
  PutActTimeResponse,
} from "./acts.interface";

export const getActById = async (
  idAto: string
): Promise<GetActByIdResponse> => {
  try {
    const { data } = await axiosInstance.get(`/api/v1.0/Atos/${idAto}`);

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getActAttachmentsById = async (
  idAto: string
): Promise<GetActAttachmentResponse> => {
  const actAttachments = await axiosInstance.get(
    `/api/v1.0/Atos/${idAto}/anexos`
  );

  return actAttachments.data;
};

export const getActAttachmentsByIdNew = async (
  idAto: string
): Promise<Attachment> => {
  const { data } = await axiosInstance.get(`/api/v1.0/Atos/${idAto}/anexos`);

  return data;
};

export const deleteActAttachmentsById = async (
  id: string
): Promise<GetActAttachmentResponse> => {
  const deleteActAttachments = await axiosInstance.delete(
    `/api/v1.0/atos-anexos/${id}`
  );

  return deleteActAttachments.data;
};

export const deleteActObservationById = async (
  id: string
): Promise<GetActAttachmentResponse> => {
  const deleteActObservation = await axiosInstance.delete(
    `/api/v1.0/atos-observacoes/${id}`
  );

  return deleteActObservation.data;
};

export const postActAttachmentsById = async ({
  idAto,
  file_stream,
  name,
  idUsuarioCadastro,
}: ActAttachmentParams): Promise<any> => {
  const { data } = await axiosInstance.post(`/api/v1.0/atos-anexos`, {
    idAto,
    idUsuarioCadastro,
    file_stream,
    name,
    txDescricao: name,
  });

  return data;
};

export const getActObservationsById = async (
  idAto: string
): Promise<GetActObservatiosResponse> => {
  const actObservation = await axiosInstance.get(
    `/api/v1.0/Atos/${idAto}/observacoes`
  );

  return actObservation.data;
};

export const getActProcedureById = async (
  idAto: number
): Promise<GetActProcedureResponse> => {
  const actProcedures = await axiosInstance.get(
    `/api/v1.0/Atos/${idAto}/tramitacao`
  );

  return actProcedures.data;
};

export const postActAdapt = async ({
  dtCiencia,
  dtPrazo,
  idClasse,
  idOrgaoJulgador,
  idSecretaria,
  idSistemaProcessual,
  idTribunal,
  isUrgente,
  nuInstancia,
  txNumeroFormatado,
  file_name,
  file_stream,
  txObservacao,
  idUsuarioCadastro,
}: PostActAdaptParams): Promise<PostActResponse> => {
  try {
    const response = await axiosInstance.post("/api/v1.0/Atos", {
      dtCiencia,
      dtPrazo,
      idClasse,
      idOrgaoJulgador,
      idSecretaria,
      idSistemaProcessual,
      idTribunal,
      idUsuarioCadastro,
      isUrgente,
      nuInstancia,
      txNumeroFormatado,
    });

    const idAto = response.data.data.id;

    if (file_name && file_stream) {
      await postActAttachmentsById({
        idAto,
        file_stream,
        name: file_name,
        idUsuarioCadastro,
      });
    }
    if (txObservacao) {
      await postActObservation({
        idUsuarioCadastro,
        idAto,
        txObservacao,
      });
    }

    return response.data; // Retorna a resposta do axios post
  } catch (error) {
    // Trate os erros aqui
    console.error(error);
  }
};

export const postActObservation = async ({
  idAto,
  txObservacao,
  idUsuarioCadastro,
}: PostActObservationParams): Promise<void> => {
  const actObservation = await axiosInstance.post(
    "/api/v1.0/atos-observacoes",
    {
      idAto,
      txObservacao,
      idUsuarioCadastro,
    }
  );

  return actObservation.data;
};

export const putAct = async ({
  id,
  dtCiencia,
  dtPrazo,
  idClasse,
  idOrgaoJulgador,
  idSecretaria,
  isUrgente,
  nuCodigoAviso,
  dtCadastro,
  idProcesso,
  idSistemaProcessual,
  idTribunal,
  nuInstancia,
  txNumeroFormatado,
  idUsuarioCadastro,
}: PutActParams): Promise<GetActProcedureResponse> => {
  const act = await axiosInstance.put(`/api/v1.0/Atos/${id}`, {
    id,
    dtCiencia,
    dtPrazo,
    idClasse,
    idOrgaoJulgador,
    idSecretaria,
    isUrgente,
    nuCodigoAviso,
    dtCadastro,
    idProcesso,
    idSistemaProcessual,
    idTribunal,
    nuInstancia,
    txNumeroFormatado,
    idUsuarioCadastro,
  });

  return act.data;
};

// Requisições necessárias para deletar um ato concluído

export const getAtosConclusoesEnvOrgOrigem = async (
  id: number
): Promise<AtosConclusoesEnvOrgOrigem> => {
  const atoOrigem = await axiosInstance.get(
    `/api/v1.0/atos-conclusoes-envio-orgao-origem/${id}`
  );

  return atoOrigem.data;
};

export const getDespachoAto = async (
  id: number
): Promise<GetDispatchResponse> => {
  const { data } = await axiosInstance.get(`/api/v1.0/Despachos/${id}/ato`);

  return data;
};

export const getDespachoAcatoChefia = async (
  id: number
): Promise<DespachoAcatoChefiaResponse> => {
  const { data } = await axiosInstance.get(
    `/api/v1.0/Despachos/${id}/acato-chefia`
  );

  return data;
};

export const deleteAct = async (id: number): Promise<DeleteActResponse> => {
  const act = await axiosInstance.delete(`/api/v1.0/Atos/${id}/ato-concluido`);

  return act.data;
};

export const deleteAtoConcluidoDespacho = async (
  id: number
): Promise<DeleteActResponse> => {
  const response = await axiosInstance.delete(
    `/api/v1.0/Atos/${id}/ato-concluido-com-despacho`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(id.toString()), // Enviando o ID como JSON no body
    }
  );

  return response.data;
};

export const PutActTime = async ({
  idAto,
  dtPrazo,
}: PutActTimeParams): Promise<PutActTimeResponse> => {
  const { data } = await axiosInstance.put<PutActTimeResponse>(
    `/api/v1.0/atos/${idAto}/prazo`,
    {
      dtPrazo,
    }
  );

  if (!Boolean(data.status === "OK")) {
    throw new Error(data.message);
  }

  return data;
};

export const PutActRelevance = async ({
  idAto,
  isUrgente,
}: PutActRelevanceParams): Promise<PutActRelevanceResponse> => {
  const { data } = await axiosInstance.put<PutActRelevanceResponse>(
    `/api/v1.0/atos/${idAto}/relevancia`,
    {
      isUrgente,
    }
  );

  if (!Boolean(data.status === "OK")) {
    throw new Error(data.message);
  }

  return data;
};
