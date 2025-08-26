import axiosInstance from "../../../axiosInstance";
import {
  GetProceduralSheedNotClosedParams,
  GetProceduralSheedNotClosedResponse,
} from "./proceduralSheedNotClosed.interface";

export const getProceduralSheedNotClosed = async ({
  idProcurador,
  isSemReposta,
}: GetProceduralSheedNotClosedParams): Promise<GetProceduralSheedNotClosedResponse> => {
  const proceduralSheedNotClosed =
    await axiosInstance.get<GetProceduralSheedNotClosedResponse>(
      "/api/v1.0/contadoria/relatorios/fichas-nao-encerradas",
      {
        params: {
          idProcurador,
          isSemReposta,
        },
      }
    );

  return proceduralSheedNotClosed.data;
};
