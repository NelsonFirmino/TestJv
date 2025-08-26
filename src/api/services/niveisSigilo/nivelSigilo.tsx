import axiosInstance from "../../axiosInstance";
import { NivelSigiloResponse } from "./nivelSigilo.interface";

export const getNivelSigiloZero = async (
  idUsuario: number
): Promise<NivelSigiloResponse> => {
  const nivelZero = await axiosInstance.get(`/api/v1.0/Sigilo/${idUsuario}/0`);

  return nivelZero.data;
};

export const getNivelSigiloUm = async (
  idUsuario: number
): Promise<NivelSigiloResponse> => {
  const nivelUm = await axiosInstance.get(`/api/v1.0/Sigilo/${idUsuario}/1`);

  return nivelUm.data;
};

export const getNivelSigiloDois = async (
  idUsuario: number
): Promise<NivelSigiloResponse> => {
  const nivelUm = await axiosInstance.get(`/api/v1.0/Sigilo/${idUsuario}/2`);

  return nivelUm.data;
};

export const getNivelSigiloTres = async (
  idUsuario: number
): Promise<NivelSigiloResponse> => {
  const nivelTres = await axiosInstance.get(`/api/v1.0/Sigilo/${idUsuario}/3`);

  return nivelTres.data;
};

export const getNivelSigiloQuatro = async (
  idUsuario: number
): Promise<NivelSigiloResponse> => {
  const nivelQuatro = await axiosInstance.get(
    `/api/v1.0/Sigilo/${idUsuario}/4`
  );

  return nivelQuatro.data;
};

export const getNivelSigiloCinco = async (
  idUsuario: number
): Promise<NivelSigiloResponse> => {
  const nivelCinco = await axiosInstance.get(`/api/v1.0/Sigilo/${idUsuario}/5`);

  return nivelCinco.data;
};
