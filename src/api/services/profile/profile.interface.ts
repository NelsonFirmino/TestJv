export interface GetProfileMenusParams {
  profileId: number;
}

export interface GetProfileMenusResponse {
  status: string;
  message: string;
  data: MenuProfile[];
}

export interface MenuProfile {
  id: number;
  txMenu: string;
  txPagina: string;
  txIcone: string;
  nuOrdem: number;
  isOculto: boolean;
  listMenuFilhos: MenuFilho[];
}

interface MenuFilho {
  id: number;
  txMenu: string;
  txPagina: string;
  txIcone: string;
  nuOrdem: number;
  isOculto: boolean;
  idMenu_Pai: number;
  listMenuFilhos: any[];
}
