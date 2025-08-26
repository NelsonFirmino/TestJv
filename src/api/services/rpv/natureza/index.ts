import { useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { GetNaturezaResponse } from "./natureza.interface";

/* idAto = Convert.ToInt32(hfIdAto.Value),
                idProcurador = Convert.ToInt32(hfIdProcurador.Value),
                idUsuarioCadastro = UsuarioLogado.id,
                idTipoDespacho = 5,
                txObservacao = "Atuação concluída com o cadastro do requisitório",
                txNumeroProcesso = lbTxNumero.Text */

const useNaturezaService = () => {
  const [naturezas, setNaturezas] = useState<any[]>();

  async function get() {
    try {
      const naturezas = await axiosInstance.get(
        `/api/v1.0/rpv/natureza?pageSize=500`
      );

      setNaturezas(naturezas.data.data);
      return naturezas.data.data;
    } catch (err) {
      return err as any;
    }
  }

  return { get, naturezas };
};

export default useNaturezaService;

export const getNatureza = async (): Promise<GetNaturezaResponse> => {
  const natureza = await axiosInstance.get(
    "/api/v1.0/rpv/natureza?page=1&pageSize=20"
  );

  return natureza.data;
};
