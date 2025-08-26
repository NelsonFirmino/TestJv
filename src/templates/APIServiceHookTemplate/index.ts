import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";

//put it on a folder with the apiRoute name like if the route is /api/v1.0/triagens/1, the folder name should be triagens

const useAPIRouteNAMEService = () => {
  const [stateData, setStateData] = useState<any>();

  async function get(idDistribuicao: number) {
    try {
      const data = await axiosInstance.get(
        `/api/v1.0/triagens/${idDistribuicao}`
      );

      setStateData(data.data.data);
      return Promise.resolve("ok");
    } catch (err) {
      return Promise.reject("error");
    }
  }

  return { get, stateData };
};

export default useAPIRouteNAMEService;
