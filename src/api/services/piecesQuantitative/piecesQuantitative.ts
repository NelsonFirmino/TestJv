import axiosInstance from "../../axiosInstance";
import {
    PiecesQuantitativeParams,
    GetPiecesQuantitativeResponse
} from "./piecesquantitative.interface";

export const getPiecesQuantitative = async ({
    idProcurador,
    dtFim,
    dtInicio
}: PiecesQuantitativeParams): Promise<GetPiecesQuantitativeResponse> => {
    const quantitative = await axiosInstance.get<GetPiecesQuantitativeResponse>(
        `/api/v1.0/Pecas/quantitativo`,
        {
            params: {
                idProcurador,
                dtInicio,
                dtFim
            }
        }
    );
    if (quantitative) {
        return Promise.resolve(quantitative.data);
    } else {
        return Promise.reject("Error");
    }
};
