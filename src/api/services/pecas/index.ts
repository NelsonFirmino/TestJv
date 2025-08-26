import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import {
    AnexoPecaI,
    PecaAnexadaResI,
    PecaI,
    SendAnexoPecaI
} from "./interfaces";

const usePecasService = () => {
    const [anexosPeca, setAnexosPeca] = useState<AnexoPecaI[]>();

    const finalizarPeca = (PecaId: number) =>
        new Promise(
            async (
                resolve: (res: PecaAnexadaResI) => void,
                reject: (res: string) => void
            ) => {
                try {
                    const res = await axiosInstance.put(
                        `/api/v1.0/pecas/${PecaId}/finalizar-peca`
                    );
                    resolve(res.data.data);
                } catch (err) {
                    reject(err);
                }
            }
        );

    const assinarPeca = (Peca: PecaI) =>
        new Promise(
            async (
                resolve: (res: PecaAnexadaResI) => void,
                reject: (res: string) => void
            ) => {
                try {
                    const res = await axiosInstance.post(
                        `/api/v1.0/pecas/assinar`,
                        Peca
                    );
                    resolve(res.data.data);
                } catch (err) {
                    reject(err.response.data.message);
                }
            }
        );

    async function salvarPeca(peca: PecaI) {
        try {
            const res = await axiosInstance.post(`/api/v1.0/pecas`, peca);
            if (res.status === 400) {
                return Promise.reject(res.data.message);
            }
            return Promise.resolve("ok");
        } catch (err) {
            return Promise.reject(err.response.data.message);
        }
    }
    async function updatePeca(peca: PecaI) {
        try {
            const res = await axiosInstance.put(
                `/api/v1.0/pecas/${peca.id}`,
                peca
            );
            if (res.status === 400) {
                return Promise.reject(res.data.message);
            }
            return Promise.resolve("ok");
        } catch (err) {
            return Promise.reject(err.response.data.message);
        }
    }
    const getAnexosPeca = (idPeca: number) =>
        new Promise(
            async (
                resolve: (res: any[]) => void,
                reject: (res: string) => void
            ) => {
                try {
                    const res = await axiosInstance.get(
                        `/api/v1.0/pecas/${idPeca}/anexos`
                    );
                    setAnexosPeca(res.data.data);
                    resolve(res.data.data);
                } catch (err) {}
                reject("error");
            }
        );

    const adicionarAnexo = (anexo: SendAnexoPecaI) =>
        new Promise(
            async (
                resolve: (res: any) => void,
                reject: (res: string) => void
            ) => {
                try {
                    const res = await axiosInstance.post(
                        `/api/v1.0/pecas/${anexo.idPeca}/anexos`,
                        anexo
                    );
                    resolve(res.data.data);
                } catch (err) {
                    reject(err);
                }
            }
        );
    return {
        salvarPeca,
        updatePeca,
        getAnexosPeca,
        anexosPeca,
        assinarPeca,
        finalizarPeca,
        adicionarAnexo
    };
};

export default usePecasService;
