import { useState, createContext, useContext } from "react";
import { AttorneyProcessesInOperationDataI } from "../../../../../../api/services/attorneys/processesInOperation/attorneys.processesInOperation.interface";
import { PrazosContextI } from "./interface";

const PrazosContext = createContext<PrazosContextI>({} as any);

export const PrazosProvider = (props: any) => {
    const [processosVencendoHoje, setProcessosVencendoHoje] = useState<
        AttorneyProcessesInOperationDataI[]
    >([]);
    const [processosVencendoAmanha, setProcessosVencendoAmanha] = useState<
        AttorneyProcessesInOperationDataI[]
    >([]);
    const [processosVencendoNessaSemana, setProcessosVencendoNessaSemana] =
        useState<AttorneyProcessesInOperationDataI[]>([]);

    function updateProcessos(
        data: AttorneyProcessesInOperationDataI[],
        when = "hoje" || "amanha" || "essaSemana"
    ) {
        if (when === "hoje") setProcessosVencendoHoje(data);
        if (when === "amanha") setProcessosVencendoAmanha(data);
        if (when === "essaSemana") setProcessosVencendoNessaSemana(data);
    }

    return (
        <PrazosContext.Provider
            value={{
                processosVencendoHoje,
                processosVencendoAmanha,
                processosVencendoNessaSemana,
                updateProcessos
            }}
        >
            {props.children}
        </PrazosContext.Provider>
    );
};

export const usePrazosContext = () => {
    const context = useContext(PrazosContext);
    if (!context) {
        throw new Error(
            "usePrazosContext must be used within a PrazosProvider"
        );
    }
    return context;
};
