import axiosInstance from "../../axiosInstance";
import {
  AdvisorAttorneysParams,
  GetAdvisorAttorneysotResponse,
} from "./advisorAttorneys.interface";

export const getAdvisorAttorneys =
  async (): Promise<GetAdvisorAttorneysotResponse> => {
    const advisorAttorneys = await axiosInstance.get(
      "/api/v1.0/procuradores-assessores?page=1&pageSize=500"
    );

    return advisorAttorneys.data;
  };

export const postAdvisorAttorneys = async ({
  idAssessor,
  idProcurador,
  idUsuarioCadastro,
}: AdvisorAttorneysParams): Promise<GetAdvisorAttorneysotResponse> => {
  const response = await axiosInstance
    .post("/api/v1.0/procuradores-assessores", {
      idProcurador,
      idAssessor,
      idUsuarioCadastro,
    })
    .then((response) => {
      return response.data;
    });

  return response;
};

export const deleteAdvisorAttorneys = async ({
  idAssessor,
  idUsuarioCadastro,
}: AdvisorAttorneysParams): Promise<GetAdvisorAttorneysotResponse> => {
  var advisorAttorneyId = "";
  const advisorAttorneysList = (await getAdvisorAttorneys()).data;

  advisorAttorneysList.forEach((ad) => {
    const procurador = ad.idProcurador == idUsuarioCadastro;
    const assessor = ad.idAssessor == idAssessor;

    if (procurador && assessor) {
      advisorAttorneyId = ad.id;
      return;
    }
  });

  const response = await axiosInstance
    .delete(`/api/v1.0/procuradores-assessores/${advisorAttorneyId}`)
    .then((response) => {
      return response.data;
    });

  return response;
};
