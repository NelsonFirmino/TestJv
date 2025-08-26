import axiosInstance from "../../../axiosInstance";
import { DistributionQuantitativeParams, QuantitativeI } from "./interface";
import { useState } from "react";

const useQuantitativoService = () => {
    const [quantitative, setQuantitative] = useState<QuantitativeI>();

    async function getDistributionsQuantitative(
        params: DistributionQuantitativeParams
    ) {
        const { idProcurador, dtInicio, dtFim } = params;
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
            setQuantitative(quantitative.data.data);
            return quantitative.data.data;
        } catch (err) {
            return err;
        }
    }

    return { getDistributionsQuantitative, quantitative };
};

export default useQuantitativoService;
