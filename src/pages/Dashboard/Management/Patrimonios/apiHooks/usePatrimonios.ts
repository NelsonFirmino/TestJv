import axiosInstance from "../../../../../api/axiosInstance";
import { PatrimonioI } from "../interfaces";

interface getPatrimoniosParams {
    page?: number;
    pageSize?: number;
}

export const getBeneficiarios = () =>
    new Promise(
        async (resolve: (res: any) => void, reject: (res: string) => void) => {
            try {
                const res = await axiosInstance.get(
                    `/api/v1.0/Patrimonio/recuperar/beneficiarios`
                );

                if (res.data.data) {
                    resolve(res.data.data);
                }
                reject("Erro ao buscar beneficiários");
            } catch (err) {
                reject(err);
            }
        }
    );

export const getPatrimonios = (params: getPatrimoniosParams) =>
    new Promise(
        async (
            resolve: (res: PatrimonioI[]) => void,
            reject: (res: string) => void
        ) => {
            const { page = 1, pageSize = 100 } = params;
            try {
                const res = await axiosInstance.get(
                    `/api/v1.0/Patrimonio?page=${page}&pageSize=${pageSize}`
                );

                if (res.data.data) {
                    resolve(res.data.data);
                }
                reject("Erro ao buscar patrimônios");
            } catch (err) {
                reject(err);
            }
        }
    );

export const getPatrimonio = (id: string) =>
    new Promise(
        async (
            resolve: (res: PatrimonioI) => void,
            reject: (res: string) => void
        ) => {
            try {
                const res = await axiosInstance.get(
                    `/api/v1.0/Patrimonio/${id}`
                );

                if (res.data.data) {
                    resolve(res.data.data);
                }
                reject("Erro ao buscar patrimônio");
            } catch (err) {
                reject(err);
            }
        }
    );

export const putPatrimonio = (body: PatrimonioI) =>
    new Promise(
        async (
            resolve: (res: PatrimonioI) => void,
            reject: (res: string) => void
        ) => {
            console.log("body", body);
            try {
                const res = await axiosInstance.put(
                    `/api/v1.0/Patrimonio/${body.id}`,
                    body
                );

                if (res.data.data) {
                    resolve(res.data.data);
                }
                reject("Erro ao atualizar patrimônio");
            } catch (err) {
                reject(err);
            }
        }
    );

export const postPatrimonio = (body: any) =>
    new Promise(
        async (
            resolve: (res: PatrimonioI) => void,
            reject: (res: string) => void
        ) => {
            try {
                const res = await axiosInstance.post(
                    `/api/v1.0/Patrimonio`,
                    body
                );

                if (res.data.data) {
                    resolve(res.data.data);
                }
                reject("Erro ao criar um patrimônio");
            } catch (err) {
                reject(err);
            }
        }
    );

interface atualizarPatrimonioStatusParams {
    id: number;
    isAtivo: boolean;
    txMotivo: string;
    idAto: number;
    txProcessoSei: number;
}

export const atualizarPatrimonioStatus = ({
    id,
    idAto,
    isAtivo,
    txMotivo,
    txProcessoSei
}: atualizarPatrimonioStatusParams) =>
    new Promise(
        async (resolve: (res: any) => void, reject: (res: string) => void) => {
            //string URI = string.Format("{0}/v1.0/atos/{1}/pecas-finalizadas", URL, idAto.Value);
            try {
                const res = await axiosInstance.put(
                    `/api/v1.0/Patrimonio/atualizar/status/${id}?isAtivo=${isAtivo}&txMotivo=${txMotivo}&idAto=${idAto}&txProcessoSei=${txProcessoSei}`
                );
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        }
    );

export type CartorioT = {
    id: number;
    txOficio: string;
    dtCadastro: string;
    hrCadastro: string;
    usuarioCadastro: any;
};

export const getCartorio = (id: number) =>
    new Promise(
        async (
            resolve: (res: CartorioT) => void,
            reject: (res: string) => void
        ) => {
            try {
                const res = await axiosInstance.get(
                    `/api/v1.0/Patrimonio/recuperar/cartorio/${id}`
                );

                if (res.data.data) {
                    resolve(res.data.data);
                }
                reject("Erro ao buscar cartório");
            } catch (err) {
                reject(err);
            }
        }
    );

export const getCartorios = () =>
    new Promise(
        async (
            resolve: (res: CartorioT[]) => void,
            reject: (res: string) => void
        ) => {
            try {
                const res = await axiosInstance.get(
                    `/api/v1.0/Patrimonio/recuperar/cartorios`
                );

                if (res.data.data) {
                    resolve(res.data.data);
                }
                reject("Erro ao buscar cartórios");
            } catch (err) {
                reject(err);
            }
        }
    );
export type TipoImovelT = {
    id: number;
    txTipo: string;
};
export const getTiposImoveis = () =>
    new Promise(
        async (
            resolve: (res: TipoImovelT[]) => void,
            reject: (res: string) => void
        ) => {
            try {
                const res = await axiosInstance.get(
                    `/api/v1.0/Patrimonio/recuperar/imoveis`
                );

                if (res.data.data) {
                    resolve(res.data.data);
                }
                reject("Erro ao buscar tipos de imóveis");
            } catch (err) {
                reject(err);
            }
        }
    );

export type TipoFormaAquisicaoT = {
    id: number;
    txFomaAquisicao: string;
};

export const getFormasAquisicoes = () =>
    new Promise(
        async (
            resolve: (res: TipoFormaAquisicaoT[]) => void,
            reject: (res: string) => void
        ) => {
            try {
                const res = await axiosInstance.get(
                    `/api/v1.0/Patrimonio/recuperar/forma-aquisicao`
                );

                if (res.data.data) {
                    resolve(res.data.data);
                }
                reject("Erro ao buscar formas de aquisição");
            } catch (err) {
                reject(err);
            }
        }
    );
interface PostAnexoParams {
    idImovel: number;
    //"idAnexo": string,
    idUsuarioCadastro: number;
    file_stream: string;
    name: string;
    txTipoArquivo: string;
}
export const posAnexoImoveis = async (
    postprops: PostAnexoParams
): Promise<any> => {
    const { data } = await axiosInstance.post(
        `/api/v1.0/patromonio-anexos`,
        postprops
    );
    return data;
};

export const deleteAnexoImoveis = async (id: number): Promise<any> => {
    const { data } = await axiosInstance.delete(
        `/api/v1.0/patromonio-anexos/${id}`
    );
    return data;
};

export const getPatriAnexos = async (id: number): Promise<any> => {
    const { data } = await axiosInstance.get(
        `/api/v1.0/patromonio-anexos/imovel/${id}`
    );
    return data;
};
