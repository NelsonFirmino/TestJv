import axiosInstance from "../../axiosInstance";
import { CredencialResponse } from "./consultaCredenciaisPje-Service.interface";

//*! ============================================[GET]============================================
export const getConsultarCredenciaisPje = async (
  idProcurador: number,
  nuInstancia: number
): Promise<CredencialResponse> => {
  const credenciaisPje = await axiosInstance.get<CredencialResponse>(
    `api/v1.0/acessos?idProcurador=${idProcurador}&nuInstancia=${nuInstancia}`
  );

  return credenciaisPje.data;
};
