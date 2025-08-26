import { JvrisTableColumnNDataI } from "../../../../../../../components/JvrisTable/JvrisTable.interface";
import { line_attorney_dashnoard_table } from "../../../../../../../components/JvrisTable/Helpers/utils";

import {
    CalcStatus,
    convertDateFormat2
} from "../../../../../../../utils/Date.utils";
import { AtosFisicosConcluidosI, } from "./interfaces";

export const Columns: JvrisTableColumnNDataI[] = [
    { text: "Número do Processo" },
    { text: "Procurador" },
    { text: "Tribunal" },
    { text: "Órgão Julgador" },
    { text: "Conclusão" },
    { text: "Prazo" },
    { text: "Relevância" },
];

export function ParseToJvrisTable(
    data: AtosFisicosConcluidosI[] | undefined
) {
    if (!data) return [] as JvrisTableColumnNDataI[][];
    const JvrisTableData = data.map((ObjData) => {
        return line_attorney_dashnoard_table({
            Head: {
                numero: {
                    value: ObjData.txNumeroFormatado,

                },
                cadastro: {
                    value:
                        ObjData.txStatusCadastroAto == "A"
                            ? "automaticamente"
                            : "manualmente"
                },

                copy: {
                    value: true
                },

            },
            Body: [

                { value: ObjData.txProcurador },
                { value: ObjData.txTribunal ? ObjData.txTribunal : "--" },
                { value: ObjData.txOrgaoJulgador ? ObjData.txOrgaoJulgador : "--" },
                { value: convertDateFormat2(ObjData?.dtConclusao) },
                { value: ObjData.dtPrazo ? convertDateFormat2(ObjData?.dtPrazo) : "--" },
                {
                    value: ObjData.txRelevancia,

                    dataName: "Relevancia"
                }
            ]
        });
    });
    return JvrisTableData;


}
