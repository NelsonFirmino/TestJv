export interface GetRespostaDcjeParams {
  id: number;
}

export interface GetRespostaDcjeResponse {
  status: string;
  message: string;
  data: RespostaDcje;
}

interface RespostaDcje {
  id: number;
  idDistribuicao: number;
  idFichaProcessual: number;
  dtDistribuicao: string;
  dtResposta: string;
  txNumeroFormatado: string;
  nuAutores: number;
  txFaseProcessual: string;
  txRazaoPedido: string;
  dtPrazoDCJE: string;
  dtPrazoProcurador: string;
  dtCadastro: string;
  vaTotal: number;
  vaCalculado: number;
  vaDivergencia: number;
  txObservacao: string;
  txDivergencias: string;
  idProcesso: number;
  idAnexo: number;
  isValorApurado: boolean;
  isEncerrado: boolean;
}

// _____________________________________________
// Arquivos

export interface GetArquivosResponse {
  status: string;
  message: string;
  data: Arquivos;
}

export interface Arquivos {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}

// _____________________________________________
// Anexos

export interface GetAnexosResponse {
  status: string;
  message: string;
  url?: string;
  data: Anexos[];
}

export interface Anexos {
  id: number;
  idResposta: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  stream_id: string;
  file_stream: string;
  name: string;
  url?: string;
}

// _____________________________________
// Cálculos

export interface GetCalculosParams {
  id: number;
}

export interface GetCalculosResponse {
  status: string;
  message: string;
  data: Calculos[];
}

export interface Calculos {
  id?: number;
  idFichaProcessual: number;
  txTipoCalculo: string;
  idParte: number;
  nuMatricula?: number;
  nuVinculo?: number;
  dtCorrecaoMonetaria?: string;
  dtJurosMora?: string;
  dtPrescricao?: string;
  vaExecucao?: number;
  dtAtualizacaoValor?: string;
  idRazaoPedido: number;
  nuQtdMeses?: number;
  nuQtdDias?: number;
  idResposta: number;
  dtCadastro?: string;
  hrCadastro?: string;
  idUsuarioCadastro?: number;
  txParte?: string;
  txNumeroFormatado?: string;
  idProcesso?: number;
  isComPlanilha?: number;
  vaResultadoTotal?: number;
  txRazaoPedido?: string;
  idAto?: number;
  dtFimUrv?: string;
  isFerias?: boolean;
  isDecimoTerceiro?: boolean;
  vaUrvMarco94?: number;
}

// Post

export interface PostCalculosResponse {
  status: string;
  message: string;
  data: PostCalculos;
}

export interface PostCalculos {
  id?: number;
  idFichaProcessual: number;
  txTipoCalculo: string;
  idParte: number;
  nuMatricula?: number;
  nuVinculo?: number;
  dtCorrecaoMonetaria?: string;
  dtJurosMora?: string;
  dtPrescricao?: string;
  vaExecucao?: number;
  dtAtualizacaoValor?: string;
  idRazaoPedido: number;
  nuQtdMeses?: number;
  nuQtdDias?: number;
  idResposta: number;
  dtCadastro?: string;
  hrCadastro?: string;
  idUsuarioCadastro?: number;
  txParte?: string;
  txNumeroFormatado?: string;
  idProcesso?: number;
  isComPlanilha?: number;
  vaResultadoTotal?: number;
  txRazaoPedido?: string;
  idAto?: number;
  dtFimUrv?: string;
  isFerias?: boolean;
  isDecimoTerceiro?: boolean;
  vaUrvMarco94?: number;
}

export interface PostCalculoFinanceiroResponse {
  status: string;
  message: string;
  data: PostCalculoFinanceiro;
}

export interface PostCalculoFinanceiro {
  id?: number;
  idCalculo: number;
  dtBase: string;
  idErgonRubrica: number;
  vaDevido: number;
  vaRecebido: number;
  vaDiferneca?: number;
  dtCadastro?: string;
  hrCadastro?: string;
  idUsuarioCadastro: number;
  nuRubrica?: number;
}

export interface PostCalculoPlanilhaParams {
  id: number;
  idCalculo: number;
  dtBase?: string;
  vaBaseMes?: number;
  vaBaseTotal?: number;
  vaIndiceCorrecao?: number;
  vaIndiceTr?: number;
  vaIndiceIpca?: number;
  vaIndiceJuros?: number;
  vaCorrecaoMonetaria?: number;
  vaJurosMora?: number;
  vaAtualizado?: number;
  dtCadastro?: string;
  hrCadastro?: string;
  idUsuarioCadastro?: number;
  isComResultado?: number;
}
export interface PostCalculoPlanilhaResponse {
  status: string;
  message: string;
  data: PostCalculoPlanilha[];
}

export interface PostCalculoPlanilha {
  id: number;
  idCalculo: number;
  dtBase: string;
  vaBaseMes: number;
  vaBaseTotal: number;
  vaIndiceCorrecao: number;
  vaIndiceTr: number;
  vaIndiceIpca: number;
  vaIndiceJuros: number;
  vaCorrecaoMonetaria: number;
  vaJurosMora: number;
  vaAtualizado: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  isComResultado: number;
  vaIndiceSelic: number;
  vaSelic: number;
}

export interface PostCalculoResultadoParams {
  id: number;
  idCalculo: number;
  vaCalculado?: number;
  vaIndiceCorrecaoHonorario?: number;
  vaHonorario?: number;
  vaResultadoTotal?: number;
  txObservacao?: string;
  txDivergencias?: string;
  idContadorResponsavel?: number;
  idUsuarioCadastro?: number;
  vaExecucao?: number;
  vaBaseMes?: number;
  vaBaseTotal?: number;
  vaCorrecaoMonetaria?: number;
  vaJurosMora?: number;
  isEncerrado?: boolean;
  idResposta?: number;
}
export interface PostCalculoResultadoResponse {
  status: string;
  message: string;
  data: PostCalculoResultado;
}

export interface PostCalculoResultado {
  id: number;
  idCalculo: number;
  vaCalculado?: number;
  vaIndiceCorrecaoHonorario?: number;
  vaHonorario?: number;
  vaResultadoTotal?: number;
  idContadorResponsavel?: number;
  idUsuarioCadastro?: number;
  vaExecucao?: number;
  vaBaseMes?: number;
  vaBaseTotal?: number;
  vaCorrecaoMonetaria?: number;
  vaJurosMora?: number;
  isEncerrado?: boolean;
  idResposta?: number;
}

export interface PostCalculoEnquadramentoParams {
  id: number;
  idCalculo: number;
  dtInicio: string;
  dtFim?: string;
  txReferencia?: string;
  idErgonRubrica?: number;
  idErgonCargoFuncao?: number;
  nuJornada?: number;
  vaPercentual?: number;
  vaFixo?: number;
  idUsuarioCadastro?: number;
  idErgonCategoria?: number;
}
export interface PostCalculoEnquadramentoResponse {
  status: string;
  message: string;
  data: PostCalculoEnquadramento;
}

export interface PostCalculoEnquadramento {
  id: number;
  idCalculo: number;
  dtInicio: string;
  dtFim?: string;
  idErgonRubrica?: number;
  idErgonCargoFuncao?: number;
  txReferencia?: string;
  nuJornada?: number;
  vaPercentual?: number;
  vaFixo?: number;
  dtCadastro?: string;
  hrCadastro?: string;
  idUsuarioCadastro?: number;
  nuRubrica?: number;
  idErgonCategoria?: number;
}

export interface PutCalcularEnquadramentoDevidoParams {
  idCalculo: number;
  idUsuario: number;
}

export interface PutCalcularEnquadramentoDevidoResponse {
  status: string;
  message: string;
}

// Delete Calculo

export interface DeleteCalculoResponse {
  status: string;
  message: string;
}

export interface DeleteCalculoFinanceiroResponse {
  status: string;
  message: string;
}
export interface DeleteCalculoPlanilhaResponse {
  status: string;
  message: string;
}

//Base de Calculo

export interface BaseDeCalculoResponse {
  status: string;
  message: string;
  data: BaseDeCalculo[];
}

export interface BaseDeCalculo {
  id: number;
  idCalculo: number;
  dtBase: string;
  idErgonRubrica: number;
  vaDevido: number;
  vaRecebido: number;
  vaDiferneca: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txRubrica: string;
  nuRubrica: number;
}

export interface ErgonServidorFinanceiroPorCalcResponse {
  status: string;
  message: string;
  data: ErgonServidorFinanceiroPorCalc;
}

export interface ErgonServidorFinanceiroPorCalc {
  id: number;
  idErgonServidor: number;
  dtFolha: string;
  dtDireito: string;
  nuRubrica: number;
  nuTipoRubrica: number;
  nuDescontoVantagem: number;
  vaRubrica: number;
  isConsulta: boolean;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  dtInicio: string;
  dtFim: string;
}

// Planilha de Calculo

export interface PlanilhaDeCalculoResponse {
  status: string;
  message: string;
  data: PlanilhaDeCalculo[];
}

export interface PlanilhaDeCalculo {
  id: number;
  idCalculo: number;
  dtBase: string;
  vaBaseMes: number;
  vaBaseTotal: number;
  vaIndiceCorrecao: number;
  vaIndiceTr: number;
  vaIndiceIpca: number;
  vaIndiceJuros: number;
  vaCorrecaoMonetaria: number;
  vaJurosMora: number;
  vaAtualizado: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  isComResultado: number;
}

// Resultado do Cálculo

export interface ResultadoDoCalculoResponse {
  status: string;
  message: string;
  data: ResultadoDoCalculo;
}

export interface ResultadoDoCalculo {
  id: number;
  idCalculo: number;
  vaCalculado: number;
  vaIndiceCorrecaoHonorario: number;
  vaHonorario: number;
  vaResultadoTotal: number;
  txObservacao: string;
  txDivergencias: string;
  idContadorResponsavel: number;
  idUsuarioCadastro: number;
  dtCadastro: string;
  hrCadastro: string;
  vaExecucao: number;
  vaBaseMes: number;
  vaBaseTotal: number;
  vaCorrecaoMonetaria: number;
  vaJurosMora: number;
  isEncerrado: boolean;
  idResposta: number;
}

// Resposta DCJE Calculado

export interface RespostaDcjeCalculadoResponse {
  status: string;
  message: string;
  data: RespostaDcjeCalculado;
}

export interface RespostaDcjeCalculado {
  id: number;
  idDistribuicao: number;
  idFichaProcessual: number;
  dtDistribuicao: string;
  dtResposta: string;
  nuAutores: number;
  dtPrazoDCJE: string;
  dtPrazoProcurador: string;
  dtCadastro: string;
  vaTotal: number;
  vaCalculado: number;
  vaDivergencia: number;
  txDivergencias: string;
  idAnexo: number;
  isValorApurado: boolean;
  isEncerrado: boolean;
}

// Calculos DCJE

export interface CalculosDCJEResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: CalculosDCJE[];
}

export interface CalculosDCJE {
  id: number;
  idFichaProcessual: number;
  txTipoCalculo: string;
  idParte: number;
  nuMatricula: number;
  nuVinculo: number;
  dtCorrecaoMonetaria: string;
  dtJurosMora: string;
  dtPrescricao: string;
  vaExecucao: number;
  dtAtualizacaoValor: string;
  idRazaoPedido: number;
  nuQtdMeses: number;
  nuQtdDias: number;
  idResposta: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txParte: string;
  txNumeroFormatado: string;
  idProcesso: number;
  isComPlanilha: number;
  vaResultadoTotal: number;
  txRazaoPedido: string;
  idAto: number;
  dtFimUrv: string;
  isFerias: boolean;
  isDecimoTerceiro: boolean;
  vaUrvMarco94: number;
}

// Relatorio Calculo

export interface ResultadoDoCalculoRelatorioResponse {
  status: string;
  message: string;
  data: ResultadoDoCalculoRelatorio;
}

export interface ResultadoDoCalculoRelatorio {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}

// Ergon Rubrica

export interface ErgonRubricaResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: ErgonRubrica[];
}

export interface ErgonRubrica {
  id: number;
  nuRubrica: number;
  txRubrica: string;
  txAbreviatura: string;
  isIrrf: boolean;
  isPrevidencia: boolean;
  txTipoRubrica: string;
  nuTipoCalculo: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

export interface ErgonCategoriaSubcategoriaResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  nextPage: number;
  totalItens: number;
  data: ErgonCategoriaSubcategoria[];
}

export interface ErgonCategoriaSubcategoria {
  id: number;
  nuCodigoCargoFuncao: number;
  idErgonCategoria: number;
  txSubcategoria: string;
  txCategoria: string;
}

export interface ErgonCargoFuncaoResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: ErgonCargoFuncao[];
}

export interface ErgonCargoFuncao {
  id?: number;
  nuCodigoCargoFuncao?: number;
  txCargoFuncao?: string;
  idErgonCategoria?: number;
  txSubcategoria?: string;
  txTipoCargoFuncao?: string;
  txEscolaridade?: string;
  txCategoria?: string;
}

export interface CalculoEnquadramentoResponse {
  status: string;
  message: string;
  data: CalculoEnquadramento[];
}

export interface CalculoEnquadramento {
  id: number;
  idCalculo: number;
  dtInicio: string;
  dtFim: string;
  idErgonRubrica: number;
  idErgonCargoFuncao: number;
  txReferencia: string;
  nuJornada: number;
  vaPercentual: number;
  vaFixo: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txRubrica: string;
  nuRubrica: number;
  txCargoFuncao: string;
  txSubcategoria: string;
  idErgonCategoria: number;
  txCategoria: string;
}

export interface ErgonServidorResponse {
  status: string;
  message: string;
  firstPage: number;
  lastPage: number;
  totalItens: number;
  data: ErgonServidor[];
}

export interface ErgonServidor {
  id: number;
  idParte: number;
  txCpf: string;
  nuMatricula: number;
  nuVinculo: number;
  txNome: string;
  dtAdmissao: string;
  dtAposentadoria: string;
  dtDesligamento: string;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

export interface ErgonServidorHistoricoResponse {
  status: string;
  message: string;
}

export interface CalcFinancUrvByIdResponse {
  status: string;
  message: string;
  data: CalcFinancUrvById[];
}

export interface CalcFinancUrvById {
  id: number;
  idCalculo: number;
  nuAno: number;
  idSipRubrica: number;
  nuIncidencia: number;
  vaJaneiro: number;
  vaFevereiro: number;
  vaMarco: number;
  vaAbril: number;
  vaMaio: number;
  vaJunho: number;
  vaJulho: number;
  vaAgosto: number;
  vaSetembro: number;
  vaOutubro: number;
  vaNovembro: number;
  vaDezembro: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
  txSipRubrica: string;
}

//URV

export interface PostCalculoUrvParams {
  id: number;
  idCalculo?: number;
  idUsuarioCadastro?: number;
  nuAno?: number;
  idSipRubrica?: number;
  nuIncidencia?: number;
  vaJaneiro?: number;
  vaFevereiro?: number;
  vaMarco?: number;
  vaAbril?: number;
  vaMaio?: number;
  vaJunho?: number;
  vaJulho?: number;
  vaAgosto?: number;
  vaSetembro?: number;
  vaOutubro?: number;
  vaNovembro?: number;
  vaDezembro?: number;
}

export interface PostCalculoUrvResponse {
  status: string;
  message: string;
  data: PostCalculoUrv;
}

export interface PostCalculoUrv {
  id: number;
  idCalculo: number;
  nuAno: number;
  idSipRubrica?: number;
  nuIncidencia?: number;
  vaJaneiro: number;
  vaFevereiro: number;
  vaMarco: number;
  vaAbril: number;
  vaMaio: number;
  vaJunho: number;
  vaJulho: number;
  vaAgosto: number;
  vaSetembro: number;
  vaOutubro: number;
  vaNovembro: number;
  vaDezembro: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}

//SIP

export interface ImportarSipResponse {
  status: string;
  message: string;
  data: ImportarSip[];
}

export interface ImportarSip {
  id: number;
  idCalculo: number;
  nuAno: number;
  idSipRubrica: number;
  nuIncidencia: number;
  vaJaneiro: number;
  vaFevereiro: number;
  vaMarco: number;
  vaAbril: number;
  vaMaio: number;
  vaJunho: number;
  vaJulho: number;
  vaAgosto: number;
  vaSetembro: number;
  vaOutubro: number;
  vaNovembro: number;
  vaDezembro: number;
  dtCadastro: string;
  hrCadastro: string;
  idUsuarioCadastro: number;
}
