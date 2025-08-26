import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import {
  AlterarRelevanciaParamsI,
  AnexoI,
  AtoDetalhadoI,
  AtoResponse,
  PecaFinalizadaI,
  RecPecaI,
} from "./atos.interface";

const useAtosService = () => {
  const [ato, setAto] = useState<AtoDetalhadoI>();
  const [recPeca, setRecPeca] = useState<RecPecaI | string>();
  const [anexos, setAnexos] = useState<AnexoI[]>([]);
  const [loadingAnexos, setLoadingAnexos] = useState<boolean>(false);
  const [anexosResposta, setAnexosResposta] = useState<any[]>([]);
  const [pecasFinalizadas, setPecasFinalizadas] = useState<PecaFinalizadaI[]>(
    []
  );

  const getPecasFinalizadas = (idAto: number) =>
    new Promise(
      async (resolve: (res: any[]) => void, reject: (res: string) => void) => {
        //string URI = string.Format("{0}/v1.0/atos/{1}/pecas-finalizadas", URL, idAto.Value);
        try {
          const res = await axiosInstance.get(
            `/api/v1.0/atos/${idAto}/pecas-finalizadas`
          );

          setPecasFinalizadas(res.data.data);
          resolve(res.data.data);
        } catch (err) {
          reject("error");
        }
      }
    );

  const getAnexosResposta = (idAto: number) =>
    new Promise(
      async (resolve: (res: any[]) => void, reject: (res: string) => void) => {
        //string URI = string.Format("{0}/v1.0/atos/{1}/anexos-resposta-dcje", URL, idAto);
        try {
          const res = await axiosInstance.get(
            `/api/v1.0/atos/${idAto}/anexos-resposta-dcje`
          );

          setAnexosResposta(res.data.data);
          resolve(res.data.data);
        } catch (err) {
          reject("error");
        }
      }
    );

  const getAnexos = (idAto: number) =>
    new Promise(
      async (
        resolve: (res: AnexoI[]) => void,
        reject: (res: string) => void
      ) => {
        setLoadingAnexos(true);
        try {
          const res = await axiosInstance.get(`/api/v1.0/atos/${idAto}/anexos`);
          setAnexos(res.data.data);
          setLoadingAnexos(false);
          resolve(res.data.data);
        } catch (err) {
          setLoadingAnexos(false);
          reject("error");
        }
      }
    );

  async function pecaExists(idAto: number) {
    try {
      const recPeca = await axiosInstance.get(`/api/v1.0/atos/${idAto}/peca`);
      return Promise.resolve(recPeca.data.data ? true : false);
    } catch (err) {
      return Promise.reject(false);
    }
  }

  const get = (id: number) =>
    new Promise(
      async (
        resolve: (res: AtoDetalhadoI) => void,
        reject: (res: string) => void
      ) => {
        /*
				const res =
						await axiosInstance.get(
							`/api/v1.0/Atos/${id}/detalhado`,
						);
					const { data } = res;
					setAtoD(data.data);
				*/
        try {
          const at1 = await axiosInstance.get(`/api/v1.0/Atos/${id}`);
          const { data } = at1;

          const at2 = await axiosInstance.get(`/api/v1.0/Atos/${id}/detalhado`);
          const { data: data2 } = at2;

          setAto({
            ...data.data,
            ...data2.data,
          });

          resolve({
            ...data.data,
            ...data2.data,
          });
        } catch (err) {
          reject(err as any);
        }
      }
    );

  const alterarPrazo = ({ id, data }: { id: number; data: string }) =>
    new Promise(
      async (resolve: (res: string) => void, reject: (res: string) => void) => {
        try {
          const res = await axiosInstance.put(`/api/v1.0/atos/${id}/prazo`, {
            dtPrazo: data,
          });
          resolve(res.data);
        } catch (err) {
          reject(err as any);
        }
      }
    );

  const alteraRelevancia = (params: AlterarRelevanciaParamsI) =>
    new Promise(
      async (resolve: (res: string) => void, reject: (res: string) => void) => {
        const {
          idProcesso,
          idAto,
          novaRelevanciaProcesso,
          novaRelevanciaAto,
          idUsuarioCadastro,
        } = params;

        try {
          if (idProcesso) {
            const res = await axiosInstance.put(
              `/api/v1.0/processos/${idProcesso}/relevancia`,
              {
                txRelevancia: novaRelevanciaProcesso,
              }
            );
          }
          if (idAto) {
            const res = await axiosInstance.put(
              `/api/v1.0/atos/${idAto}/relevancia`,
              {
                isUrgente: novaRelevanciaAto,
                idUsuarioCadastro,
              }
            );
          }

          resolve("Ok");
        } catch (err) {
          reject(err as any);
        }
      }
    );

  const recuperarPeca = (idAto: number) =>
    new Promise(
      async (resolve: (res: string) => void, reject: (res: string) => void) => {
        try {
          const recPeca = await axiosInstance.get(
            `/api/v1.0/atos/${idAto}/peca`
          );

          if (recPeca.data.status == "NotFound") {
            setRecPeca("NotFound");
            resolve("NotFound");
          } else {
            setRecPeca(recPeca.data.data);
            resolve(recPeca.data.data);
          }
        } catch (err) {
          return reject("error");
        }
      }
    );

  const concluirAtuacao = (
    idAto: number,
    Body: {
      Id: number;
      txTipo: string;
      idUsuarioCadastro: number;
    }
  ) =>
    new Promise(
      async (resolve: (res: string) => void, reject: (res: string) => void) => {
        // string url = string.Format("{0}/v1.0/atos/{1}/finalizar-atuacao", URL, idAto.Value);
        try {
          const res = await axiosInstance.post(
            `/api/v1.0/atos/${idAto}/finalizar-atuacao`,
            Body
          );
          resolve(res.data.data);
        } catch (err) {
          reject(err as any);
        }
      }
    );

  return {
    alterarPrazo,
    alteraRelevancia,
    get,
    recuperarPeca,
    ato,
    recPeca,
    pecaExists,
    getAnexos,
    anexos,
    getAnexosResposta,
    anexosResposta,
    getPecasFinalizadas,
    pecasFinalizadas,
    concluirAtuacao,
    loadingAnexos,
  };
};

export default useAtosService;

export const deleteAto = async (id: number): Promise<AtoResponse> => {
  const deleteAto = await axiosInstance.delete(`/api/v1.0/Atos/${id}`);

  return deleteAto.data;
};
