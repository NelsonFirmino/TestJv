import { File } from "phosphor-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { getActAttachmentsById } from "../../../../../../../api/services/acts/acts";
import { getActsAndProcedure } from "../../../../../../../api/services/actsAndProcedure/actsAndProcedure";
import theme from "../../../../../../../globalStyle/theme";
import { openOctetStreamInNewTab } from "../../../../../../../utils/openOctetStreamInNewTab.util";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { DefaultAttorneyTables } from "../styled";
import { UltimoAnexo } from "./AnexoModal";
import { Anexo } from "./interfaces";
import {
  SelectedButton,
  SelectedButtonText,
  SelectedButtonWrapper,
} from "./styled";
import usePOTable from "./usePOTable";
import { processosEmOperacaoColumns } from "./utils";
import { SelectAttorney } from "../../SelectAttorney";
import TableInfo from "../../TableInfo";

const ProcessosEmOperacaoTable = () => {
  const { tableData, tableClicable, managing, openModal, data } = usePOTable();
  const handleToast = (msg: string, error: boolean = false) => {
    !error
      ? toast(msg, {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      })
      : toast.error(msg, {
        icon: "😥",
        style: {
          borderRadius: "10px",
          background: "#e57373",
          color: "#fff",
          fontSize: "30px",
        },
      });
  };
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [dados, setDados] = useState<Anexo[]>([]);

  return (
    <div>
      <SelectAttorney />
      {managing.selectedRows.length > 0 && (
        <SelectedButtonWrapper>
          <SelectedButton
            onClick={() => openModal(modalsID.pedidoRedistribuicao)}
          >
            <SelectedButtonText>Pedido de Redistribuição</SelectedButtonText>
          </SelectedButton>
          <SelectedButton onClick={() => openModal(modalsID.alterarRelevancia)}>
            <SelectedButtonText>Alterar Relevância</SelectedButtonText>
          </SelectedButton>
          <SelectedButton
            onClick={() => openModal(modalsID.registrarObservacao)}
          >
            <SelectedButtonText>Registrar Observação</SelectedButtonText>
          </SelectedButton>
        </SelectedButtonWrapper>
      )}
      {showModalAdd && (
        <UltimoAnexo dados={dados} setShowModalAdd={setShowModalAdd} />
      )}

      <TableInfo />

      <DefaultAttorneyTables
        onSelectedRows={(rows) => {
          const selectedRowsData = rows.map((row) => {
            return data.attorneyProcessesInOperationList[row].txNumero;
          });

          managing.setSelectedRows(selectedRowsData);
          managing.resetSelectedData();
          managing.select(rows, data.attorneyProcessesInOperationList);
        }}
        columns={processosEmOperacaoColumns}
        data={tableData}
        ClicableButton={tableClicable}
        GenericButton={[
          {
            icon: <File weight="fill" size={20} />,
            hoverColor: theme.colors.jvrisAqua,
            alt: "Visualizar Anexo do Ato",
            onClick: (index) => {
              if (index != undefined) {
                getActsAndProcedure(
                  data.attorneyProcessesInOperationList[
                    index
                  ].idProcesso.toString()
                )
                  .then((value) => {
                    if (value.data == undefined) return;

                    getActAttachmentsById(
                      value.data[value.data?.length - 1].id.toString()
                    ).then((finalValue) => {
                      if (
                        finalValue?.status != "NotFound" &&
                        finalValue.data.length < 2
                      ) {
                        finalValue.data?.map((mapValue) => {
                          openOctetStreamInNewTab(
                            mapValue.file_stream,
                            mapValue.name
                          );
                        });
                      } else if (
                        finalValue?.status != "NotFound" &&
                        finalValue.data.length >= 2
                      ) {
                        setDados(finalValue.data?.map((v) => v));
                        setShowModalAdd(true);
                      } else {
                        handleToast(
                          "Tribunal sem integração com o JVRIS. Consultar processo no portal do respectivo tribunal",
                          true
                        );
                      }
                    });
                  })
                  .catch((error) => {
                    //console.log(error);
                  });
              }
            },
          },
        ]}
      />
    </div>
  );
};

export default ProcessosEmOperacaoTable;
