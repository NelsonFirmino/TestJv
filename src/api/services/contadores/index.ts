import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { ContadorI } from "./interface";

const useContadoresService = () =>
{
    const [contadores, setContadores] = useState<ContadorI[]>([])

    const getContadores = () =>
        new Promise(
            async (
                resolve: (res: string) => void,
                reject: (res: string) => void
            ) => {
                try {
                    const contadores = await axiosInstance.get(
                        `/api/Contadores`
                    );
                    setContadores(contadores.data.data);
                    resolve("ok");

                }
                catch (err) {
                    reject(err as any);
                }
            }
        );

    return { contadores, getContadores }
}

export default useContadoresService