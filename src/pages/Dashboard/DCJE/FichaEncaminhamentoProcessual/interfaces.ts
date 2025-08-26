import { UseMutationResult } from "react-query";
import {
    GetProceduralRecordDCJEDataByActIdResponse,
    ProvisoryPutProceduralRecordMulti
} from "../../../../api/services/dcje/actsDCJE/actsDCJE.interface";

export interface fichaDCJEI {
    id?: number;
    idProcesso: number;
    idAto: number;
    idRazaoPedido: number;
    txOrgao: string;
    txVara: string;
    txNumeroMandadoSeguranca: string;
    txAutor: string;
    txReu: string;
    nuAutores: number;
    vaTotal: number;
    dtAtualizacaoValor: string;
    idProcurador: number;
    dtPrazoProcurador: string;
    dtPrazoDCJE: string;
    txFaseProcessual: string;
    dtAjuizamento: string;
    dtCitacao: string;
    nuHonorariosPercentual: number;
    vaHonorariosFixos: number;
    //txIndiceCorrecao: string;
    //txIndiceJuros: string;
    lsFichasProcessuaisParametrosCalculo: FichasProcessuaisParametrosCalculo[];
    // txTermoJurosMora: string;
    //txObservacaoCorrecao: string;
    //txObservacaoJurosMora: string;
    txOrientacaoCalculo: string;
    idDistribuicao: number;
    dtCadastro: string;
    hrCadastro: string;
    idUsuarioCadastro: number;
    lsArquivos: {};
    txNumeroFormatado: string;
    txTipoProcesso: string;
    idResposta: number;
    vaDivergencia: number;
    isEncerrado: boolean;
    isDevolvido: boolean;
    idDevolucao: number;
    dtTransitoJulgado: string;
    dtAposentadoria: string;
    txBaseIncidencia: string;
    dtFixacao: string;
    txMatricula: string;
    txObservacoesGerais: string;
    // txObsJurosMora: string;
}

export interface FichasProcessuaisParametrosCalculo {
    id: number;
    idFichaProcessual: number;
    txTipo: string; //Correção monetária
    txIndice: string; //Juros de mora
    txObservacao: string; //Observação sobre os juros de mora
    dtInicio: string;
    dtFim: string;
}

export interface SelectOption {
    label: string;
    value: number | string;
}

export interface InputsI {
    informacoesCadastrais: Partial<InformacoesCadastrais>;
    informacoesDist: Partial<InformacoesDist>;
    razaoPedido: Partial<RazaoPedido>;
    dadosColAutos: Partial<DadosColAutos>;
    paramsCorreMoneJuros: Partial<FichasProcessuaisParametrosCalculo>[];
    orientacaoCalc: Partial<OrientacaoCalc>;
    arquivos: Arquivos;
}

export interface Arquivos {
    lsArquivos: {};
}

export interface OrientacaoCalc {
    txOrientacaoCalculo: string;
    txObservacoesGerais: string;
}

export interface DadosColAutos {
    dtAjuizamento: string;
    dtCitacao: string;
    dtTransitoJulgado: string;
    dtAposentadoria: string;
    vaHonorariosFixos: number;
    txBaseIncidencia: string;
    dtFixacao: string;
    nuHonorariosPercentual: number;
    txMatricula: string;
}

export interface RazaoPedido {
    idRazaoPedido: number;
}

export interface InformacoesCadastrais {
    txNumeroMandadoSeguranca: string;
    txAutor: string;
    txReu: string;
    nuAutores: number;
    vaTotal: number;
    dtAtualizacaoValor: string;
}

export interface InformacoesDist {
    idProcurador: number;
    dtPrazo: string;
    txFaseProcessual: string;
    dtPrazoDCJE: string;
}

export interface FEPContextI {
    fichaDCJE: Partial<fichaDCJEI> | undefined;
    defaultDate: string;
    actId: string;
    inputs: {
        values: InputsI | undefined;
        forceUpdateInput(inputsToChange: Partial<InputsI>): void;
        updateInputs: (inputsToChange: Partial<InputsI>) => void;
    };

    formatarNumero: (numero: any) => string;
    submit: () => void;
    putProceduralRecord: UseMutationResult<
        GetProceduralRecordDCJEDataByActIdResponse,
        unknown,
        ProvisoryPutProceduralRecordMulti,
        unknown
    >;
    postProceduralRecord: UseMutationResult<
        GetProceduralRecordDCJEDataByActIdResponse,
        unknown,
        ProvisoryPutProceduralRecordMulti,
        unknown
    >;
    noFicha: boolean;
}
