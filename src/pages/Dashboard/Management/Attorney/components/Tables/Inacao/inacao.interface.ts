import { SetStateAction } from "react";
import { Inaction } from "../../../../../../../api/services/attorneys/attorneys.interface";

export interface InacaoProps {
    currentTable: "ATUACAO" | "INACAO" | "REDISTRIBUICAO" | "INFO" | "INGRESSO";
    setCurrenteTable: React.Dispatch<SetStateAction<"ATUACAO" | "INACAO" | "REDISTRIBUICAO" | "INFO" | "INGRESSO">>;
    data: Inaction[];
    isLoading: boolean;
}