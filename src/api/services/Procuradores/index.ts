import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { ProcuradorI } from "../Procurador/interface";

const useProcuradoresService = () =>
{
    const [procuradores, setProcuradores] = useState<ProcuradorI[]>([])

    const getProcuradores = () =>
        new Promise(
            async (
                resolve: (res: string) => void,
                reject: (res: string) => void
            ) => {
                // string url = string.Format("{0}/v1.0/procuradores?pageSize=250", URL_SERVICE);
                try {
                    const procuradores = await axiosInstance.get(
                        `/api/v1.0/procuradores?pageSize=250`
                    );
                    setProcuradores(procuradores.data.data);
                    resolve("ok");
                }
                catch (err) {
                    reject(err as any);
                }
            }
        );

    return { procuradores, getProcuradores }
}

export default useProcuradoresService