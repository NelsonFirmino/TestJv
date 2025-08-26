export interface SubmitSolicitacaoInfo {
    id: number;
    idEspecializada: { label: string; value: number } | null;
    idProcurador: number;
    txDescricao: string;
    idAto: number;
    idUsuarioCadastrado: number;
}
