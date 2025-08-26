import axiosInstance from "../../axiosInstance";
import { GetParams, GetResponse } from "./calculosdcje.interface";

export const getCalculosDCJE = async ({
  page,
  pageSize,
  idContador,
  idProcesso,
  idFichaProcessual,
  txTipoCalculo,
  idRazaoPedido,
  dtInicio,
  dtFim,
}: GetParams): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/calculos-dcje`, {
    params: {
      page,
      pageSize,
      idContador,
      idProcesso,
      idFichaProcessual,
      txTipoCalculo,
      idRazaoPedido,
      dtInicio,
      dtFim,
    },
  });

  return response.data;
};

export const getCalculosDCJEByID = async (id: number): Promise<GetResponse> => {
  const response = await axiosInstance.get(`/api/v1.0/calculos-dcje/${id}`);

  return response.data;
};
