import axiosInstance from "../../axiosInstance";
import {
  FinishedPiecesParams,
  FinishedPiecesResponse,
} from "./getfinishedPieces.interface";

export const getFinishedPieces = async ({
  dtFim,
  dtInicio,
  idEspecializada,
  idProcurador,
}: FinishedPiecesParams): Promise<FinishedPiecesResponse> => {
  const finishedPieces = await axiosInstance.get<FinishedPiecesResponse>(
    `/api/v1.0/relatorios/pecas-finalizadas`,
    {
      params: {
        dtFim,
        dtInicio,
        idProcurador,
        idEspecializada,
      },
    }
  );

  return finishedPieces.data;
};
