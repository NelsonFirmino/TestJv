import { useState, useEffect } from "react";
import { ParseToJvrisTable } from "./utils";
import { JvrisClicableButtonI } from "../../../../../../../components/JvrisTable/components/ClicableButton/ClicableButton.interface";
import { JvrisTableColumnNDataI } from "../../../../../../../components/JvrisTable/JvrisTable.interface";
import { AtosFisicosConcluidosI, SecretariasI } from "./interfaces";
import axiosInstance from "../../../../../../../api/axiosInstance";
import { ProcessosTableI } from ".";

const usePPC = (props: ProcessosTableI) => {
  const { setData, setSecretarias, setOpenModal } = props;

  const [tableData, setTableData] = useState<JvrisTableColumnNDataI[][]>([]);
  const [ProcPendentes, setProcpendentes] = useState<AtosFisicosConcluidosI[]>(
    []
  );

  const [selectedData, setSelectedData] = useState<any | undefined>(undefined);

  const [secretaria, setSecretaria] = useState<SecretariasI | undefined>(
    undefined
  );

  const tableClicable: JvrisClicableButtonI = {
    text: "Envio ao Órgão de Origem",
    onClick: (index) => {
      setData(ProcPendentes[index]);
      setOpenModal(true);
    },
  };

  async function getSecretarias() {
    //string url = string.Format("{0}/v1.0/secretarias", URL);
    try {
      const sec = await axiosInstance.get("/api/v1.0/secretarias");
      setSecretarias(sec.data.data);
      setSecretaria(sec.data.data[0]);
    } catch (err) {
      console.error(err);
    }
  }

  async function listarRecebimentosPendentes() {
    try {
      const proc = await axiosInstance.get(
        `/api/v1.0/Secretarias/${secretaria?.id}/recebimentos-pendente`
      );
      setTableData(ParseToJvrisTable(proc.data.data));
      setProcpendentes(proc.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getSecretarias();
  }, []);
  useEffect(() => {
    listarRecebimentosPendentes();
  }, [secretaria]);

  return {
    tableData,
    tableClicable,
    selectedData,
    ProcPendentes,
  };
};

export default usePPC;
