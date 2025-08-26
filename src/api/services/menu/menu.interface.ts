export interface MenuParams {
  id?: number;
}

export interface MenuProfileResponse {
  data: Menu[];
}

export interface MenuResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  totalItens: number;
  data: Menu[];
}

export interface Menu {
  id: number;
  txMenu: string;
  txPagina: string;
  txIcone: string;
  nuOrdem: number;
  isOculto: boolean;
  listMenuFilhos: ListMenuFilho[];
  idMenu_Pai?: number;
}

export interface ListMenuFilho {
  id: number;
  txMenu: string;
  txPagina: string;
  txIcone: string;
  nuOrdem: number;
  isOculto: boolean;
  idMenu_Pai: number;
  listMenuFilhos: any[];
}
