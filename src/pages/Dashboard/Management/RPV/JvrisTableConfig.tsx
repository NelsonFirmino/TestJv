import { Circle } from "@phosphor-icons/react";
import { JvrisTableColumnNDataI } from "../../../../components/JvrisTable/JvrisTable.interface";
import { subOptionsI } from "../../../../components/JvrisTable/components/ClicableButton/ClicableButton.interface";

export const Columns: JvrisTableColumnNDataI[] = [
    { text: "Número do Processo" },
    { text: "Distribuição" },
    { text: "Assunto(s)" },
    {
        customComponent: (
            <Circle alt="Relevância do ato" size={14} weight="fill" />
        ),
        text: "Relevância do ato"
    },
    { text: "Valor" }
];

export function SubOptions({
    EditarProcesso,
    RegistrarObservacao,
    SolicitarRedis,
    Despacho
}: {
    EditarProcesso?: (index: number) => void;
    RegistrarObservacao?: (index: number) => void;
    SolicitarRedis: (index: number) => void;
    Despacho?: (index: number) => void;
    }): subOptionsI[][] {
    const clicableButtonSubOptions: subOptionsI[][] = [
        [
            {
                text: "Despacho",
                onClick: (index) => {
                    if (index != undefined && Despacho)
                        Despacho(index);
                }
            },
            {
                text: "Editar Processo",
                onClick: (index) => {
                    if (index != undefined && EditarProcesso)
                        EditarProcesso(index);
                }
            },
            {
                text: "Registrar Observação",
                onClick: (index) => {
                    if (index != undefined && RegistrarObservacao)
                        RegistrarObservacao(index);
                }
            },
            {
                text: "Solicitar Redistribuição",
                onClick: (index) => {
                    if (index != undefined && SolicitarRedis)
                        SolicitarRedis(index);
                }
            }
        ]
    ];

    return clicableButtonSubOptions;
}
