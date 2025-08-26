export interface SubmitUpdateDataProcess {
  idProcesso: number;
  idAto: number;
  txNumeroMandadoSeguranca: string;
  txNumeroFormatado: string;
  dtAtualizacaoValor: string;
  txOrgao: string;
  txVara: string;
  nuAutores: number;
  txAutor: string;
  vaTotal: number;
  txReu: string;
  dtPrazoProcurador: string;
  dtPrazoDCJE: string;
  idProcurador: {
    label: string;
    value: number;
  };
  txFaseProcessual: {
    label: string;
    value: string;
  };
  idRazaoPedido: {
    label: string;
    value: number;
  };
  txBaseIncidencia?: {
    label: string;
    value: string;
  };
  dtAjuizamento: string;
  dtCitacao: string;
  dtTransitoJulgado?: string;
  dtAposentadoria?: string;
  nuHonorariosPercentual?: number;
  vaHonorariosFixos?: number;
  txMatricula?: string;
  dtFixacao?: string;
  txIndiceJuros: {
    label: string;
    value: string;
  };
  txTermoJurosMora?: {
    label: string;
    value: string | null;
  };
  txIndiceCorrecao?: {
    label: string;
    value: string;
  };
  txObservacaoJurosMora?: string;
  txObservacaoCorrecao?: string;
  txOrientacaoCalculo: string;
  txObservacoesGerais?: string;
  lsArquivos?: any;
}
