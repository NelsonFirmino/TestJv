import axiosInstance from "../../axiosInstance";
import {
  GetErgonRubricasResponse,
  GetParams,
  PutPostParams,
} from "./ergonrubricas.interface";

export const getErgonRubricasAutoComplete = async ({
  page = "1",
  pageSize = "10",
  txRubrica,
}: GetParams): Promise<GetErgonRubricasResponse> => {
  const response = await axiosInstance.get(
    `/api/v1.0/ergonrubricas/autocomplete`,
    {
      params: {
        page,
        pageSize,
        txRubrica,
      },
    }
  );

  return response.data;
};

export const GetErgonRubricas = async (): Promise<GetErgonRubricasResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/ergonrubricas?page=1&pageSize=1000`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const postErgonRubricas = async ({
  nuRubrica,
  isIrrf,
  isPrevidencia,
  nuTipoCalculo,
  txRubrica,
  txAbreviatura,
  txTipoRubrica,
  idUsuarioCadastro,
  dtCadastro,
  hrCadastro,
}: PutPostParams): Promise<GetErgonRubricasResponse> => {
  const response = await axiosInstance.post(`/api/v1.0/ergonrubricas`, {
    nuRubrica,
    isIrrf,
    isPrevidencia,
    nuTipoCalculo,
    txRubrica,
    txAbreviatura,
    txTipoRubrica,
    idUsuarioCadastro,
    dtCadastro,
    hrCadastro,
  });

  return response.data;
};

export const getErgonRubricasByID = async (
  id: number
): Promise<GetErgonRubricasResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/ergonrubricas/${id}`);

  return response.data;
};

export const putErgonRubricasByID = async ({
  id,
  nuRubrica,
  isIrrf,
  isPrevidencia,
  nuTipoCalculo,
  txRubrica,
  txAbreviatura,
  txTipoRubrica,
  idUsuarioCadastro,
  dtCadastro,
  hrCadastro,
}: PutPostParams): Promise<GetErgonRubricasResponse> => {
  const response = await axiosInstance.put(`/api/v1.0/ergonrubricas/${id}`, {
    nuRubrica,
    isIrrf,
    isPrevidencia,
    nuTipoCalculo,
    txRubrica,
    txAbreviatura,
    txTipoRubrica,
    idUsuarioCadastro,
    dtCadastro,
    hrCadastro,
  });

  return response.data;
};

export const getErgonRubricasByCalculo = async ({
  idCalculo,
}: GetParams): Promise<GetErgonRubricasResponse> => {
  const reasonsRequests = await axiosInstance.get(
    "/api/v1.0/ergonrubricas/porcalculo",
    {
      params: {
        idCalculo,
      },
    }
  );

  return reasonsRequests?.data;
};

export const getErgonRubricasByTipo = async ({
  txTipoRubrica,
}: GetParams): Promise<GetErgonRubricasResponse> => {
  const reasonsRequests = await axiosInstance.get(
    "/api/v1.0/ergonrubricas/tipo",
    {
      params: {
        txTipoRubrica,
      },
    }
  );

  return reasonsRequests?.data;
};
