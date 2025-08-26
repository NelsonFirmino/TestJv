import { ProcessoI } from "../../../../../../api/services/Processos/interface";

export interface ProcessoContextI {
    toogleMostrarDadosProcesso: () => void;
    updateProcesso: () => void;
    mostrarDadosProcesso: boolean;
    processo: ProcessoI;
}

export interface SingleProcessoI {
    id: number;
    txNumeroFormatado: string;
    txNumero: string;
    txTipo: string;
    idSistemaProcessual: number;
    idTribunal: number;
    nuInstancia: number;
    vaProcesso: number;
    txRelevancia: string;
    idAto: number;
    isFisico: boolean;
    dtCadastro: string;
    hrCadastro: string;
    idUsuarioCadastro: number;
    txUsuario: string;
    idPeca: number;
    idDespacho: number;
    txAssunto: string;
    txSistemaProcessual: string;
    txTribunal: string;
    txSigla: string;
    relevancias: any[];
}
