import axiosInstance from "../../axiosInstance";
import {
  TriagemIdResponse,
  TriagensObsParams,
  TriagensObsResponse,
  TriagensObsResponseLote,
} from "./triagensObs.interface";

export const getTriagem = async ({
  id,
}: TriagensObsParams): Promise<TriagemIdResponse> => {
  const triagem = await axiosInstance.get(`/api/v1.0/Triagens/${id}`);

  return triagem.data;
};

export const getTriagensObs = async ({
  id,
}: TriagensObsParams): Promise<TriagensObsResponse> => {
  const triagensObs = await axiosInstance.get(
    `/api/v1.0/Triagens/${id}/observacoes`
  );

  return triagensObs.data;
};

export const postObs = async ({
  idTriagem,
  txObservacao,
  idUsuarioCadastro,
}: TriagensObsParams): Promise<TriagensObsResponse> => {
  const postObs = await axiosInstance.post(`/api/v1.0/triagens-observacoes`, {
    idTriagem,
    txObservacao,
    idUsuarioCadastro,
  });

  return postObs.data;
};

export const postTriagensObs = async ({
  idAto,
  idSecretaria,
  idEspecializada,
  isPublicar,
  idUsuarioCadastro,
}: TriagensObsParams): Promise<TriagensObsResponse> => {
  const postTriagensObs = await axiosInstance.post(`/api/v1.0/Triagens`, {
    idAto,
    idSecretaria,
    idEspecializada,
    isPublicar,
    idUsuarioCadastro,
  });

  return postTriagensObs.data;
};

export const postTriagensObsLote = async ({
  idAto,
  idSecretaria,
  idEspecializada,
  isPublicar,
  idUsuarioCadastro,
}: TriagensObsParams): Promise<TriagensObsResponseLote> => {
  const postTriagensObs = await axiosInstance.post(`/api/v1.0/Triagens`, {
    idAto,
    idSecretaria,
    idEspecializada,
    isPublicar,
    idUsuarioCadastro,
  });

  return postTriagensObs.data;
};

export const updateTriagensObs = async ({
  idTriagem,
  idAto,
  idSecretaria,
  idEspecializada,
  isPublicar,
  idUsuarioCadastro,
}: TriagensObsParams): Promise<TriagensObsResponse> => {
  const updateTriagensObs = await axiosInstance.put(
    `/api/v1.0/Triagens/${idTriagem}`,
    {
      idAto,
      idSecretaria,
      idEspecializada,
      isPublicar,
      idUsuarioCadastro,
    }
  );

  return updateTriagensObs.data;
};

export const updateObs = async ({
  id,
  idTriagem,
  txObservacao,
  idUsuarioCadastro,
}: TriagensObsParams): Promise<TriagensObsResponse> => {
  const updateObs = await axiosInstance.put(
    `/api/v1.0/triagens-observacoes/${id}`,
    {
      idTriagem,
      txObservacao,
      idUsuarioCadastro,
    }
  );

  return updateObs.data;
};
