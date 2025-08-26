import { useQuery } from "react-query";
import {
  GetModelsResponse,
  GetModelsTypesResponse,
  PostModelRequest,
} from "../api/services/models/models.interface";
import {
  getModels,
  getModelsTypes,
  sendModel,
} from "../api/services/models/models";

export const useModels = () => {
  const { data: modelsListData, isLoading: loadingModelsList } =
    useQuery<GetModelsResponse>("modelsList", getModels, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });
  const { data: modelsTypesListData, isLoading: loadingModelsTypesList } =
    useQuery<GetModelsTypesResponse>("modelsTypesList", getModelsTypes, {
      staleTime: 1000 * 60 * 60 * 24, // 1 dia
    });
  const modelsList = modelsListData?.data;
  const modelsTypesList = modelsTypesListData?.data;

  const send = async (model: PostModelRequest) => {
    const response = await sendModel(model);
    return response;
  };
  return {
    modelsList,
    modelsTypesList,
    loadingModelsList,
    loadingModelsTypesList,
    send,
  };
};
