import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { acatarPostI } from "./interface";

const useRedistribuiçõesService = () => {
    const [redistribuicoes, setRedistribuicoes] = useState<any>();

    const acatarPedido = (data: acatarPostI) =>
        new Promise(
            async (
                resolve: (res: string) => void,
                reject: (res: string) => void
            ) => {
                {
                    try {
                        const res = await axiosInstance.post(
                            `/api/v1.0/redistribuicoes/${data.id}/acato-chefia`,
                            data
                        );

                        resolve(res.data);
                    } catch (err) {
                        reject(err as any);
                    }
                }
            }
        );

    return { acatarPedido };
};

export default useRedistribuiçõesService;
