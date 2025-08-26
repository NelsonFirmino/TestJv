import { BaseModal } from "../../../../../../components/BaseModal";
import { CustomTable } from "../../../../../../components/CustomTable";
import { useActProcedures } from "../../../../../../hooks/useActProcedure";
import { DangerouslyTdObservation } from "./components/DangerouslyTdObservation";
import { DangerouslyTs } from "./components/DangerouslyTs";
import { ModalSeeProcedureProps } from "./modal-see-procedure.interface";

export const ModalSeeProcedure = ({
  setShowModalSeeProcedure,
  showModalSeeProcedure,
  actId
}: ModalSeeProcedureProps) => {
  const { actProcedures, isLoadingActProcedures } = useActProcedures(actId);
  return (
    <BaseModal title="Tramitações" isOpenModal={showModalSeeProcedure} setOpenModal={setShowModalSeeProcedure}>
      <CustomTable
        columns={[
          {
            name: "Data",
            keyData: "dtTramitacao",
            isSortable: true,
            formatToDate: true,
          },
          {
            name: "Tipo",
            keyData: "txTipo",
            isSortable: false,
            component: {
              element: (data) => <DangerouslyTs dataTable={data} keyData={"txTipo"}  />,
              isButton: false
            }
          },
          {
            name: "Descrição",
            keyData: "txTramitacao",
            isSortable: false,
            component: {
              element: (data) => <DangerouslyTs dataTable={data} keyData={"txTramitacao"}  />,
              isButton: false
            }
          },
          {
            name: "Observação",
            keyData: "txObservacoes",
            isSortable: false,
            component: {
              element: (data) => <DangerouslyTdObservation dataTable={data} keyData={"txObservacoes"}  />,
              isButton: false
            }
          }
        ]}
        data={actProcedures?.data ? actProcedures.data : []} 
        isLoading={isLoadingActProcedures}
        showPagination={true}
        showSearchField={false}
        showSelectNumberOfRows={false}
        defaultSortKeyColumn={{
          key: "dtTramitacao",
          direction: "descending"
        }}
      />
    </BaseModal>
  );
};
