import { useEffect, useState } from "react";
import useAcessoresService from "../../../../../../../api/services/Procuradores/acessores/useAcessoresService";
import { JvrisTableColumnNDataI } from "../../../../../../../components/JvrisTable/JvrisTable.interface";
import {
  JvrisClicableButtonI,
  subOptionsI,
} from "../../../../../../../components/JvrisTable/components/ClicableButton/ClicableButton.interface";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { useTablesContext } from "../../../context/TablesContext";
import { createSubOptI } from "./interfaces";
import { ParseToJvrisTableProcessosOperacao } from "./utils";

const usePOTable = () => {
  const { data, managing, userId } = useTablesContext();
  const { openModal } = useModalsContext();
  const [tableData, setTableData] = useState<JvrisTableColumnNDataI[][]>([]);

  useEffect(() => {
    if (tableData.length > 0) {
      managing.setLoadingData(false);
      managing.setLoadingStatus("");
    } else {
      managing.setLoadingData(true);
    }
  }, [tableData]);

  const tableClicable: JvrisClicableButtonI = {
    subOptions: createProcessosEmOperacaoSubOptions([
      [
        {
          changeTo: modalsID.pedidoRedistribuicao,
          option: "Pedido de Redistribuição",
        },
      ],
      [
        {
          changeTo: modalsID.alterarRelevancia,
          option: "Alterar Relevância",
        },
        {
          changeTo: modalsID.registrarObservacao,
          option: "Registrar Observação",
        },
        {
          changeTo: modalsID.anexosAto,
          option: "Anexos Ato",
        },
      ],
    ]),
  };
  const { getAcessores } = useAcessoresService();

  useEffect(() => {
    if (
      data.loading.loadingStatus === "" ||
      data.loading.loadingStatus == "Recebendo dados base do servidor"
    ) {
      setTableData(
        ParseToJvrisTableProcessosOperacao(
          data.attorneyProcessesInOperationList
        )
      );
      getAcessores({ idProcurador: userId.toString() });
    }
  }, [data.attorneyProcessesInOperationList]);

  function createProcessosEmOperacaoSubOptions(props: createSubOptI[][]) {
    const ProcessesInOperationSubOptions: subOptionsI[][] = [];
    props.forEach((subOpt) => {
      const subOptions: subOptionsI[] = [];
      subOpt.forEach((opt) => {
        subOptions.push({
          text: opt.option,
          onClick: (index) => {
            if (index != undefined) {
              if (opt.onClick) opt.onClick(index);
              else {
                openModal(opt.changeTo);
                //managing.resetSelectedData();
                managing.setSingularSelectedData(
                  data.attorneyProcessesInOperationList[index]
                ); //managing.select([index], prop.dataSelected);
              }
            }
          },
        });
      });
      ProcessesInOperationSubOptions.push(subOptions);
    });

    return ProcessesInOperationSubOptions;
  }

  return { tableData, tableClicable, managing, openModal, data };
};

export default usePOTable;
