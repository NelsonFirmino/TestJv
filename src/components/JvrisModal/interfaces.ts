export interface LabelInterface {
    fontSize?: string;
    fontColor?: string;
    fontWeight?: string;
}

export interface TextAreaInterface {
    height?: string;
}

export interface ButtonInterface {
    buttonColor?: string;
    fontColor?: string;
    hoverColor?: string;
    width?: string;
}

export interface SelectInterface {
    width?: string;
}

export type ConditionalLabel = {
    value: boolean | undefined;
};
