import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { ProcessoI } from "./interface";

const useProcessosService = () => {
    const [processo, setProcesso] = useState<ProcessoI>();
    const [processos, setProcessos] = useState<ProcessoI[]>([]);

    const getAll = () =>
        new Promise(
            async (
                resolve: (res: any) => void,
                reject: (res: string) => void
            ) => {
                try {
                    //console.log('getAll');
                    const res = await axiosInstance.get("/api/v1.0/Processos");
                    //console.log('res', res.data.data);
                    setProcessos(res.data.data);
                    resolve(res.data.data);
                } catch (err) {
                    reject(err as any);
                }
            }
        );

    const get = (processoId: number) =>
        new Promise(
            async (
                resolve: (res: any) => void,
                reject: (res: string) => void
            ) => {
                try {
                    const res = await axiosInstance.get(
                        `/api/v1.0/Processos/${processoId}`
                    );

                    setProcesso(res.data.data);
                    resolve(res.data.data);
                } catch (err) {
                    reject(err as any);
                }
            }
        );


    const autoComplete = (processoId: string) =>
        new Promise(
            async (
                resolve: (res: any) => void,
                reject: (res: string) => void
            ) => {
                try {
                    // http://nucleo.pge.rn.gov.br/jvris-api/api/v1.0/Processos/autocomplete?txNumero=43234&page=1&pageSize=10
                    const res = await axiosInstance.get(
                        `/api/v1.0/Processos/autocomplete?txNumero=${processoId}&page=1&pageSize=10`
                    );
                    
                    setProcessos(res.data.data);
                    resolve(res.data.data);

                } catch (err) {
                    reject(err as any);
                }
            }
        );



    return { get,getAll, processo, autoComplete, processos };
};

export default useProcessosService;
