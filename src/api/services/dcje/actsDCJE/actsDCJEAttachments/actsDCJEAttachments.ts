import axiosInstance from "../../../../axiosInstance";
import {
  ActDCJEAttachmentsResponse,
  DeleteActDCJEAttachmentResponse,
  PostActDCJEAttachment,
} from "./actsDCJEAttachments.interface";

export const postActDCJEAttachments = async (
  attachment: PostActDCJEAttachment
): Promise<void> => {
  const actAttachments = await axiosInstance.post(
    `/api/v1.0/atos-anexos`,
    attachment
  );

  return actAttachments.data;
};

export const getActDCJEAttachments = async (
  id: number
): Promise<ActDCJEAttachmentsResponse> => {
  const actAttachments = await axiosInstance.get(
    `/api/v1.0/ficha-dcje/${id}/anexos`
  );

  return actAttachments.data;
};

export const deleteActDCJEAttachment = async (
  id: number
): Promise<DeleteActDCJEAttachmentResponse> => {
  const deletedAct = await axiosInstance.delete(
    `/api/v1.0/ficha-dcje-anexos/${id}`
  );

  return deletedAct.data;
};
