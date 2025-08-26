import axiosInstance from "../../axiosInstance";
import {
  GetListRubricasResponse,
  PutRubricaParams,
  PutRubricaResponse,
} from "./rubrica.interface";

export const getListRubricas = async (): Promise<GetListRubricasResponse> => {
  const listRubricas = await axiosInstance.get(
    `/api/v1.0/siprubricas?page=1&pageSize=1000`
  );

  return listRubricas.data;
};

export const putRubrica = async ({
  id,
  nuIncidencia,
  txSipRubrica,
}: PutRubricaParams): Promise<PutRubricaResponse> => {
  const rubrica = await axiosInstance.put(`/api/v1.0/siprubricas/${id}`, {
    nuIncidencia,
    txSipRubrica,
  });

  return rubrica.data;
};
