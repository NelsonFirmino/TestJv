import axiosInstance from "../../axiosInstance";
import {
  GetOrgaoJulgadorParams,
  GetOrgaoJulgadorResponse,
  GetOrgaoJulgadorTribunalInstanciaParams,
  GetOrgaoJulgadorTribunalInstanciaResponse,
  PutPostOrgaoJulgadorParams,
} from "./orgaojulgador.interface";

export const postOrgaoJulgador = async ({
  txOrgaoJulgador,
  txSigla,
  nuInstancia,
  idTribunal,
  idComarca,
  isAtivo,
}: PutPostOrgaoJulgadorParams): Promise<GetOrgaoJulgadorResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/orgaos-julgadores`, {
    txOrgaoJulgador,
    txSigla,
    nuInstancia,
    idTribunal,
    idComarca,
    isAtivo,
  });

  return response.data;
};

export const getOrgaosJulgadores = async ({
  page = "1",
  pageSize = "2000",
}: GetOrgaoJulgadorParams): Promise<GetOrgaoJulgadorResponse> => {
  let params: any = {
    page,
    pageSize,
  };
  const response = await axiosInstance.get(`/api/v1.0/orgaos-julgadores`, {
    params,
  });

  return response.data;
};

export const getOrgaosJulgadoresTribunalInstancia = async ({
  idTribunal,
  nuInstancia,
}: GetOrgaoJulgadorTribunalInstanciaParams): Promise<GetOrgaoJulgadorTribunalInstanciaResponse> => {
  const response = await axiosInstance.get(
    "/api/v1.0/orgaos-julgadores/listar-tribunal-instancia",
    {
      params: {
        idTribunal,
        nuInstancia,
      },
    }
  );

  return response.data;
};

export const getOrgaoJulgadorByID = async (
  id: number
): Promise<GetOrgaoJulgadorResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/orgaos-julgadores/${id}`);

  return response.data;
};

export const putOrgaoJulgadorByID = async ({
  id,
  txOrgaoJulgador,
  txSigla,
  nuInstancia,
  idTribunal,
  idComarca,
  isAtivo,
}: PutPostOrgaoJulgadorParams): Promise<GetOrgaoJulgadorResponse> => {
  const response = await axiosInstance.put(
    `/api/v1.0/orgaos-julgadores/${id}`,
    {
      txOrgaoJulgador,
      txSigla,
      nuInstancia,
      idTribunal,
      idComarca,
      isAtivo,
    }
  );

  return response.data;
};

export const deleteOrgaoJulgadorByID = async (
  id: number
): Promise<GetOrgaoJulgadorResponse> => {
  const response = await axiosInstance.delete(
    `/api/v1.0/orgaos-julgadores/${id}`
  );

  return response?.data;
};
