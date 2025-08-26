import axiosInstance from "../../axiosInstance";
import {
  CredenciaisPje,
  GetCredenciaisPjeResponse,
  TribunaisPjeResponse,
} from "./credenciaisPje-Service.interface";

//*! ============================================[GET]============================================
export const getCredenciaisPje = async (
  idProcurador: number
): Promise<GetCredenciaisPjeResponse> => {
  const credenciaisPje = await axiosInstance.get<GetCredenciaisPjeResponse>(
    "api/v1.0/acessos",
    {
      params: {
        idProcurador: idProcurador,
        page: 1,
        pageSize: 10,
      },
    }
  );

  return credenciaisPje.data;
};

export const getTribunaisPje = async (): Promise<TribunaisPjeResponse> => {
  const tribunaisPje = await axiosInstance.get<TribunaisPjeResponse>(
    "api/v1.0/tribunais-pje?page=1&pageSize=100"
  );

  return tribunaisPje.data;
};

//*! ============================================[POST]============================================
export const postCredenciaisPje = async ({
  ...Params
}: CredenciaisPje): Promise<GetCredenciaisPjeResponse> => {
  const postCredenciaisPje = await axiosInstance.post(`/api/v1.0/acessos`, {
    ...Params,
  });

  return postCredenciaisPje.data;
};

//*! ============================================[PUT]============================================
export const putCredenciaisPje = async ({
  ...Params
}: CredenciaisPje): Promise<GetCredenciaisPjeResponse> => {
  const postCredenciaisPje = await axiosInstance.put(
    `/api/v1.0/acessos/${Params.id}`,
    {
      ...Params,
    }
  );

  return postCredenciaisPje.data;
};

//*! ===========================================[DELETE]===========================================
export const deleteCredencialPje = async (
  id: number
): Promise<GetCredenciaisPjeResponse> => {
  const deleteCredencialPje = await axiosInstance.delete(
    `api/v1.0/acessos/${id}`
  );
  return deleteCredencialPje.data;
};
