import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import {
  FichaDcjeResI,
  FichaDcjeServiceI,
  GetFichaParams,
  GetFichaResponse,
  GetProcessParams,
  GetProcessResponse,
} from "./interface";

const useFichaDcjeService = () => {
  const [fichasDcje, setFichasDcje] = useState<FichaDcjeResI[]>();
  const [fichaId, setFichaId] = useState<GetFichaResponse>();
  const [fichasDcjeResponse, setFichasDcjeResponse] =
    useState<GetProcessResponse>();
  const [loading, setLoading] = useState(false);
  const [postEncerrar, setPostEncerrar] = useState<FichaDcjeServiceI>();
  const [deleteExcluir, setDeleteExcluir] = useState<FichaDcjeServiceI>();

  const get = async ({
    dtFim,
    dtIni,
    idProcesso,
    idFichaProcessual,
    page = "1",
    pageSize = "10",
    isResposta = false,
    isEncerradas = false,
    idProcurador
  }: GetProcessParams): Promise<FichaDcjeResI> => {
    let params: any = {
      dtIni,
      dtFim,
      idProcesso,
      isResposta,
      page,
      pageSize,
      isEncerradas,
      idProcurador
    };
    if (idFichaProcessual) {
      params = {
        dtIni,
        dtFim,
        idProcesso,
        idFichaProcessual,
        isResposta,
        page,
        pageSize,
        isEncerradas,
        idProcurador
      };
    }
    setLoading(true);
    const processsList = await axiosInstance.get("/api/v1.0/ficha-dcje", {
      params,
    });

    setFichasDcje(processsList.data.data);
    setFichasDcjeResponse(processsList.data);
    setLoading(false);
    return processsList.data;
  };

  const getAll = (props: GetProcessParams) =>
    new Promise(
      async (resolve: (res: string) => void, reject: (res: string) => void) => {
        {
          try {
            setLoading(true);
            const fichas = await axiosInstance.get(`/api/v1.0/ficha-dcje`, {
              params: props,
            });
            setFichasDcjeResponse(fichas.data);
            setFichasDcje(fichas.data.data);
          } catch (err) {
            reject(err as any);
          }
          setLoading(false);
          resolve("ok");
        }
      }
    );

  const getFichasForIdAto = async ({
    id,
  }: GetFichaParams): Promise<GetFichaResponse> => {
    let params: any = {
      id,
    };
    const processId = await axiosInstance.get(`/api/v1.0/ficha-dcje/${id}`, {
      params,
    });

    setFichaId(processId.data);
    return processId.data;
  };

  const postEncerrarFicha = async ({
    id,
    idProcurador,
  }: FichaDcjeServiceI): Promise<FichaDcjeResI> => {
    const encerrarFicha = await axiosInstance.post(
      `/api/v1.0/ficha-dcje/${id}/encerrar?idProcurador=${idProcurador}`,
      {
        id,
        idProcurador,
      }
    );
    setPostEncerrar(encerrarFicha.data);

    return encerrarFicha.data.message;
  };

  const deleteExcluirFicha = async ({
    id,
  }: FichaDcjeServiceI): Promise<FichaDcjeResI> => {
    const excluirFicha = await axiosInstance
      .delete(`/api/v1.0/ficha-dcje/${id}`)
      .then((response) => {
        return response;
      });
    setDeleteExcluir(excluirFicha.data);

    return excluirFicha.data.message;
  };

  const resetFichasDcje = () => {
    setFichasDcje(undefined);
  };

  return {
    getAll,
    get,
    getFichasForIdAto,
    postEncerrarFicha,
    deleteExcluirFicha,
    fichasDcje,
    fichasDcjeResponse,
    fichaId,
    loading,
    postEncerrar,
    deleteExcluir,
    resetFichasDcje,
  };
};

export default useFichaDcjeService;
