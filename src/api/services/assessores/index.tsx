import axiosInstance from "../../axiosInstance";
import { GetAdvisorsByAttorneyIdResponse } from "./assessores.interface";

export const GetAdvisorsByAttorneyId = async (attorneyId: number): Promise<GetAdvisorsByAttorneyIdResponse> => {
    const { data } = await axiosInstance.get<GetAdvisorsByAttorneyIdResponse>(`/api/v1.0/procuradores/${attorneyId}/assessores`);

    if (!Boolean(data.status === "OK")) {
        throw new Error(data.message);
    }

    return data;
}

