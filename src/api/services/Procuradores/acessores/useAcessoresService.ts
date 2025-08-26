import axiosInstance from "../../../axiosInstance";
import { AcessorI, getAcessoresI } from "./interface";
import { useState } from "react";

const useAcessoresService = () => {
    const [acessores, setAcessores] = useState<AcessorI[]>([]);

    const getAcessores = (params: getAcessoresI) =>
        new Promise(
            async (
                resolve: (res: string) => void,
                reject: (res: string) => void
            ) => {
                try {
                    const { idProcurador } = params;
                    const acessores = await axiosInstance.get(
                        `/api/v1.0/Procuradores/${idProcurador}/assessores`
                    );
                    setAcessores(acessores.data.data);
                    resolve("ok");
                } catch (err) {
                    reject(err as any);
                }
            }
        );

    return { getAcessores, acessores };
};

export default useAcessoresService;
