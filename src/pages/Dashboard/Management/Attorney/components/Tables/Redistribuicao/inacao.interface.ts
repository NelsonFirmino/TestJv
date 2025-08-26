import { SetStateAction } from "react";
import { Redistribution } from "../../../../../../../api/services/attorneys/attorneys.interface";

export interface RedistribuicaoProps {
    currentTable: "ATUACAO" | "INACAO" | "REDISTRIBUICAO" | "INFO" | "INGRESSO";
    setCurrenteTable: React.Dispatch<SetStateAction<"ATUACAO" | "INACAO" | "REDISTRIBUICAO" | "INFO" | "INGRESSO">>;
    data: Redistribution[];
    isLoading: boolean;
}