export interface CustomTableProps {
  columns: Column[];
  data: any[];
  possibleDataKeyToBeNull?: PossibleNullData[];
  isLoading: boolean;
  showSelectNumberOfRows: boolean;
  showTodayButton?: boolean;
  showClearButton?: boolean;
  showPagination: boolean;
  tableFontSize?: string;
  maxButtonPagination?: number;
  showSearchField: boolean;
  selectRows?: boolean;
  onlyShowTableIfData?: boolean;
  tootTipSearcField?: string;
  defaultSortKeyColumn?: {
    key: string;
    direction: "descending" | "ascending";
  };
  pdfButton?: {
    nameFile: string;
  };
  csvButton?: {
    nameFile: string;
  };
  selectDataColumnButton?: {
    onlyCurrentPage?: boolean;
    columns: {
      name: string;
      key: string;
      formatDate?: boolean;
      rangePredefinedValues?: boolean;
      orderByDate?: boolean;
    }[];
  };
  requestPagination?: {
    page: number;
    pageSize: number;
    totalItens: number;
  };
  keySelectData?: "ATUACAO" | "INACAO" | "REDISTRIBUICAO";
}

type NotBothTrue<T, U> = T extends true ? (U extends true ? never : U) : U;

interface BaseColumn {
  name: any;
  isSortable: boolean;
  keyData: string;
  switchContentToRight?: boolean;
  includeDateTimeKey?: string;
  component?: Component;
  breakTextOnFirstColumn?: boolean;
}

interface ColumnWithDate extends BaseColumn {
  formatToDate: true;
  formatToCurrency?: NotBothTrue<true, false>;
}
interface ColumnWithBoolean extends BaseColumn {
  formatToDate?: false;
  formatToCurrency?: false;
}

interface ColumnWithCurrency extends BaseColumn {
  formatToDate?: NotBothTrue<true, false>;
  formatToCurrency: true;
}

interface ColumnWithoutFormat extends BaseColumn {
  formatToDate?: false;
  formatToCurrency?: false;
}

interface Component {
  element: (item: any) => React.ReactElement;
  isButton: boolean;
}

export type Column =
  | ColumnWithDate
  | ColumnWithCurrency
  | ColumnWithBoolean
  | ColumnWithoutFormat;

interface PossibleNullData {
  key: string;
  fallback: string;
}

export interface SortStateProps {
  key: string;
  keyTime?: string;
  direction: string;
}
