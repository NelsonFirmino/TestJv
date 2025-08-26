export interface ContentParagraphProps {
    bold?: boolean;
}
export interface OptionsType {
    value: string;
    label: string;
    isFixed: boolean;
    isSelected: boolean;
}
export interface SelectI {
    value: string | number;
    label: string;
}

export interface StdState {
    generalData?: SelectI[];
    selected?: number;
}
