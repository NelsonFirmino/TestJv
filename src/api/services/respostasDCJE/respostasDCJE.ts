import axiosInstance from "../../axiosInstance";
import {
  GetParams,
  GetResponse,
  PutPostParams,
} from "./respostasDCJE.interface";

export const postRespostasDCJE = async ({
  id,
  idDistribuicao,
  txObservacao,
  txDivergencias,
  vaCalculado,
  vaDivergencia,
  isValorApurado,
  idUsuarioCadastro,
  lsArquivos
}: PutPostParams): Promise<GetResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/respostas-dcje`, {
    id,
    idDistribuicao,
    txObservacao,
    txDivergencias,
    vaCalculado,
    vaDivergencia,
    isValorApurado,
    idUsuarioCadastro,
    lsArquivos
  });

  return response.data;
};

export const getRespostasDCJE = async ({
  page = 1,
  pageSize = 500,
  idContador,
  idProcesso,
  dtIni,
  dtFim,
  idFichaProcessual,
}: GetParams): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/respostas-dcje`, {
    params: {
      page,
      pageSize,
      idContador,
      idProcesso,
      dtIni,
      dtFim,
      idFichaProcessual,
    },
  });

  return response.data;
};

export const deleteRespostasDCJEByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.delete(`/api/v1.0/respostas-dcje/${id}`);

  return response.data;
};

export const getRespostasDCJEByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/respostas-dcje/${id}`);

  return response.data;
};

export const getRespostasDCJEAnexosByID = async (
  id: number
): Promise<GetResponse> => {
  const response = await axiosInstance.get(
    `/api/v1.0/respostas-dcje/${id}/anexos`
  );

  return response.data;
};

export const getRespostasDCJECalculadoByIDFichaProcessual = async (
  idFichaProcessual: number
): Promise<GetResponse> => {
  const response = await axiosInstance.get(
    `/api/v1.0/respostas-dcje/${idFichaProcessual}/calculado`
  );

  return response.data;
};
