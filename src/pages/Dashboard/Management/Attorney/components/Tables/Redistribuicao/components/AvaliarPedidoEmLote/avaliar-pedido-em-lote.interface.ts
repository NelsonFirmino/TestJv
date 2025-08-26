export interface SubmitAvaliarPedidoEmLote {
    idEspecializada: { label: string; value: number } | null;
    idProcurador: { label: string; value: number } | null;
    txObservacao: string;
}