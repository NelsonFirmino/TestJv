import axiosInstance from "../../axiosInstance";
import {
  GetAssuntosResponse,
  GetAssuntosSemPaginacaoParams,
  GetAssuntosSemPaginacaoResponse,
} from "./assuntos.interface";

export const getProcessoAssuntos = async (id: string): Promise<any> => {
  const processosAssuntos = await axiosInstance.get(
    `/api/v1.0/Processos/${id}/assuntos`
  );

  const pAssuntos = processosAssuntos.data?.data?.map((v: any) => v.idAssunto);

  var assuntoArray: { label: any; value: any }[] = [];

  for (let index = 0; index < pAssuntos?.length; index++) {
    const assunto = await getAssuntoByID(pAssuntos[index]).then((o: any) => ({
      label: o.txAssunto,
      value: o.id,
    }));
    assuntoArray.push(assunto);
  }
  return assuntoArray;
};

export const getAssuntoByID = async (
  id: number
): Promise<GetAssuntosResponse> => {
  const assuntos = await axiosInstance.get(`/api/v1.0/Assuntos/${id}`);

  return assuntos.data.data;
};

// Página Assuntos - Cadastros Auxiliares

export const getAssuntosSemPaginacao =
  async (): Promise<GetAssuntosSemPaginacaoResponse> => {
    const assuntosSemPaginacao = await axiosInstance.get(
      "/api/v1.0/Assuntos/sem-paginacao"
    );

    return assuntosSemPaginacao.data;
  };

export const postAssunto = async (
  txAssunto: string,
  idAssunto_Pai: number,
  idMateria: number
): Promise<GetAssuntosSemPaginacaoResponse> => {
  const postAssunto = await axiosInstance.post(`/api/v1.0/Assuntos`, {
    txAssunto,
    idAssunto_Pai,
    idMateria,
  });

  return postAssunto.data;
};

export const deleteAssunto = async (
  id: number
): Promise<GetAssuntosSemPaginacaoResponse> => {
  const deleteAssunto = await axiosInstance.delete(`/api/v1.0/Assuntos/${id}`);
  return deleteAssunto.data;
};

export const updateAssunto = async ({
  id,
  txAssunto,
  idAssunto_Pai,
  idMateria,
}: GetAssuntosSemPaginacaoParams): Promise<GetAssuntosSemPaginacaoResponse> => {
  const updateAssuntos = await axiosInstance.put(`/api/v1.0/Assuntos/${id}`, {
    txAssunto,
    idAssunto_Pai,
    idMateria,
  });

  return updateAssuntos.data;
};

export const autoCompleteAssuntos = async (
  txAssunto: string
): Promise<GetAssuntosSemPaginacaoResponse> => {
  const assuntoAuto = await axiosInstance.get(
    `/api/v1.0/Assuntos/autocomplete`,
    {
      params: {
        txAssunto,
      },
    }
  );

  return assuntoAuto.data;
};
