interface subOptionsI {
	text: string;
	onClick: () => void;
}

export interface ButtonMainTextI {
	children?: React.ReactNode;
	hoverColor?: string;
	onClick: () => void;
}

export interface JvrisGenericButtonI {
	onClick?: (index?: number) => void;
	subOptions?: subOptionsI[][];
	icon?: React.ReactNode;
	text?: string;
	hoverColor?: string;
	backColor?: string;
	alt?: string;
	children?: React.ReactNode;
}
