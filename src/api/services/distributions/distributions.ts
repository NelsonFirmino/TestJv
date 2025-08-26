import axiosInstance from "../../axiosInstance";
import {
  DistributionParams,
  GetDistributionsResponse,
  GetRedistributionsReasonsResponse,
  PatchDistributionAdvisorParams,
  PatchDistributionAdvisorResponse,
  PostRedistributionParams,
  PostRedistributionResponse,
} from "./distributions.interface";

export const getDistributions = async ({
  dtFim,
  dtInicio,
  idEspecializada,
  idProcurador,
  idSecretaria,
}: DistributionParams): Promise<GetDistributionsResponse> => {
  const secretariesList = await axiosInstance.get(
    "/api/v1.0/relatorios/distribuicoes-procuradores",
    {
      params: {
        dtFim,
        dtInicio,
        idEspecializada,
        idProcurador,
        idSecretaria,
      },
    }
  );

  return secretariesList.data;
};

export const patchDistributionsAdvisor = async ({
  idAssessor,
  idUsuarioCadastro,
  idsDistribuicao,
}: PatchDistributionAdvisorParams): Promise<GetDistributionsResponse> => {
  const response = await axiosInstance
    .patch("/api/v1.0/Distribuicoes/assessor", {
      idAssessor,
      idUsuarioCadastro,
      idsDistribuicao,
    })
    .then((response) => {
      return response.data;
    });

  return response;
};

export const patchDistributionsAdvisorV2 = async ({
  idAssessor,
  idUsuarioCadastro,
  idsDistribuicao,
}: PatchDistributionAdvisorParams): Promise<PatchDistributionAdvisorResponse> => {
  const { data } = await axiosInstance.patch(
    "/api/v1.0/Distribuicoes/assessor",
    {
      idAssessor,
      idUsuarioCadastro,
      idsDistribuicao,
    }
  );

  if (!Boolean(data.status === "OK")) {
    throw new Error(data.message);
  }

  return data;
};

export const getRedistributionsReasons =
  async (): Promise<GetRedistributionsReasonsResponse> => {
    const { data } = await axiosInstance.get(
      "/api/v1.0/motivos-redistribuicoes?pageSize=250"
    );

    return data;
  };

export const postRedistribution = async ({
  idDistribuicaoAntiga,
  idEspecializada,
  idMotivo,
  idProcurador,
  idUsuarioCadastro,
  txObservacao,
}: PostRedistributionParams): Promise<PostRedistributionResponse> => {
  const { data } = await axiosInstance.post<PostRedistributionResponse>(
    "/api/v1.0/Distribuicoes/pedido-redistribuicao",
    {
      idDistribuicaoAntiga,
      idEspecializada,
      idMotivo,
      idProcurador,
      idUsuarioCadastro,
      txObservacao,
    }
  );

  if (!Boolean(data.status === "Created")) {
    throw new Error(data.message);
  }

  return data;
};
