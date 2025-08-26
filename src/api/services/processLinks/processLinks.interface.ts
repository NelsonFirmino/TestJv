export interface GetProcessLinksResponse {
  status: string;
  message: string;
  data: Link[];
}

interface Link {
  id: number;
  txNumeroFormatado: string;
  idSistemaProcessual: number;
  vaProcesso: number;
  txRelevancia: string;
  isFisico: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  idPeca: number;
  idDespacho: number;
  txAssunto: string;
  relevancias: any[];
}
