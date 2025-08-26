import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { agendaSemanalI } from "./interface";

const useDashboardsService = () => {
    const [agendasSemanais, setAgendasSemanais] = useState<agendaSemanalI[]>();

    const getAgendasSemanais = () =>
        new Promise(
            async (
                resolve: (res: string) => void,
                reject: (res: string) => void
            ) => {
                {
                    try {
                        const data = await axiosInstance.get(
                            `/api/v1.0/Dashboards/agenda-semanal/semanas`
                        );
                        const agendasSem = data.data.data.sort(
                            (a: agendaSemanalI, b: agendaSemanalI) => {
                                if (a.nuSemana < b.nuSemana) {
                                    return -1;
                                }
                                if (a.nuSemana > b.nuSemana) {
                                    return 1;
                                }
                                return 0;
                            }
                        );
                        setAgendasSemanais(agendasSem);
                        resolve(agendasSem);
                    } catch (err) {
                        reject(err as any);
                    }
                }
            }
        );

    return { getAgendasSemanais, agendasSemanais };
};

export default useDashboardsService;
