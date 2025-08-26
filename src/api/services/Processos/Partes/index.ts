import axiosInstance from "../../../axiosInstance";
import { useState } from "react";
import { ParteI } from "./interfaces";

const usePartesService = () => {
    const [partes, setPartes] = useState<ParteI[]>([]);

    const get = (processoId: number) =>
        new Promise(
            async (
                resolve: (res: ParteI[]) => void,
                reject: (res: string) => void
            ) => {
                try {
                    const parts = await axiosInstance.get(
                        `/api/v1.0/Processos/${processoId}/partes`
                    );

                    setPartes(parts.data.data);
                    resolve(parts.data.data as ParteI[]);
                } catch (err) {
                    reject(err as any);
                }
            }
        );

    return { get, partes };
};

export default usePartesService;
