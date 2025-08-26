export interface tableContentsSwitcherInterface {
	switchers: switcherInterface[];
	containerStyle?: React.CSSProperties;
	currentSelected: number;
	setCurrentSelected: React.Dispatch<
		React.SetStateAction<number>
	>;
	clickReset?: boolean;
	resetSelected?: () => void;
	onSwitch?: () => void;
}

export interface switcherInterface {
	name: string;
	amount?: number;
	onClick?: () => void;
}
