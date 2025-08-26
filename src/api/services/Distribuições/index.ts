import axiosInstance from "../../axiosInstance";
import { useState } from "react";
import { DistribuiçõesI } from "./interfaces";

const useDistribuicoesService = () => {
    const [distribuicao, setDistribuicao] = useState<DistribuiçõesI>();

    async function get(idTriagem: number) {
        try {
            const res = await axiosInstance.get(
                `/api/v1.0/Distribuicoes/${idTriagem}`
            );
            const { data } = res;
            setDistribuicao(data.data);
            return Promise.resolve("ok");
        } catch (err) {
            return Promise.reject("error");
        }
    }

    return { get, distribuicao };
};

export default useDistribuicoesService;
