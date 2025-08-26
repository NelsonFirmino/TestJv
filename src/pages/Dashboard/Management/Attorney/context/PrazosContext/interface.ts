import { AttorneyProcessesInOperationDataI } from "../../../../../../api/services/attorneys/processesInOperation/attorneys.processesInOperation.interface";

export interface PrazosContextI {
    processosVencendoHoje: AttorneyProcessesInOperationDataI[];
    processosVencendoAmanha: AttorneyProcessesInOperationDataI[];
    processosVencendoNessaSemana: AttorneyProcessesInOperationDataI[];
    updateProcessos: (
        data: AttorneyProcessesInOperationDataI[],
        when: "hoje" | "amanha" | "essaSemana"
    ) => void;
}
