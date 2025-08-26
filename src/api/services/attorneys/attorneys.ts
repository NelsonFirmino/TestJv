import axiosInstance from "../../axiosInstance";
import {
  AttorneyScheduleParams,
  AttorneyScheduleResponse,
  getAttorneyBySpecialIdResponse,
  GetAttorneysResponse,
  GetDistributionByAttorneyIdResponse,
  GetRedistributionsByAttorneyIdResponse,
  GetRequestsForInactionByAttorneyIdResponse,
} from "./attorneys.interface";

export const getAttorneys = async (): Promise<GetAttorneysResponse> => {
  const { data } = await axiosInstance.get("/api/v1.0/Procuradores");

  return data;
};

export const getDistributionByAttorneyId = async (attorneyId: number): Promise<GetDistributionByAttorneyIdResponse> => {
  const { data } = await axiosInstance.get(`/api/v1.0/Procuradores/${attorneyId}/distribuicoes`);

  return data;
}

export const getRequestsForInactionByAttorneyId = async (attorneyId: number): Promise<GetRequestsForInactionByAttorneyIdResponse> => {
  const { data } = await axiosInstance.get(`/api/v1.0/despachos/acato-pendente/procurador/${attorneyId}`);

  return data;
}

export const getRedistributionsByAttorneyId = async (attorneyId: number): Promise<GetRedistributionsByAttorneyIdResponse> => {
  const { data } = await axiosInstance.get(`/api/v1.0/redistribuicoes/pedidos/procurador-chefe/${attorneyId}`);

  return data;
}


export const getAttorneyScheduleById = async ({
  idProcurador,
  dtPrazoInicial,
  dtPrazoFinal,
}: AttorneyScheduleParams): Promise<AttorneyScheduleResponse> => {
  const { data } = await axiosInstance.get(
    `/api/v1.0/Procuradores/${idProcurador}/agenda`,
    {
      params: {
        dtPrazoInicial,
        dtPrazoFinal,
      },
    }
  );

  return data;
};

export const getAttorneyBySpecialId = async (idSpecial: number): Promise<getAttorneyBySpecialIdResponse> => {
  const { data } = await axiosInstance.get(`/api/v1.0/Especializada/${idSpecial}/procuradores`);

  return data;
}