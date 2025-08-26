export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  changePage: (number: number) => void;
  setSelectedDataTable: (array: any[]) => void;
  totalRows: number;
  rowsPerPage: number;
  maxButtons?: number;
  sortableDataCount?: number;
  requestPagination?: {
    status: string;
    message: string;
    firstPage: number;
    lastPage: number;
    nextPage: number;
    totalItens: number;
  };
}
