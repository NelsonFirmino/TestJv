//string url = string.Format("{0}/v1.0/rpv/origem?page=1&pageSize=1000", URL_SERVICE);

import axiosInstance from "../../../axiosInstance";
import { useState } from "react";
import { GetOrigemResponse, origenI } from "./interfaces";

const useOrigemService = () => {
    const [origens, setOrigens] = useState<origenI[]>();

    async function get() {
        try {
            const or = await axiosInstance.get(
                `/api/v1.0/rpv/origem?page=1&pageSize=1000`
            );

            setOrigens(or.data.data);
            return or.data.data;
        } catch (err) {
            return err as any;
        }
    }

    return { get, origens };
};

export default useOrigemService;


export const getOrigem = async (): Promise<GetOrigemResponse> => {
    const origem = await axiosInstance.get(
      "/api/v1.0/rpv/origem?page=1&pageSize=100"
    );
  
    return origem.data;
  };
  