import { File } from "phosphor-react";
import { useState } from "react";
import { getActAttachmentsById } from "../../../../../../../api/services/acts/acts";
import { getActsAndProcedure } from "../../../../../../../api/services/actsAndProcedure/actsAndProcedure";
import { HotToastWarning } from "../../../../../../../components/HotToastFuncs";
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

const ProcessosEmOperacaoTable = () => {
  const { tableData, tableClicable, managing, openModal, data } = usePOTable();
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [dados, setDados] = useState<Anexo[]>([]);

  return (
    <div>
      {managing.selectedRows.length > 0 && (
        <SelectedButtonWrapper>
          <SelectedButton onClick={() => openModal(modalsID.atribuirAssessor)}>
            <SelectedButtonText>Atribuir Assessor</SelectedButtonText>
          </SelectedButton>

          <SelectedButton onClick={() => openModal(modalsID.despachoEmLote)}>
            <SelectedButtonText>Despacho</SelectedButtonText>
          </SelectedButton>
          <SelectedButton
            onClick={() => openModal(modalsID.pedidoRedistribuicao)}
          >
            <SelectedButtonText>Pedido de Redistribuição</SelectedButtonText>
          </SelectedButton>
          <SelectedButton onClick={() => openModal(modalsID.alterarPrazo)}>
            <SelectedButtonText>Alterar Prazo</SelectedButtonText>
          </SelectedButton>
          <SelectedButton onClick={() => openModal(modalsID.alterarRelevancia)}>
            <SelectedButtonText>Alterar Relevância</SelectedButtonText>
          </SelectedButton>
          <SelectedButton
            onClick={() => openModal(modalsID.registrarObservacao)}
          >
            <SelectedButtonText>Registrar Observação</SelectedButtonText>
          </SelectedButton>
          <SelectedButton
            onClick={() => openModal(modalsID.alterarNivelSigilo)}
          >
            <SelectedButtonText>Alterar Nível de Sigilo</SelectedButtonText>
          </SelectedButton>
          <SelectedButton onClick={() => openModal(modalsID.permissaoSigilo)}>
            <SelectedButtonText>Permissão de Sigilo</SelectedButtonText>
          </SelectedButton>
        </SelectedButtonWrapper>
      )}
      {showModalAdd && (
        <UltimoAnexo dados={dados} setShowModalAdd={setShowModalAdd} />
      )}

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
        columnDefaultOrder={{
          columnIndex: 4,
          order: "descendente",
        }}
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
                        HotToastWarning(
                          "Tribunal sem integração com o JVRIS. Consultar processo no portal do respectivo tribunal"
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
