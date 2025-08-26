import axiosInstance from "../../axiosInstance";
import {
    AccountingQuantitativeParams,
    GetAccountingQuantitativeResponse
} from "./accountingquantitative.interface";

export const getAccountingQuantitative = async ({
    idProcurador,
    dtFim,
    dtInicio
}: AccountingQuantitativeParams): Promise<GetAccountingQuantitativeResponse> => {
    const quantitative =
        await axiosInstance.get<GetAccountingQuantitativeResponse>(
            `/api/v1.0/ficha-dcje/quantitativo`,
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
        return Promise.reject(null);
    }
};
