import axiosInstance from "../../axiosInstance";
import {
  GetProcessAttachmentDCJECalcResponse,
  GetProcessAttachmentsDCJEResponse,
  GetProcessAttachmentsResponse,
  PostProcessAttachmentParams,
} from "./process-attachments.interface";

export const getProcessAttachmentsDCJE = async (
  processId: string
): Promise<GetProcessAttachmentsDCJEResponse> => {
  const processAttachmentsDCJE = await axiosInstance.get(
    `/api/v1.0/espelho-anexos-dcje/processo?idProcesso=${processId}`
  );

  return processAttachmentsDCJE.data;
};

export const getDCJECalcFile = async (
  fileId: number
): Promise<GetProcessAttachmentDCJECalcResponse> => {
  const {data} = await axiosInstance.get(
    `/api/v1.0/contadoria/relatorios/calculos?id=${fileId}`
  );

  return data;
};

export const getProcessAttachments = async (
  processId: string
): Promise<GetProcessAttachmentsResponse> => {
  const processData = await axiosInstance.get(
    `/api/v1.0/Processos/${processId}/anexos`
  );

  return processData.data;
};

export const deleteProcessAttachment = async (
  attachmentId: number
): Promise<any> => {
  const processAttachment = await axiosInstance.delete(
    `/api/v1.0/processos-anexos/${attachmentId}`
  );

  return processAttachment.data;
};

export const postProcessAttachment = async ({
  processId,
  file_stream,
  name,
  idUsuarioCadastro,
}: PostProcessAttachmentParams): Promise<any> => {
  const processAttachment = await axiosInstance.post(
    `/api/v1.0/Processos/${processId}/anexos`,
    { idUsuarioCadastro, file_stream, name, txDescricao: name }
  );

  return processAttachment.data;
};
