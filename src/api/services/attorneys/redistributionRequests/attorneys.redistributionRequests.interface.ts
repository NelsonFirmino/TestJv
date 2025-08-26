export interface GetAttorneyRedistributionRequestsResponse {
    status: string;
    message: string;
    data: AttorneyRedistributionRequestsDataI[];
}
export interface AttorneyRedistributionRequestsDataI {
    id: number;
    idDistribuicaoAntiga: number;
    idEspecializada: number;
    txEspecializadaDestino: string;
    txProcuradorDestino: string;
    dtCadastro: string;
    hrCadastro: string;
    idUsuarioCadastro: number;
    txUsuarioSolicitante: string;
    txEspecializadaSolicitante: string;
    idMotivo: number;
    txMotivo: string;
    idProcesso: number;
    txNumeroFormatado: string;
    dtPrazo: string;
    txObservacao: string;
    txStatusCadastroAto: string;
}
