import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { EspecializadaServiceI } from "./interface";
const useEspecializadasService = () => {
  const [especializadas, setEspecializadas] =
    useState<EspecializadaServiceI[]>();

  async function get(idSecretaria: number) {
    try {
      const res = await axiosInstance.get(
        `/api/v1.0/Especializada/Ordernada?idSecretaria=${idSecretaria}&isBloqueado=false`
      );

      setEspecializadas(res.data.data);
      return Promise.resolve(res.data.data);
    } catch (err) {
      return Promise.reject(err);
    }
  }
  async function getMany(idsSecretaria: number[]) {
    const ep: Set<EspecializadaServiceI[]> = new Set();
    for (let i = 0; i < idsSecretaria.length; i++) {
      try {
        const res = await axiosInstance.get(
          `/api/v1.0/Especializada/Ordernada?idSecretaria=${idsSecretaria[i]}&isBloqueado=false`
        );
        ep.add(res.data.data);
      } catch (err) {
      }
    }
    const list = Array.from(ep).flat();
    setEspecializadas(list);
  }

  return { get, especializadas, getMany };
};

export default useEspecializadasService;
