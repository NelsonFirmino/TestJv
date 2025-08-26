import jwtDecode from "jwt-decode";
import axiosInstance from "../../../axiosInstance";
import {
  GetAttorneysDistributionsResponse,
  GetInformationRequestResponse,
  InformationRequest,
} from "./attorneys.informationRequests.interface";

export const getAttorneyInformationRequests = async (
  id: string
): Promise<GetAttorneysDistributionsResponse> => {
  const AttorneysInformationRequest = await axiosInstance.get(
    `/api/v1.0/solicitacoes-informacoes/resposta-pendente/procurador/${id}`
  );

  return AttorneysInformationRequest.data;
};

export const postInformationRequest = async ({
  id = 0,
  idEspecializada,
  txDescricao,
  idAto,
  idUsuarioCadastro,
}: InformationRequest): Promise<GetInformationRequestResponse> => {
  const response = await axiosInstance.post(
    "/api/v1.0/solicitacoes-informacoes",
    {
      id: id,
      idEspecializada: idEspecializada,
      idProcurador: idUsuarioCadastro,
      txDescricao: txDescricao,
      idAto: idAto,
      idUsuarioCadastro,
    }
  );
  return response.data;
};
