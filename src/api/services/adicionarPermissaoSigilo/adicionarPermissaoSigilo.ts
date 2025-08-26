import axiosInstance from "../../axiosInstance";
import {
  AdicionarPermissaoSigiloParams,
  AdicionarPermissaoSigiloParamsResponse,
} from "./adicionarPermissaoSigilo.interface";

export const patchAdicionarPermissaoSigilo = async ({
  usuarioProcesso,
}: AdicionarPermissaoSigiloParams): Promise<AdicionarPermissaoSigiloParamsResponse> => {
  const adicionarPermissaoSigilo = await axiosInstance.patch(
    `/api/v1.0/Sigilo/lote/adicionar/permissao/processo`,
    {
      usuarioProcesso,
    }
  );

  return adicionarPermissaoSigilo.data;
};
