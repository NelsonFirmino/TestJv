import axiosInstance from "../../../axiosInstance";
import { GetAttorneyRequestsForInactionResponse } from "./attorneys.requestsForInaction.interface";

export const getAttorneyRequestsForInaction = async (id: string): Promise<GetAttorneyRequestsForInactionResponse> => {
	const AttorneysRequestsForInaction = await axiosInstance.get(`/api/v1.0/despachos/acato-pendente/procurador/${id}`);

	return AttorneysRequestsForInaction.data;
};
