export interface ActDCJEAttachmentsResponse {
  status: string;
  message: string;
  data: ActDCJEAttachment[];
}

export interface ActDCJEAttachment {
  id: number;
  idFichaProcessual: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  stream_id: string;
  file_stream: string;
  name: string;
}

export interface PostActDCJEAttachment {
  idFichaProcessual: number;
  idUsuarioCadastro: number;
  file_stream: string;
  name: string;
}

export interface DeleteActDCJEAttachmentResponse {
  status: string;
  message: string;
}
