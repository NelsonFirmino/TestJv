import { AxiosResponse } from "axios";
import {
    AnexoI,
    AtoDetalhadoI,
    PecaFinalizadaI
} from "../../../../../../api/services/atos/atos.interface";
import { ModeloPecaI } from "../../../../../../api/services/modelos-peca/interfaces";
import {
    AnexoPecaI,
    PecaI
} from "../../../../../../api/services/pecas/interfaces";
import { TiposProcessoPJEI } from "../../../../../../api/services/processos-pje/interface";
import { ProcessoI } from "../../../../../../api/services/Processos/interface";
import { ParteI } from "../../../../../../api/services/Processos/Partes/interfaces";

export interface ModelTypeSelectI {
    value: number;
    label: string;
}

export interface PecasContextI {
    modelTypeFilter: ModelTypeSelectI;
    currModel: ModeloPecaI;
    modelTitle: string;
    modelos: ModeloPecaI[];
    tiposProcessoPJE: TiposProcessoPJEI[];
    modelo: ModeloPecaI;
    recPeca: any;
    idAto: number;
    finlPeca: any;
    loadingTiposProcessoPJE: boolean;
    loadingModelosPecas: boolean;
    anexosPeca: AnexoPecaI[];
    anexosAto: AnexoI[];
    partes: ParteI[];
    anexosResposta: any[];
    prepareModelList: (modelsList: ModeloPecaI[]) => any;
    prepareModelListUser: (modelsList: ModeloPecaI[]) => any;
    prepareModelTypeList: (modelsList: TiposProcessoPJEI[]) => any;
    updateModelTypeFilterValue: (value: ModelTypeSelectI) => void;
    updateCurrModel: (model: ModeloPecaI) => void;
    SalvarComoModelo: (text: string) => any;
    updateTitle: (value: string) => void;
    SalvarPeca: (text: string, onSaveCallback?: () => void) => any;
    EnviarParaPJE: (text: string, pdf: boolean) => any;
    FinalizarPeca: (Callback?: () => void) => any;
    updateFinalPeca: (value: PecaI) => void;
    updateModelo: (model: ModeloPecaI) => Promise<AxiosResponse<any, any>>;
    ConcluirAtuacao: (Callback?: () => void) => any;
    AnexarArquivo: (
        tipoDoc: number,
        anexBase64: string,
        onSucess: () => void
    ) => any;
    pecasFinalizadas: PecaFinalizadaI[];
    getPecasFinalizadas: (idAto: number) => Promise<any[]>;
    getAto: (id: number) => Promise<AtoDetalhadoI>;
    seed: () => void;
    seed2: () => void;

    idProcesso: number;
    getProcesso: (processoId: number) => Promise<any>;
    processo: ProcessoI;
    getModeloById: ({ id }: { id: number }) => Promise<ModeloPecaI>;
}
