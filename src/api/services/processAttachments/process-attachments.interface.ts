export interface PostProcessAttachmentParams {
  processId: string;
  name: string;
  file_stream: string;
  idUsuarioCadastro: string;
}

export interface GetProcessAttachmentsResponse {
  status: string;
  message: string;
  data: Attachments[];
}

export interface GetProcessAttachmentsDCJEResponse {
  status: string;
  message: string;
  data: AttachmentDCJE[];
}

export interface GetProcessAttachmentDCJECalcResponse {
  status: string;
  message: string;
  data: AttachmentCalcDCJE;
}

export interface Attachments {
  id: number;
  idProcesso: number;
  txDescricao: string;
  idAnexo: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  file_stream: string;
  name: string;
  txTipoArquivo: string;
}

export interface AttachmentCalcDCJE {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}

export interface AttachmentDCJE {
  id: number;
  txTipo: string;
  idAnexo: number;
  txTitulo: string;
  txCalculo: string;
  dtCadastro: string;
  hrCadastro: string;
}
