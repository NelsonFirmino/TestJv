import axiosInstance from "../../../axiosInstance";
import { useState } from "react";
import { AudienciaI, getAudienciasI } from "./interface";

const useAudienciasService = () => {
    const [audiencias, setAudiencias] = useState<AudienciaI[]>([]);

    const getAudiencias = (params: getAudienciasI) =>
        new Promise(
            async (
                resolve: (res: string) => void,
                reject: (res: string) => void
            ) => {
                const { procurador, datainicio, datafim } = params;
                {
                    try {
                        const data = await axiosInstance.get(
                            `/api/v1.0/procuradores/${procurador}/audiencias?dtInicio=${datainicio}&dtFim=${datafim}`
                        );
                        if (data.data.status === "NotFound") {
                            resolve(data.data.message);
                            setAudiencias([]);
                            return;
                        }
                        setAudiencias(data.data.data);
                        resolve(data.data.data);
                        return;
                    } catch (err) {
                        reject(err as any);
                    }
                }
            }
        );

    return { getAudiencias, audiencias };
};

export default useAudienciasService;
