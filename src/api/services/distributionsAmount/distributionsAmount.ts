import axiosInstance from "../../axiosInstance";
import {
  DistributionsAmountParams,
  DistributionsAmountResponse,
} from "./distributionsAmount.interface";

export const getDistributionsAmount = async ({
  dtFim,
  dtInicio,
  idEspecializada = "0",
  idProcurador = "0",
  isSimplified,
  isEspecializadasFilhas,
}: DistributionsAmountParams): Promise<DistributionsAmountResponse> => {
  let endpoint = "";
  let params: {};
  switch (isSimplified) {
    case false:
      (endpoint = "distribuicoes-quantitativo"),
        (params = {
          dtFim,
          dtInicio,
          idProcurador,
          idEspecializada,
        });
      break;
    case true:
      endpoint = "distribuicoes-quantitativo-simplificado";
      params = {
        dtFim,
        dtInicio,
        isEspecializadasFilhas,
        idEspecializada,
      };
      break;
  }
  const distributionsAmount =
    await axiosInstance.get<DistributionsAmountResponse>(
      `/api/v1.0/relatorios/${endpoint}`,
      {
        params,
      }
    );

  return distributionsAmount.data;
};
