import { GetPontosFacultativosResponse } from './pontos-facultativos.interface';
import axiosInstance from "../../axiosInstance";

//*! ============================================[GET]============================================
export const getPontosFacultativos = async (): Promise<GetPontosFacultativosResponse> => {
    const pontosFacultativos = await axiosInstance.get
        (`/api/v1.0/PontosFacultativos?page=1&pageSize=1000`)

    return pontosFacultativos.data;
}

//*! ============================================[POST]============================================
export const postPontoFacultativo
 = async({
            txPontoFacultativo,
            dtPontoFacultativo,
            txDiarioOficial
        }) :

    Promise<GetPontosFacultativosResponse> => {
    const postPontoFacultativo = await axiosInstance.post(`/api/v1.0/PontosFacultativos`,
    {
        txPontoFacultativo,
        dtPontoFacultativo,
        txDiarioOficial
    });

    return postPontoFacultativo.data;
  };

//*! ===========================================[UPDATE]===========================================
export const updatePontoFacultativo
    = async({
            id,
            txPontoFacultativo,
            dtPontoFacultativo,
            txDiarioOficial
        }) :

    Promise<GetPontosFacultativosResponse> => {
    const postPontoFacultativo = await axiosInstance.put(`/api/v1.0/PontosFacultativos/${id}`,
    {
        txPontoFacultativo,
        dtPontoFacultativo,
        txDiarioOficial
    });

    return postPontoFacultativo.data;
  };


//*! ===========================================[DELETE]===========================================
export const deletePontoFacultativo = async (id: number): Promise<GetPontosFacultativosResponse> => {
    const deletePontoFacultativo = await axiosInstance.delete(`/api/v1.0/PontosFacultativos/${id}`);
    return deletePontoFacultativo.data;
};
