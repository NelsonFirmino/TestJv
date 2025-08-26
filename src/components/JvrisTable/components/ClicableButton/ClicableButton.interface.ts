export interface subOptionsI {
    text: string;
    onClick: (index?: number) => void;
}

export interface JvrisClicableButtonI {
    onClick?: (index?: number) => void;
    subOptions?: subOptionsI[][];
    text?: string;
    index?: number;
}
