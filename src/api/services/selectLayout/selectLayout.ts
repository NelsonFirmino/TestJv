import { PROFILES } from "../../../enums/PROFILES.enum";
import axiosInstance from "../../axiosInstance";
import { UsersListResponse } from "./select.interface";

export const selectLayout = async (
  perfilId: number,
  idAssessor: number
): Promise<UsersListResponse> => {
  let endpoint: string;
  let loadCurrentUser = false;
  switch (perfilId) {
    case PROFILES.ANALISTA:
      endpoint = `/api/v1.0/procuradores?pageSize=250`;
      break;
    case PROFILES.ASSESSOR_PROCURADOR:
      endpoint = `/api/v1.0/assessores/${idAssessor}/procuradores`;
      break;
    case PROFILES.ASSESSOR_DE_PROCURADOR:
      endpoint = `/api/v1.0/assessores/${idAssessor}/procuradores`;
      break;
    case PROFILES.PROCURADOR:
      endpoint = `/api/v1.0/assessores/${idAssessor}/procuradores`;
      break;
  }

  const { data } = await axiosInstance.get(endpoint);

  return data;
};
