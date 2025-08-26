export interface GetAttorneyProcessesInOperationParams {
    id: string;
    dtPrazoInicial?: string;
    dtPrazoFinal?: string;
}

export interface GetAttorneyProcessesInOperationResponse {
    status: string;
    message: string;
    data: AttorneyProcessesInOperationDataI[];
}
export interface AttorneyProcessesInOperationDataI {
    id: number;
    idDistribuicao: number;
    idProcesso: number;
    idExecucao: number;
    idPeca: number;
    idFichaProcessual: number;
    idRespostaFichaProcessual: number;
    txNumero: string;
    idAssessor: number;
    dtDataHoraEnvio: string;
    dtPrazo: string;
    dtDistribuicao: string;
    nuOrdemPrazo: number;
    txAssunto: string;
    txEspecializada: string;
    hasPecaFinalizada: boolean;
    txRelevancia: string;
    idDespacho: number;
    isDespachoRecusado: boolean;
    isFichaProcessualDevolvida: boolean;
    idSolicitacaoInformacao: number;
    idSolicitacaoInformacaoResposta: number;
    idRedistribuicao: number;
    isRedistribuicaoRecusada: boolean;
    txUltimaObservacao: string;
    isUrgente: boolean;
    txStatusCadastroAto: string;
    txAssessor: string;
}
