import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { ModeloPecaI } from "./interfaces";

const useModelosPecaService = () => {
    const [modelos, setModelos] = useState<ModeloPecaI[]>();
    const [modelo, setModelo] = useState<ModeloPecaI>();
    const [gettingProgress, setGettingProgress] = useState<number>(0);
    const [loadingModelos, setLoadingModelos] = useState<boolean>(false);

    useEffect(() => {
        if (gettingProgress >= 100) setGettingProgress(0);
    }, [gettingProgress]);

    const getModelosPorIDAutorTipoDoc = ({
        idAutor,
        idTipoDocumento
    }: {
        idAutor?: number;
        idTipoDocumento?: number;
    }) =>
        new Promise(
            async (
                resolve: (res: ModeloPecaI[]) => void,
                reject: (res: string) => void
            ) => {
                setLoadingModelos(true);
                if (loadingModelos) {
                    return reject("Modelos já estão carregando");
                }
                try {
                    //v1.0/modelos-peca?idAutor={1}&idTipoDocumento={2}
                    const data = await axiosInstance.get(
                        `/api/v1.0/modelos-peca/v2`,
                        {
                            onDownloadProgress: (progressEvent) => {
                                const total = 28108155;
                                let percentCompleted = Math.round(
                                    (progressEvent.loaded * 100) / total
                                );
                                setGettingProgress(percentCompleted);
                            },
                            params: {
                                idAutor,
                                idTipoDocumento
                            }
                        }
                    );
                    if (data.data.status == "NotFound") {
                        setModelos([]);
                        resolve([]);
                    } else {
                        setModelos(data.data.data);
                        resolve(data.data.data);
                    }
                } catch (err) {
                    reject("error");
                }
                setLoadingModelos(false);
            }
        );

   
    const getModeloById = ({
        id
    }: {
        id: number;
    }) =>
        new Promise(
            async (
                resolve: (res: ModeloPecaI) => void,
                reject: (res: string) => void
            ) => {
                if (loadingModelos) {
                    return 
                }
                try {
                    console.log(id);
                    const data = await axiosInstance.get(
                        `/api/v1.0/modelos-peca/${id}`
                    );
        
                    setModelo(data.data.data);
                    resolve(data.data.data);

                } catch (err) {
                    reject(`error: ${err}`);
                }
            }
        );
    
    const getModelos = () =>
        new Promise(
            async (
                resolve: (res: ModeloPecaI[]) => void,
                reject: (res: string) => void
            ) => {
                setLoadingModelos(true);
                if (loadingModelos) {
                    return reject("Modelos já estão carregando");
                }
                try {
                    const data = await axiosInstance.get(
                        `/api/v1.0/modelos-peca/v2`,
                        {
                            onDownloadProgress: (progressEvent) => {
                                const total = 28108155;

                                let percentCompleted = Math.round(
                                    (progressEvent.loaded * 100) / total
                                );
                                setGettingProgress(percentCompleted);
                            }
                        }
                    );

                    setModelos(data.data.data);
                    resolve(data.data.data);
                } catch (err) {
                    reject("error");
                }
                setLoadingModelos(false);
            }
        );

    async function sendModelo(model: ModeloPecaI) {
        try {
            const res = await axiosInstance.post(
                `/api/v1.0/modelos-peca`,
                model
            );
            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async function updateModelo(model: ModeloPecaI) {
        try {
            const res = await axiosInstance.put(
                `/api/v1.0/modelos-peca/${model.id}`,
                model
            );
            return Promise.resolve(res);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    return {
        getModelos,
        modelos,
        sendModelo,
        getModeloById,
        updateModelo,
        getModelosPorIDAutorTipoDoc,
        modelo,
        gettingProgress,
        loadingModelos
    };
};

export default useModelosPecaService;
