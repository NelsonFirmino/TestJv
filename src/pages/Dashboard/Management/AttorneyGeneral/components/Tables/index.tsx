import ProcessosEmOperacaoTable from "./ProcessosOperacao";
import RequestsForInactionTable from "./RequestsForInactionTable";
import RedistributionRequestsTable from "./RedistributionRequestsTable";
import ContentSwitcher from "../../../../../../components/ContentsSwitcher";
import { useTablesContext } from "../../context/TablesContext";

const AttorneyTables = () => {
  const { managing, data } = useTablesContext();
  return (
    <>
      <ContentSwitcher
        currentSelected={managing.showingTable}
        setCurrentSelected={managing.setShowingTable}
        containerStyle={{
          marginBottom: "30px",
        }}
        resetSelected={() => managing.setSelectedRows([])}
        switchers={[
          {
            amount: data.attorneyProcessesInOperationList.length,
            name: "Processos em atuação",
            onClick: () => {
              managing.setLoadingData(false);
              managing.setLoadingStatus("");
            },
          },
          {
            amount: data.attorneyRequestsForInactionList.length,
            name: "Pedidos de inação",
            onClick: () => {
              managing.setLoadingData(false);
              managing.setLoadingStatus("");
            },
          },
          {
            amount: data.attorneyRedistributionRequestsList.length,
            name: "Pedidos de redistribuição",
            onClick: () => {
              managing.setLoadingData(false);
              managing.setLoadingStatus("");
            },
          },
        ]}
      />
      {managing.showingTable == 0 ? (
        <ProcessosEmOperacaoTable />
      ) : managing.showingTable == 1 ? (
        <RequestsForInactionTable />
      ) : managing.showingTable == 2 ? (
        <RedistributionRequestsTable />
      ) : managing.showingTable == 3 ? (
        <></>
      ) : (
        <></>
      )}
    </>
  );
};

export default AttorneyTables;
