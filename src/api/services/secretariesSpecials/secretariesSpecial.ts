import axiosInstance from "../../axiosInstance";
import {
  GetSecretariesParams,
  GetSecretariesResponse,
} from "./secretariesSpecial.interface";

export const getSecretariesSpecials = async ({idSecretaria}:GetSecretariesParams
): Promise<GetSecretariesResponse> => {
  if (!idSecretaria) {
    return
  }
  const secretariesSpecialList = await axiosInstance.get(
    `/api/v1.0/Especializada/Ordernada`,
    { params: { idSecretaria, isBloqueado: false } }
  );

  return secretariesSpecialList.data;
};
