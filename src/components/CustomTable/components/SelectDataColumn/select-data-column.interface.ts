import { SetStateAction } from "react";

export interface SelectDataColumnProps {
  columns: Colum[];
  data: any[];
  filterDataBySelectValueColumn: {
    label: any;
    keyData: any;
    index: number;
    type: string;
  }[];
  setFilterDataBySelectValueColumn: React.Dispatch<
    SetStateAction<{ label: any; keyData: any; index: number; type: string }[]>
  >;
  onClick?: () => void;
}

interface Colum {
  name: string;
  key: string;
  formatDate?: boolean;
  orderByDate?: boolean;
  rangePredefinedValues?: boolean;
}
