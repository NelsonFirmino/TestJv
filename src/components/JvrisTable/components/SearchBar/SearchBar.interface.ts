export interface JvrisSearchBarI {
    onChange: (value: string) => void;
    value: string;
}

export interface ButtonMainTextI {
    children?: React.ReactNode;
    onChange: () => void;
}
