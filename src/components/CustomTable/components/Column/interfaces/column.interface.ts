export interface ColumnCustomTableProps {
  name: string;
  isSortable?: boolean;
  sortConfig: SortStateProps;
  setSortConfig: (props: SortStateProps) => void;
  defaultSortKeyColumn?: string;
  keyData: string;
  keyTime?: string;
  selectRows: boolean;
  index: number;
  showShadow?: boolean,
  switchContentToRight?: boolean;
  breakTextOnFirstColumn?: boolean;
}

interface SortStateProps {
  key: string;
  keyTime?: string;
  direction: string;
}
