export interface PrintTableToPDFButtonProps {
  fileName: string;
  columns: Colum[];
  data: any[];
}

interface Colum {
  name: string;
  key: string;
  formatToDate?: boolean;
  formatToCurrency?: boolean;
}
