import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { TiposProcessoPJEI } from "./interface";

const useProcessosPjeService = () => {
    const [tiposProcessoPJE, setTiposProcessoPJE] =
        useState<TiposProcessoPJEI[]>();
    const [gettingProgress, setGettingProgress] = useState<number>(0);
    const [loadingTiposProcessoPJE, setLoadingTiposProcessoPJE] =
        useState<boolean>(false);
    const getTiposProcessosPJE = () =>
        new Promise(
            async (
                resolve: (res: TiposProcessoPJEI[]) => void,
                reject: (res: string) => void
            ) => {
                try {
                    setLoadingTiposProcessoPJE(true);
                    const data = await axiosInstance.get(
                        `/api/v1.0/processos-pje/tipos-documentos?page=1&pageSize=1000`,
                        {
                            onDownloadProgress: (progressEvent) => {
                                const total = 3369;
                                let percentCompleted = Math.round(
                                    (progressEvent.loaded * 100) / total
                                );
                                setGettingProgress(percentCompleted);
                            }
                        }
                    );

                    setTiposProcessoPJE(data.data.data);
                    resolve(data.data.data);
                } catch (err) {
                    reject("error");
                }
                setLoadingTiposProcessoPJE(false);
            }
        );

    return {
        getTiposProcessosPJE,
        tiposProcessoPJE,
        gettingProgress,
        loadingTiposProcessoPJE
    };
};

export default useProcessosPjeService;
