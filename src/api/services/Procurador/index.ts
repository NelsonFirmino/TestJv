import { useState } from "react";
import axiosInstance from "../../axiosInstance";
import { ProcuradorI } from "./interface";

const useProcuradorService = () => {
  const [procuradores, setProcuradores] = useState<ProcuradorI[]>();

  async function get(especializada: number) {
    try {
      const res = await axiosInstance.get(
        `/api/v1.0/especializada/${especializada}/Procuradores`
      );

      setProcuradores(res.data.data);
    } catch (err) {}
  }

  return { get, procuradores };
};

export default useProcuradorService;
