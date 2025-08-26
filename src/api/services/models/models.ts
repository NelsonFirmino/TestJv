import axiosInstance from "../../axiosInstance";
import {
  GetModelsResponse,
  GetModelsTypesResponse,
  PostModelRequest,
} from "./models.interface";

export const getModels = async (): Promise<GetModelsResponse> => {
  const models = await axiosInstance.get(`/api/v1.0/modelos-peca?pageSize=0`);
  return models.data;
};

export const sendModel = async (model: PostModelRequest): Promise<any> => {
  const modelsPostRes = await axiosInstance.post(
    `/api/v1.0/modelos-peca`,
    model
  );
  // return attorneys.data;
};

export const getModelsTypes = async (): Promise<GetModelsTypesResponse> => {
  const modelsTypes = await axiosInstance.get(
    `/api/v1.0/tipos-peca?pageSize=100`
  );
  return modelsTypes.data;
};
