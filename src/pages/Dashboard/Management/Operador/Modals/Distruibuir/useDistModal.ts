import { useEffect, useState } from "react";
import axiosInstance from "../../../../../../api/axiosInstance";
import useProcuradorService from "../../../../../../api/services/Procurador";
import { ProcuradorI } from "../../../../../../api/services/Procurador/interface";
import { useOperadorContext } from "../../context";
import { EspecializadasI } from "./modaladd.interface";

const useDistModal = () => {
    const { get: getProcuradores, procuradores } = useProcuradorService();
    const [especializadas, setEspecializadas] = useState<EspecializadasI[]>();
    const { secretaria } = useOperadorContext();
    const [selectedEspecializada, setSelectedEspecializada] =
        useState<EspecializadasI>(undefined);
    const [selectedProcurador, setSelectedProcurador] =
        useState<ProcuradorI>(undefined);
    const [obs, setObs] = useState<string>("");

    useEffect(() => {
        async function getEspecializadas() {
            try {
                const esps = await axiosInstance.get(
                    `/api/v1.0/secretarias/${secretaria}/especializadas`
                );

                setEspecializadas(esps.data.data);
            } catch (err) {
                console.error(err);
            }
        }
        if (secretaria) getEspecializadas();
    }, [secretaria]);

    useEffect(() => {
        if (especializadas) {
            setSelectedEspecializada(especializadas[0]);
        }
    }, [especializadas]);

    useEffect(() => {
        if (selectedEspecializada) {
            getProcuradores(selectedEspecializada.id);
        }
    }, [selectedEspecializada]);
    return {
        especializadas,
        procuradores,
        selectedEspecializada,
        setSelectedEspecializada,
        selectedProcurador,
        setSelectedProcurador,
        obs,
        setObs
    };
};

export default useDistModal;
