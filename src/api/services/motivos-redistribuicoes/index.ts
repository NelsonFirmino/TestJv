import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { MotivosRedistribuicoesServiceI } from "./interface";

const useMotivosRedistribuicoesService = () => {
    const [motivosRedistribuicoes, setMotivosRedistribuicoes] =
        useState<MotivosRedistribuicoesServiceI>();

    async function get() {
        try {
            const res = await axiosInstance.get(
                "/api/v1.0/motivos-redistribuicoes?pageSize=250"
            );

            setMotivosRedistribuicoes(res.data.data);
        } catch (err) {
        }
    }

    return { get, motivosRedistribuicoes };
};

export default useMotivosRedistribuicoesService;
