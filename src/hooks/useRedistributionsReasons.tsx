import { useQuery } from "react-query";
import { getRedistributionsReasons } from "../api/services/distributions/distributions";

export const useRedistributionsReasons = () => {
    const { data, isLoading: isLoadingRedistributionsReasons } = useQuery(
        [`redistributions-reasons`],
        () => getRedistributionsReasons(),
        {
            staleTime: 1000 * 60 * 60 * 24, // 1 dia
        }
    );

    const redistributionsReasons = data?.data.map((rs) => ({
        label: rs.txMotivo,
        value: rs.id,
    }));

    return { redistributionsReasons, isLoadingRedistributionsReasons };
};
