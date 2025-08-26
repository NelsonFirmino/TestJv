import { SetStateAction } from "react";
import { ProcessoInAction } from "../../../../../../../api/services/attorneys/attorneys.interface";

export interface AtuacaoProps {
    currentTable: "ATUACAO" | "INACAO" | "REDISTRIBUICAO" | "INFO" | "INGRESSO";
    setCurrenteTable: React.Dispatch<SetStateAction<"ATUACAO" | "INACAO" | "REDISTRIBUICAO" | "INFO" | "INGRESSO">>;
    data: ProcessoInAction[];
    isLoading: boolean;
}