import axiosInstance from "../../axiosInstance";
import { GetProceduralRecordDCJEDataByIdResponse } from "./dcje.interface";

export const getProceduralRecordDCJEDataById = async (
  idAto: string
): Promise<GetProceduralRecordDCJEDataByIdResponse> => {
  const proceduralRecordDCJEData = await axiosInstance.get(
    "/api/v1.0/ficha-dcje/dados-processo",
    {
      params: {
        idAto,
      },
    }
  );

  return proceduralRecordDCJEData.data;
};
