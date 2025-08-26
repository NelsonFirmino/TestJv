export interface OptionProps {
  setSideBarOpen: (isSideBarOpen: boolean) => void;
  isSideBarOpen: boolean;
  data: Option;
  selectedOption: number;
  handleSelectedOption: (id: number) => void;
}

export interface Option {
  id: number;
  txMenu: string;
  txPagina: string;
  txIcone: string;
  nuOrdem: number;
  isOculto: boolean;
  listMenuFilhos: SubOption[];
}

interface SubOption {
  id: number;
  txMenu: string;
  txPagina: string;
  txIcone: string;
  nuOrdem: number;
  isOculto: boolean;
  idMenu_Pai: number;
  listMenuFilhos: any[];
}
