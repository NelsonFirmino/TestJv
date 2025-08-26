import axiosInstance from "../../axiosInstance";
import {
  GetComplyRequestForInactionResponse,
  GetComplyRequestForInactionParams,
  PostComplyRequestForInactionParamsV2,
} from "./complyRequestForInaction.interface";

export const postComplyRequestForInaction = async ({
  id,
  isRecusado,
  txObservacao,
  idUsuarioCadastro,
}: GetComplyRequestForInactionParams): Promise<GetComplyRequestForInactionResponse> => {
  const response = await axiosInstance.post(
    `/api/v1.0/Despachos/${id}/acato-chefia`,
    {
      id: id,
      isRecusado,
      txObservacao,
      idUsuarioCadastro,
    }
  );
  return response.data;
};

export const postComplyRequestForInactionv2 = async ({
  id,
  isRecusado,
  txObservacao,
  idUsuarioCadastro,
}: PostComplyRequestForInactionParamsV2): Promise<GetComplyRequestForInactionResponse> => {
  const { data } = await axiosInstance.post(`/api/v1.0/Despachos/${id}/acato-chefia`, {
      id: id,
      isRecusado,
      txObservacao,
      idUsuarioCadastro,
    }
  );

  if (!Boolean(data.status === "Created")) {
        throw new Error(data.message);
  }

  return data;
};

