import { Circle, User } from "@phosphor-icons/react";
import { JvrisTableColumnNDataI } from "../../../../components/JvrisTable/JvrisTable.interface";
import { line_attorney_dashnoard_table } from "../../../../components/JvrisTable/Helpers/utils";

export const JvrisTableColumns: JvrisTableColumnNDataI[] = [
    { text: "Número do Processo" },
    { text: "Assunto(s)" },
    { text: "Valor do Processo (R$)" }
];

export const processNumberOptions = [
    { value: "0818620-37.2022.8.20.5106	", label: "0818620-37.2022.8.20.5106	" },
    { value: "0804734-53.2018.8.20.5124", label: "0804734-53.2018.8.20.5124" },
    { value: "0801489-73.2022.8.20.5001", label: "0801489-73.2022.8.20.5001" },
    { value: "0824038-82.2019.8.20.5001", label: "0824038-82.2019.8.20.5001" },
    { value: "0832482-02.2022.8.20.5001", label: "0832482-02.2022.8.20.5001" },
    { value: "0850475-63.2019.8.20.5001", label: "0850475-63.2019.8.20.5001" },
    { value: "0832669-44.2021.8.20.5001", label: "0832669-44.2021.8.20.5001" },
    { value: "0843280-66.2015.8.20.5001", label: "0843280-66.2015.8.20.5001" },
    { value: "0802191-26.2021.8.20.5107", label: "0802191-26.2021.8.20.5107" },
    { value: "0862652-88.2021.8.20.5001", label: "0862652-88.2021.8.20.5001" }
];

export const JvrisTableData: JvrisTableColumnNDataI[][] = [
    line_attorney_dashnoard_table({
        Head: {
            numero: {
                value: 43906624497857,
                title: "Espelho do processo"
            }
        },
        Body: [
            {
                value: "Levantamento de Valor; Tratamento Médico-Hospitalar e/ou Fornecimento de Medicamentos"
            },
            { value: "1.000,00" }
        ]
    }),
    line_attorney_dashnoard_table({
        Head: {
            numero: {
                value: 92836624490934,
                title: "Espelho do processo"
            }
        },
        Body: [
            {
                value: "Levantamento de Valor; Tratamento Médico-Hospitalar e/ou Fornecimento de Medicamentos"
            },
            { value: "5.000,00" }
        ]
    })
];

//Tabela Observações
export const JvrisTableColumnsObs: JvrisTableColumnNDataI[] = [
    { text: "Operador" },
    { text: "Data do Cadastro" },
    { text: "Observação" }
];

export const JvrisTableDataObs: JvrisTableColumnNDataI[][] = [
    line_attorney_dashnoard_table({
        Head: {
            numero: {
                value: "Jvris Perfil Procurador"
            }
        },
        Body: [
            {
                value: "31/05/2023"
            },
            { value: "Levantamento de Valor; Tratamento Médico-Hospitalar" }
        ]
    })
];

//Tabela Vinculações
export const JvrisTablesColumnsConnections: JvrisTableColumnNDataI[] = [
    { text: "Número do Processo" },
    { text: "Assunto(s)" },
    { text: "Valor" }
];

export const JvrisTableDataConnections: JvrisTableColumnNDataI[][] = [
    line_attorney_dashnoard_table({
        Head: {
            numero: {
                value: 43906624497857,
                title: "Espelho do processo"
            }
        },
        Body: [
            {
                value: "Levantamento de Valor; Tratamento Médico-Hospitalar e/ou Fornecimento de Medicamentos"
            },
            { value: "1.000,00" }
        ]
    })
];

//Tabela Atos e Tramitação
export const JvrisTablesColumnsAt: JvrisTableColumnNDataI[] = [
    { text: "Data" },
    { text: "Tipo" },
    { text: "Descrição" }
];

export const JvrisTablesColumnsAtosTramitacao: JvrisTableColumnNDataI[] = [
    { text: "Aviso" },
    { text: "Órgão Julgador" },
    { text: "Relevância" },
    { text: "Secretaria" },
    { text: "Especializada" },
    { text: "Ciência" },
    { text: "Prazo" },
    { text: "Distribuição" },
    { text: "Procurador" }
];

export const JvrisTableDataAt: JvrisTableColumnNDataI[][] = [
    line_attorney_dashnoard_table({
        Head: {
            numero: {
                value: 13336883
            }
        },
        Body: [
            {
                value: "1ª Vara da Comarca de Ceará-Mirim"
            },
            { value: "NORMAL" },
            { value: "SECRETARIA GERAL" },
            { value: "CONTENCIOSO" },
            { value: "30/05/2023" },
            { value: "---" },
            { value: "30/05/2023" },
            { value: "Jvris Perfil Procurador" }
        ]
    })
];

//Tabela Atos e Tramitação
export const JvrisTablesColumnsPrev: JvrisTableColumnNDataI[] = [
    { text: "Data" },
    { text: "Tipo" },
    { text: "Descrição" },
    { text: "Info" }
];

export const JvrisTableDataPrev: JvrisTableColumnNDataI[][] = [
    line_attorney_dashnoard_table({
        Head: {
            numero: {
                value: "30/05/2023"
            }
        },
        Body: [
            { value: "AÇÃO DE ALIMENTOS DE INFÂNCIA E JUVENTUDE" },
            {
                value: "TEREZA CRISTINA RAMALHO TEIXEIRA REGISTROU DESPACHO INAÇÃO"
            }
        ]
    }),
    line_attorney_dashnoard_table({
        Head: {
            numero: {
                value: "30/05/2023"
            }
        },
        Body: [
            { value: "AÇÃO DE ALIMENTOS DE INFÂNCIA E JUVENTUDE" },
            { value: "TEREZA CRISTINA RAMALHO TEIXEIRA DISTRIBUIU DE INAÇÃO" }
        ]
    }),
    line_attorney_dashnoard_table({
        Head: {
            numero: {
                value: "30/05/2023"
            }
        },
        Body: [
            { value: "AÇÃO DE ALIMENTOS DE INFÂNCIA E JUVENTUDE" },
            { value: "TEREZA CRISTINA RAMALHO TEIXEIRA IMPORTOU INAÇÃO" }
        ]
    }),
    line_attorney_dashnoard_table({
        Head: {
            numero: {
                value: "30/05/2023"
            }
        },
        Body: [
            { value: "AÇÃO DE ALIMENTOS DE INFÂNCIA E JUVENTUDE" },
            {
                value: "TEREZA CRISTINA RAMALHO TEIXEIRA REGISTROU DESPACHO DE INAÇÃO"
            }
        ]
    }),
    line_attorney_dashnoard_table({
        Head: {
            numero: {
                value: "30/05/2023"
            }
        },
        Body: [
            { value: "AÇÃO DE ALIMENTOS DE INFÂNCIA E JUVENTUDE" },
            {
                value: "TEREZA CRISTINA RAMALHO TEIXEIRA REGISTROU DESPACHO DE INAÇÃO"
            }
        ]
    })
];
