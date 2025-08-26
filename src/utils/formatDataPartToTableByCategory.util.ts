export interface Process {
  id: number;
  idProcesso: number;
  idParte: number;
  txParte: string;
  txNumeroProcesso: string;
  nuInstancia: number;
  parte: Parte;
  txPolo: string;
  isPrincipal: boolean;
  totalProcessos: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

interface Parte {
  id: number;
  txParte: string;
  txTipoPessoa: string;
  txCpfCnpj: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

export const formatDataPartToTableByCategory = (
  process: Process[],
  category: string
) => {
  const formatedPart = process.filter((part) => part.txPolo === category);
  return formatedPart;
};
