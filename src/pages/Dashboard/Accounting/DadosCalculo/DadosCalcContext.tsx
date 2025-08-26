import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import { useCalculosContext } from "../Calculation/context/CalculosContext";
import { AssuntoI, ExequentesI, calcI, fichaProcI } from "./interfaces";

interface DadosCalculoContextI {
  CalcData: calcI | undefined;
  fichaProc: fichaProcI | undefined;
  Exequentes: ExequentesI[] | undefined;
  assuntos: AssuntoI[] | undefined;
  doneLoading: boolean;
  openAddExeModal: boolean;
  setOpenAddExeModal: (value: boolean) => void;
  getData: () => void;
}

export const DadosCalculoContext = createContext<DadosCalculoContextI>(
  {} as any
);

export const DadosCalculoProvider = (props: any) => {
  const { idCalculoContext } = useCalculosContext();

  const [CalcData, setCalcData] = useState<calcI>();

  const [fichaProc, setFichaProc] = useState<fichaProcI>();

  const [Exequentes, setExequentes] = useState<ExequentesI[]>([]);
  const [assuntos, setAssuntos] = useState<AssuntoI[]>([]);

  const [doneLoading, setDoneLoading] = useState<boolean>(false);

  const [openAddExeModal, setOpenAddExeModal] = useState<boolean>(false);

  async function getData() {
    setDoneLoading(false);
    setCalcData(undefined);
    setFichaProc(undefined);
    setExequentes([]);
    setAssuntos([]);

    const res = await axiosInstance.get(
      `/api/v1.0/calculos-dcje/${idCalculoContext}`
    );
    setCalcData(res.data.data);
    const res2 = await axiosInstance.get(
      `/api/v1.0/ficha-dcje/${res.data.data.idFichaProcessual}`
    );
    setFichaProc(res2.data.data);
    const res3 = await axiosInstance.get(
      `/api/v1.0/Processos/${res2.data.data.idProcesso}/partes`
    );
    const re = res3.data.data.filter(
      (item: ExequentesI) => item.txPolo === "A"
    );
    setExequentes(re);

    const asss = await axiosInstance.get(
      `/api/v1.0/razoes-pedidos?pageSize=1000`
    );
    setAssuntos(asss.data.data);
  }

  useEffect(() => {
    if (idCalculoContext) getData();
  }, [idCalculoContext]);

  useEffect(() => {
    if (CalcData && fichaProc && Exequentes.length && assuntos.length) {
      setDoneLoading(true);
    }
  }, [CalcData, fichaProc, Exequentes, assuntos]);

  return (
    <DadosCalculoContext.Provider
      value={{
        CalcData,
        fichaProc,
        Exequentes,
        assuntos,
        doneLoading,
        openAddExeModal,
        setOpenAddExeModal,
        getData,
      }}
    >
      {props.children}
    </DadosCalculoContext.Provider>
  );
};

export const useDadosCalculoContext = () => {
  const context = useContext(DadosCalculoContext);

  if (!context) {
    throw new Error(
      "useSpecificContext must be used within a SpecificProvider"
    );
  }
  return context;
};
