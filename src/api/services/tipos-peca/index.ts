import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { TipoModeloPecaI } from "./interfaces";

const useTiposPecaService = () => {
    const [tipos, setTipos] = useState<TipoModeloPecaI[]>();

    const getTipos = () =>
        new Promise(
            async (
                resolve: (res: TipoModeloPecaI[]) => void,
                reject: (res: string) => void
            ) => {
                try {
                    const data = await axiosInstance.get(
                        `/api/v1.0/tipos-peca?pageSize=100` //`/api/v1.0/tipos-peca?pageSize=100`
                    );

                    setTipos(data.data.data);
                    resolve(data.data.data);
                } catch (err) {
                    reject("error");
                }
            }
        );

    return { getTipos, tipos };
};

export default useTiposPecaService;
