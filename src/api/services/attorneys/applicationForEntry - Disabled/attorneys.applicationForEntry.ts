import axiosInstance from "../../../axiosInstance";

export const getAttorneysApplicationForEntry = async (
  id: string,
): Promise<any> => {
  const AttorneysApplicationForEntry = await axiosInstance.get(``);

  return AttorneysApplicationForEntry.data;
};
