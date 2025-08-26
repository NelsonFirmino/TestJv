import axiosInstance from "../../axiosInstance";
import { PostComplyChiefParams, PostComplyChiefResponse } from "./redistributions.interface";

export const PostComplyChief = async ({
    id,
    idEspecializada,
    idProcurador,
    idUsuarioCadastro,
    isRecusado,
    txObservacao
}: PostComplyChiefParams): Promise<PostComplyChiefResponse> => {
    const { data } = await axiosInstance.post<PostComplyChiefResponse>(`/api/v1.0/redistribuicoes/${id}/acato-chefia`, {
        id,
        idEspecializada,
        idProcurador,
        idUsuarioCadastro,
        isRecusado,
        txObservacao
    });

    if (!Boolean(data.status === "Created")) {
        throw new Error(data.message);
    }

    return data;
};