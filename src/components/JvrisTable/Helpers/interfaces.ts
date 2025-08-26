import { ProcessOptionsI } from "../components/ProcessoOptions/ProcessoOptions.interfaces";

export interface line_attorney_dashnoard_tableI {
	Head?: ProcessOptionsI;
	Body: AttorneyDashnoardBodyI[];
}
export interface line_attorney_dashnoard_table2I {
	Head: {
		component: React.ReactNode;
		text: string;
	};
	Body: AttorneyDashnoardBodyI[];
}

export interface AttorneyDashnoardBodyI {
	value: string | number;
	component?: React.ReactNode;
	design?: DesignedComponentsI;
	dataName?: string;
}

export interface DesignedComponentsI {
	name:
		| "PecaCadastrada"
		| "RelevanciaAto"
		| "userIcon"
		| "CustomStatus"
		| "CustomCadastro"
		| "CustomSigilo";
	color?: string;
	backgroundColor?: string;
}
