import axiosInstance from "../../axiosInstance";
import {
  PendingDistributionsParams,
  PendingDistributionsResponse,
} from "./pendingDistributions.interface";

export const getPendingDistributions = async ({
  dtPrazo,
  idEspecializada,
  idSecretaria,
  isCiente,
  isEspecializadasFilhas,
}: PendingDistributionsParams): Promise<PendingDistributionsResponse> => {
  const pendingDistributions =
    await axiosInstance.get<PendingDistributionsResponse>(
      `/api/v1.0/relatorios/distribuicoes-pendentes`,
      {
        params: {
          dtPrazo,
          idEspecializada,
          idSecretaria,
          isCiente,
          isEspecializadasFilhas,
        },
      }
    );

  return pendingDistributions.data;
};

export const getPendingDistributionsQuantitative = async ({
  dtPrazo,
  idEspecializada,
  idSecretaria,
  isCiente,
  isEspecializadasFilhas,
}: PendingDistributionsParams): Promise<PendingDistributionsResponse> => {
  const pendingDistributionsQuantitative =
    await axiosInstance.get<PendingDistributionsResponse>(
      `/api/v1.0/relatorios/distribuicoes-pendentes-quantitativo`,
      {
        params: {
          dtPrazo,
          idEspecializada,
          idSecretaria,
          isCiente,
          isEspecializadasFilhas,
        },
      }
    );

  return pendingDistributionsQuantitative.data;
};
