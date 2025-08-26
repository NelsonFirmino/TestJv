import { useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { GetRequisitoriosPorIdAtoResponse, salvarParamsI } from "./interfaces";

const useRequisitorioService = () => {
  const [requisitorios, setRequisitorios] = useState<any>();
  const [requisitorio, setRequisitorio] = useState<any>();

  async function get(id: number) {
    try {
      const req = await axiosInstance.get(`/api/v1.0/rpv/requisitorio/${id}`);

      setRequisitorio(req.data.data);
      return req.data.data;
    } catch (err) {
      return err as any;
    }
  }

  async function deleteRequisitorio(idAto: number) {
    try {
      const req = await axiosInstance.delete(
        `/api/v1.0/rpv/requisitorio/${idAto}`
      );

      return req.data.data;
    } catch (err) {
      return err as any;
    }
  }

  async function getRequisitoriosById(idAto: number) {
    try {
      const req = await axiosInstance.get(
        `/api/v1.0/rpv/requisitorio/por-idato?id=${idAto}`
      );

      setRequisitorios(req.data.data);
      return req.data.data;
    } catch (err) {
      return err as any;
    }
  }

  const salvar = (requisitorio: salvarParamsI) =>
    new Promise(
      async (resolve: (res: any) => void, reject: (res: string) => void) => {
        try {
          if (requisitorio.id == 0) {
            const res = await axiosInstance.post(
              `/api/v1.0/rpv/requisitorio`,
              requisitorio
            );
            resolve(res.data);
          } else {
            const res = await axiosInstance.put(
              `/api/v1.0/rpv/requisitorio/${requisitorio.id}`,
              requisitorio
            );
            resolve(res.data);
          }
        } catch (err) {
          reject(err.response.data.message);
        }
      }
    );

  return {
    get,
    getRequisitoriosById,
    requisitorio,
    requisitorios,
    salvar,
    deleteRequisitorio,
  };
};

export default useRequisitorioService;

export const getRequisitoriosPorIdAto = async (
  id: number
): Promise<GetRequisitoriosPorIdAtoResponse> => {
  const { data } = await axiosInstance.get(
    `/api/v1.0/rpv/requisitorio/por-idato?id=${id}`
  );

  return data;
};
