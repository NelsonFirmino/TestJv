import axiosInstance from "../../axiosInstance";
import * as I from "./reports.interface";

export const GetErgonFinanceiro = async (
  params: I.GetErgonFinanceiroParams
): Promise<I.GetErgonFinanceiroResponse> => {
  try {
    const { data } = await axiosInstance.get(
      "/api/v1.0/ErgonServidorFinanceiro-dcje/consultar",
      {
        params,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const GetRPVReports = async (
  params: I.GetRPVReportsParams
): Promise<I.GetRPVReportsResponse> => {
  try {
    const { data } = await axiosInstance.get(`/api/v1.0/rpv/relatorios/rpv`, {
      params,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const GetProcessReports = async (
  params: I.GetProcessReportsParams
): Promise<I.GetProcessReportsResponse> => {
  try {
    const { data } = await axiosInstance.get(`/api/v1.0/relatorios/processos`, {
      params,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const GetOperatorProductivity = async (
  params: I.GetOperatorProductivityParams
): Promise<I.GetOperatorProductivityResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/relatorios/produtividade-operador`,
      {
        params,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const GetProcessesQuantityByDeadline = async (
  params: I.GetProcessesQuantityByDeadlineParams
): Promise<I.GetProcessesQuantityByDeadlineResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/relatorios/quantitatovo-processos-por-vencimento`,
      {
        params,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const GetQuantityFinishedPieces = async (
  params: I.GetQuantityFinishedPiecesParams
): Promise<I.GetQuantityFinishedPiecesResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/relatorios/quantitativo-pecas-finalizadas`,
      {
        params,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const GetAudit = async (
  params: I.GetAuditParams
): Promise<I.GetAuditResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/relatorios/auditorias/quantitativo-fluxo-ato-distribuicao`,
      {
        params,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const GetAdvisorProductivity = async (
  params: I.GetAdvisorProductivityParams
): Promise<I.GetAdvisorProductivityResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/relatorios/produtividade-assessor`,
      {
        params,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const GetAttorneyProductivity = async (
  params: I.GetAttorneyProductivityParams
): Promise<I.GetAttorneyProductivityResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/relatorios/produtividade-procurador`,
      {
        params,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const GetAttorneyProductivityMonth = async (
  params: I.GetAttorneyProductivityMonthParams
): Promise<I.GetAttorneyProductivityResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/relatorios/quantitativo-pecas-mes`,
      {
        params,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const GetAttorneyProductivityYear = async (
  params: I.GetAttorneyProductivityYearParams
): Promise<I.GetAttorneyProductivityResponse> => {
  try {
    const { data } = await axiosInstance.get(
      `/api/v1.0/relatorios/quantitativo-pecas-ano`,
      {
        params,
      }
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};
