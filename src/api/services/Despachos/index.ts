import axiosInstance from "../../axiosInstance";
import { ConcluirParamsI } from "./interfaces";

const useDespachosService = () => {
    async function concluir(params: ConcluirParamsI) {
        try {
            const res = await axiosInstance.post(`/api/v1.0/Despachos`, params);

            return res.data;
        } catch (err) {
            return err as any;
        }
    }

    return { concluir };
};

export default useDespachosService;
