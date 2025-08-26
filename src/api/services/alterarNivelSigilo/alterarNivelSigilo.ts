import axiosInstance from "../../axiosInstance";
import {
  AlterarNivelSigiloParams,
  AlterarNivelSigiloResponse,
} from "./alterarNivelSigilo.interface";

export const patchAlterarNivelSigilo = async ({
  atosSigilosos,
}: AlterarNivelSigiloParams): Promise<AlterarNivelSigiloResponse> => {
  const alterarNivelSigilo = await axiosInstance.patch(
    `/api/v1.0/Sigilo/lote/ato`,
    {
      atosSigilosos,
    }
  );

  return alterarNivelSigilo.data;
};
