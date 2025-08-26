export interface GetActsAndProcedure {
  status: string;
  message: string;
  data: Act[];
}

export interface Act {
  id: number;
  idProcesso: number;
  txNumeroFormatado: string;
  txAssunto: string;
  txRelevancia: string;
  txValor: string;
  txClasse: string;
  txSistemaProcessual: string;
  nuCodigoAviso: number;
  txOrgaoJulgador: string;
  txTribunal: string;
  txSiglaTribunal: string;
  dtCiencia: string;
  dtPrazo: string;
  idTriagem: number;
  txSecretaria: string;
  dtCadastro: string;
  dtDistribuicao?: string;
  txUsuario: string;
  isImportado: boolean;
  idEspecializada: number;
  txEspecializada: string;
  idProcurador: number;
  txProcurador?: string;
  idRedistribuicao: number;
  isUrgente: boolean;
  txStatusCadastroAto: string;
  txStatusRedistribuicaoAto: string;
}
