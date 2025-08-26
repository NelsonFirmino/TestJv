import { AttorneyRedistributionRequestsDataI } from "../../../../../../../api/services/attorneys/redistributionRequests/attorneys.redistributionRequests.interface";
import { line_attorney_dashnoard_table } from "../../../../../../../components/JvrisTable/Helpers/utils";
import { JvrisTableColumnNDataI } from "../../../../../../../components/JvrisTable/JvrisTable.interface";

export const redistributionRequestsColumns: JvrisTableColumnNDataI[] = [
    { text: "Número do Processo" },
    { text: "Solicitante" },
    { text: "Especializada do Solicitante" },
    { text: "Motivo" },
    { text: "Observação" },
    { text: "Especializada Destino" },
    { text: "Procurador Destino" },
    { text: "Data Pedido" },
    { text: "Data Prazo" }
];

export function ParseToJvrisRedistributionRequests(
    data: AttorneyRedistributionRequestsDataI[] | undefined
) {
    if (!data) return [] as JvrisTableColumnNDataI[][];
    const JvrisTableData = data.map((objData) => {
        return line_attorney_dashnoard_table({
            Head: {
                numero: {
                    value: objData.txNumeroFormatado
                },
                cadastro: {
                    value:
                        objData.txStatusCadastroAto == "A"
                            ? "automaticamente"
                            : "manualmente"
                },
                copy: {
                    value: true
                }
            },
            Body: [
                { value: objData.txUsuarioSolicitante },
                { value: objData.txEspecializadaSolicitante },
                { value: objData.txMotivo },
                { value: objData.txObservacao },
                { value: objData.txEspecializadaDestino },
                { value: objData.txProcuradorDestino },
                { value: objData.dtCadastro.split("-").reverse().join("/") },
                { value: objData.dtPrazo.split("-").reverse().join("/") }
            ]
        });
    });
    return JvrisTableData;
}
