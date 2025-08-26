import { AxiosResponse } from "axios";

export interface PedidoRedistribuicaoServiceI {
    idProcurador: number;
    idEspecializada: number;
    idMotivo: number;
    idDistribuicaoAntiga: number;
    idUsuarioCadastro: number;
    txObservacao: string;
}
export interface PedidoRedistResI extends AxiosResponse {}
