import { useQuery } from "react-query";
import { getProcessData } from "../api/services/processData/processData";
import { GetProcessResponse } from "../api/services/process/process.interface";

// export const useProceduralForwarding = (attorneyId?: string) => {
//   const { data: proceduralForwardingData, isLoading: isLoadingProceduralForwardingData } = useQuery(
//     [`proceduralForwardingData-${attorneyId}`, attorneyId],
//     () => GetProcessProceduralForwarding(attorneyId),
//     {
//       staleTime: 1000 * 60 * 10, // 10 minutos
//     }
//   );

//   return { proceduralForwardingData, isLoadingProceduralForwardingData };
// };

// export const useProceduralForwarding = () => {
//     const {data: proceduralForwardingData, isLoading: isLoadingProceduralForwardingData } =
//       useQuery<GetProcessResponse>(
//         "processProceduralForwarding",
//         () => GetProcessProceduralForwarding,
//         {
//           staleTime: 1000 * 60 * 60 * 24, // 1 dia
//         }
//         );
//         return { proceduralForwardingData, isLoadingProceduralForwardingData };
//     }