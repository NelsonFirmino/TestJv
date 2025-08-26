import axiosInstance from "../../../axiosInstance";
import {
  GetProceduralRecordDCJEDataByActIdResponse,
  ProvisoryPutProceduralRecord,
  ProvisoryPutProceduralRecordMulti,
} from "./actsDCJE.interface";

export const getProceduralRecordDCJEDataByActId = async (
  idAto: string
): Promise<GetProceduralRecordDCJEDataByActIdResponse> => {
  const proceduralRecordDCJEData = await axiosInstance.get(
    `/api/v1.0/Atos/${idAto}/ficha-dcje?formatTextBox=true`
  );

  return proceduralRecordDCJEData.data;
};

export const getProceduralRecordDCJEDataByIdMulti = async (
  id: string
): Promise<GetProceduralRecordDCJEDataByActIdResponse> => {
  const proceduralRecordDCJEData = await axiosInstance.get(
    `/api/v1.0/ficha-dcje/lote/${id}`
  );

  return proceduralRecordDCJEData.data;
};
export const postProceduralRecordDCJEData = async (
  ProceduralRecordDCJE: ProvisoryPutProceduralRecord
): Promise<GetProceduralRecordDCJEDataByActIdResponse> => {
  const proceduralRecordDCJEData = await axiosInstance.post(
    `/api/v1.0/ficha-dcje`,
    {
      ...ProceduralRecordDCJE,
      idUsuarioCadastro: ProceduralRecordDCJE.idUsuarioCadastro,
    }
  );

  return proceduralRecordDCJEData.data;
};

export const putProceduralRecordDCJEData = async (
  ProceduralRecordDCJE: ProvisoryPutProceduralRecord
): Promise<GetProceduralRecordDCJEDataByActIdResponse> => {
  const proceduralRecordDCJEData = await axiosInstance.put(
    `/api/v1.0/ficha-dcje`,
    {
      ...ProceduralRecordDCJE,
      idUsuarioCadastro: ProceduralRecordDCJE.idUsuarioCadastro,
    }
  );

  return proceduralRecordDCJEData.data;
};

export const postProceduralRecordDCJEDataMultiJ = async (
  ProceduralRecordDCJE: ProvisoryPutProceduralRecordMulti
): Promise<GetProceduralRecordDCJEDataByActIdResponse> => {
  const proceduralRecordDCJEData = await axiosInstance.post(
    `/api/v1.0/ficha-dcje/parametros-lote`,
    {
      ...ProceduralRecordDCJE,
      idUsuarioCadastro: ProceduralRecordDCJE.idUsuarioCadastro,
    }
  );

  return proceduralRecordDCJEData.data;
};

export const putProceduralRecordDCJEDataMultiJ = async (
  ProceduralRecordDCJE: ProvisoryPutProceduralRecordMulti
): Promise<GetProceduralRecordDCJEDataByActIdResponse> => {
  const proceduralRecordDCJEData = await axiosInstance.put(
    `/api/v1.0/ficha-dcje/lote`,
    {
      ...ProceduralRecordDCJE,
      idUsuarioCadastro: ProceduralRecordDCJE.idUsuarioCadastro,
    }
  );

  return proceduralRecordDCJEData.data;
};
