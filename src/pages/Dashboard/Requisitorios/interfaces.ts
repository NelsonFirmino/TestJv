export interface CreateInfoParamsI {
    processo: string;
    vara: string;
    tribunal: string;
}

export interface CreateSelectParamsI {
    devedor: SelectI[];
    requisitor: SelectI[];
    naturezaDespesa: SelectI[];
}

export interface CreateSelect2ParamsI {
    origemDespesa: SelectI[];
    limitePagamento: string;
    valor: string;
}

export interface SelectsI {
    label: string;
    data: SelectI[];
    obrigatory?: boolean;
    handle: (value: any) => void;
}

export interface SelectI {
    label: string;
    value: any;
}

export interface ErrorsTriggerI{
    requisitor: boolean;
        devedor: boolean;
        naturezaDespesa: boolean;
        origemDespesa: boolean;
        tipo: boolean;
        limitePag: boolean;
        valor: boolean;
}
