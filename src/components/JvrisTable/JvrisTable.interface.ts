import React from "react";
import { JvrisClicableButtonI } from "./components/ClicableButton/ClicableButton.interface";
import { JvrisGenericButtonI } from "./components/GenericButton/GenericButton.interface";

export interface JvrisTableColumnNDataI {
	customComponent?: React.ReactNode;
	text: string;
	onClick?: (index: number) => void;
	dataName?: string;
}

export interface JvrisTableDataI {
	data: JvrisTableColumnNDataI[];
	id: number;
}
interface ColumnDefaultOrderI{
	columnIndex?: number;
	columnName?: string;
	order:'ascendente'|'descendente';
}
export interface JvrisTableI {
	columnDefaultOrder?: ColumnDefaultOrderI;
	hasData?: boolean;
	columnFilter?: boolean;
	columns: JvrisTableColumnNDataI[];
	data: JvrisTableColumnNDataI[][];
	ClicableButton?: JvrisClicableButtonI;
	GenericButton?: JvrisGenericButtonI[];
	GenericButtonOnSpecificLines?: JvrisGenericButtonI[][];
	Searchable?: boolean;
	maxRows?: boolean;
	CustomClicable?: (index: number) => React.ReactNode;
	ShowSelect?: boolean;
	TableStyle?: React.CSSProperties;
	TableContainerStyle?: React.CSSProperties;
	autoPrimaryColumn?: boolean;
	//maxRows?: number;
	//rowsPerPage?: number[];
	reducedColumns?: number[];
	minWidthToCollapse?: string | number;
	maxHeigthToCollapse?: string | number;
	onSelectedRows?: (selectedRows: number[]) => void;
	download?: boolean;
	loading?:{
		loadingData: boolean;
		loadingStatus: string;
	}
	reSeed?:()=>void;
}
