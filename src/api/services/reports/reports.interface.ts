export interface GetRPVReportsParams {
  dtInicio: Date;
  dtFim: Date;
  txCpfCnpj: string;
  txProcesso: string;
  txTipo: string;
  isHonorarios: string;
  idOrigem: string;
  idNatureza: string;
  idEspecializada: string;
  isCiencia?: any;
  exportar?: any;
}

export interface GetRPVReportsResponse {
  status: string;
  message: string;
  data: {
    txDescricao: string;
    file_stream: string;
    txTipoArquivo: "application/pdf" | "text/csv";
  };
}

export interface GetProcessReportsParams {
  dtInicioCadastroAto?: Date;
  dtFimCadastroAto?: Date;
  tipoProcesso?: string;
  idTribunal?: string;
  idSistemaProcessual?: string;
  isAtosConcluidos?: boolean;
  isDistribuicaoAtualAto?: boolean;
  assuntos?: string;
  especializadasDistribuidas?: string;
  anoCadastroPJE?: string;
  vaProcessoInicio: string;
  vaProcessoFim?: string;
  dtInicioDistribuicao?: Date;
  dtFimDistribuicao?: Date;
}

export interface GetProcessReportsResponse {
  status: string;
  message: string;
  data: {
    txDescricao: string;
    file_stream: string;
    txTipoArquivo: "application/pdf";
  };
}

export interface GetErgonFinanceiroParams {
  nuMatricula?: string;
  nuVinculo?: string;
  idUsuario?: string;
  dtInicio: string;
  dtFim: string;
}
export interface GetErgonFinanceiroResponse {
  status: string;
  message: string;
  data: Ergon[];
}

export interface Ergon {
  id: number;
  idErgonServidor: number;
  dtFolha: string;
  dtDireito: string;
  txFolha: string;
  nuRubrica: number;
  nuTipoRubrica: number;
  nuDescontoVantagem: number;
  vaRubrica: number;
  isConsulta: boolean;
  dtCadastro: string;
  hrCadastro: string;
  dtInicio: string;
  dtFim: string;
  txRubrica: string;
}

export interface GetOperatorProductivityParams {
  dtInicio: string;
  dtFim: string;
  idSetor?: string;
}

export interface GetOperatorProductivityResponse {
  status: string;
  message: string;
  data: OperatorProductivity;
}

interface OperatorProductivity {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: "application/pdf";
}

export interface GetProcessesQuantityByDeadlineParams {
  dtInicio: string;
  dtFim: string;
  idProcurador?: string;
  idEspecializada?: string;
  idSecretaria: string;
  isEspecializadasFilhas?: boolean;
}
export interface GetProcessesQuantityByDeadlineResponse {
  status: string;
  message: string;
  data: ProcessesQuantityDeadline;
}
interface ProcessesQuantityDeadline {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: "application/pdf";
}

export interface GetQuantityFinishedPiecesParams {
  dtInicio: string;
  dtFim: string;
  idEspecializada?: string;
  idProcurador?: string;
}
export interface GetQuantityFinishedPiecesResponse {
  status: string;
  message: string;
  data: QuantityFinishedPieces;
}
interface QuantityFinishedPieces {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: "application/pdf";
}

export interface GetAuditParams {
  dtInicioCadastro: string;
  dtFimCadastro: string;
  dtInicioCiencia: string;
  dtFimCiencia: string;
  isAssuntosDistribuidos?: boolean;
}
export interface GetAuditResponse {
  status: string;
  message: string;
  data: Audit;
}
interface Audit {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: "application/pdf";
}

export interface GetAdvisorProductivityParams {
  dtInicio: string;
  dtFim: string;
  idProcurador?: string;
  idAssessor?: string;
}

export interface GetAdvisorProductivityResponse {
  status: string;
  message: string;
  data: AdvisorProductivity;
}

interface AdvisorProductivity {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: "application/pdf";
}

export interface GetAttorneyProductivityParams {
  dtInicio: string;
  dtFim: string;
  idProcurador?: string;
}

export interface GetAttorneyProductivityMonthParams {
  nuMes: string;
  nuAno: string;
  idProcurador?: string;
}

export interface GetAttorneyProductivityYearParams {
  nuAno: string;
  idProcurador?: string;
}

export interface GetAttorneyProductivityResponse {
  status: string;
  message: string;
  data: AttorneyProductivity;
}

interface AttorneyProductivity {
  txDescricao: string;
  file_stream: string;
  txTipoArquivo: string;
}
