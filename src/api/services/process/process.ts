import axiosInstance from "../../axiosInstance";
import { ProcessoInAction } from "../attorneys/attorneys.interface";
import {
  DeleteResponse,
  GetAnexoPJeProps,
  GetAnexoPJeResponse,
  GetProceduralFormClosedProps,
  GetProcessInActionPrintResponse,
  GetProcessParams,
  GetProcessResponse,
  GetProcessoAnexoPJeResponse,
  PutProcessRelevanceParams,
  PutProcessRelevanceResponse,
} from "./process.interface";

// TODO: REFORMATAR PARA PROCESSPJE POIS EXISTE UMA API DE PROCESSO
export const GetProcess = async ({
  idProcurador,
  dtFim,
  dtIni,
  idProcesso,
  idFichaProcessual,
  page = "1",
  pageSize = "10",
  isResposta = false,
  isEncerradas = false,
}: GetProcessParams): Promise<GetProcessResponse> => {
  let params: any = {
    idProcurador,
    dtIni,
    dtFim,
    idProcesso,
    isResposta,
    page,
    pageSize,
    isEncerradas,
  };
  if (idFichaProcessual) {
    params = {
      idProcurador,
      dtIni,
      dtFim,
      idProcesso,
      idFichaProcessual,
      isResposta,
      page,
      pageSize,
      isEncerradas,
    };
  }
  const processsList = await axiosInstance.get("/api/v1.0/ficha-dcje", {
    params,
  });

  return processsList.data;
};

export const GetProcessByID = async ({ id }): Promise<GetProcessResponse> => {
  let params: any = {
    id,
  };
  const processsList = await axiosInstance.get(`/api/v1.0/ficha-dcje/${id}`, {
    params,
  });

  return processsList.data;
};

export const GetProcessByTxNumero = async (
  txNumero: string
): Promise<GetProcessResponse> => {
  const process = await axiosInstance.get(
    `/api/v1.0/processos/numero?txNumero=${txNumero}&page=1&pageSize=10`
  );

  return process.data;
};

export const DeleteEncerramentoFichaDCJE = async ({
  id,
}): Promise<DeleteResponse> => {
  let params: any = {
    id,
  };
  const response = await axiosInstance.delete(
    `/api/v1.0/ficha-dcje/${id}/excluir-encerramento`,
    {
      params,
    }
  );
  return response.data;
};

export const GetProceduralFormClosed = async ({
  idProcurador,
  idFichaProcessual,
  idProcesso,
  dtFim,
  dtIni,
  page = 1,
  pageSize = 10,
  isEncerradas = true,
  idUsuarioCadastro,
  idPerfil,
  isChefe,
}: GetProceduralFormClosedProps): Promise<GetProcessResponse> => {
  const id =
    +idPerfil === 4 && isChefe === "True" ? idUsuarioCadastro : idProcurador;
  const processsList = await axiosInstance.get("/api/v1.0/ficha-dcje", {
    params: {
      idProcurador: id,
      idFichaProcessual,
      idProcesso,
      dtFim,
      dtIni,
      page,
      pageSize,
      isEncerradas,
    },
  });

  return processsList.data;
};

export const GetProcessoPecas = async (idProcesso: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/Processos/${idProcesso}/pecas`
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const GetPeca = async (pecaId: number) => {
  try {
    const { data } = await axiosInstance.get(`/api/v1.0/pecas/${pecaId}/pdf`);
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const GetProcessoAnexoPJe = async (
  processoId: string
): Promise<GetProcessoAnexoPJeResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/processos-pje/${processoId}/documentos`
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const GetAnexoPJe = async ({
  idProcessoPJe,
  nuCodigoDocumento,
}: GetAnexoPJeProps): Promise<GetAnexoPJeResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/processos-pje/${idProcessoPJe}/documentos/${nuCodigoDocumento}`
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const PutProcessRelevance = async ({
  idProcesso,
  txRelevancia,
}: PutProcessRelevanceParams): Promise<PutProcessRelevanceResponse> => {
  const { data } = await axiosInstance.put<PutProcessRelevanceResponse>(
    `/api/v1.0/processos/${idProcesso}/relevancia`,
    {
      txRelevancia,
    }
  );

  if (!Boolean(data.status === "OK")) {
    throw new Error(data.message);
  }

  return data;
};

export const GetProcessInActionPrint = async (
  process: ProcessoInAction[]
): Promise<GetProcessInActionPrintResponse> => {
  const { data } = await axiosInstance.post<GetProcessInActionPrintResponse>(
    `/api/v1.0/relatorios/dashboard-procurador/processos-em-atuacao`,
    process
  );

  if (!Boolean(data.status === "OK")) {
    throw new Error(data.message);
  }

  return data;
};
