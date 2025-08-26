import { JvrisTableDataI, JvrisTableI } from "../JvrisTable.interface";

export interface RowslimitI {
	value: string | number | undefined;
	label: string;
}

export interface selectedRowsI {
	rows: number[];
	all: boolean;
	pageOnly?: boolean;
}

export interface JvrisTableContextI {
	//states
	sortColumnIndex: number;
	setSortColumnIndex: React.Dispatch<React.SetStateAction<number>>;
	sortAscending: number;
	setSortAscending: React.Dispatch<React.SetStateAction<number>>;
	currentData: JvrisTableDataI[];
	setCurrentData: React.Dispatch<React.SetStateAction<JvrisTableDataI[]>>;
	tablePageIndexes: any[];
	setTablePageIndexes: React.Dispatch<React.SetStateAction<any[]>>;
	dataCopy: JvrisTableDataI[];
	setDataCopy: React.Dispatch<React.SetStateAction<JvrisTableDataI[]>>;
	tablePage: number;
	setTablePage: React.Dispatch<React.SetStateAction<number>>;
	rowsPerPage: number[];
	limitedRows: number;
	setLimitedRows: React.Dispatch<React.SetStateAction<number>>;
	pagesArray: number[];
	setPagesArray: React.Dispatch<React.SetStateAction<number[]>>;
	rowsLimit: RowslimitI;
	setRowsLimit: React.Dispatch<React.SetStateAction<RowslimitI>>;
	maxRows: number;
	setMaxRows: React.Dispatch<React.SetStateAction<number>>;
	tablePageNumber: number[][];
	setTablePageNumber: React.Dispatch<React.SetStateAction<number[][]>>;
	searchFilter: string;
	setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
	limitedRowsPerPage: RowslimitI[];
	setLimitedRowsPerPage: React.Dispatch<React.SetStateAction<RowslimitI[]>>;
	selectedRows: selectedRowsI | undefined;
	toogleAllSelected: () => void;
	selectRow: (rowIndex: number) => void;
	setSubMenuOpen: React.Dispatch<React.SetStateAction<number>>;
	subMenuOpen: number;
	setTableWidth: React.Dispatch<React.SetStateAction<number>>;
	tableWidth: number;
	setClikedRow: React.Dispatch<React.SetStateAction<number>>;
	clikedRow: number;
	setShowFullTabela: React.Dispatch<React.SetStateAction<boolean>>;
	showFullTabela: boolean;
	actualTableWidth: number;
	setActualTableWidth: React.Dispatch<React.SetStateAction<number>>;
	// functions
	filterDataByColumn: (columnIndex: number) => void;
	sortDataByColumn: (columnIndex: number, ascending: number) => void;
	onChangeRowLimit: (selected: any) => void;
	setDownloadingPDFCSV: React.Dispatch<React.SetStateAction<boolean>>;
	downloadingPDFCSV: boolean;
	dataByColumn: string[][];
	filterDataByMany: (filter: string[]) => void;
	setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
	selectedFilters: string[];
	// props
	TableProps: JvrisTableI;
}

export interface JvrisTableProviderI extends JvrisTableI {
	children: React.ReactNode;
}
