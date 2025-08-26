import axiosInstance from "../../axiosInstance";
import {
    DistributionQuantitativeParams,
    GetDistributionQuantitativeResponse
} from "./distributionsquantitative.interface";

export async function getDistributionsQuantitative({
    idProcurador,
    dtFim,
    dtInicio
}: DistributionQuantitativeParams) {
    try {
        const quantitative = await axiosInstance.get(
            `/api/v1.0/Distribuicoes/quantitativo`,
            {
                params: {
                    idProcurador,
                    dtInicio,
                    dtFim
                }
            }
        );

        return quantitative.data;
    } catch (err) {
        return err;
    }
}
