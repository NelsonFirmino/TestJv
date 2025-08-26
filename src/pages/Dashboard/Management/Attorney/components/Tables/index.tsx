import ProcessosEmOperacaoTable from "./ProcessosOperacao";
import PedidosInacaoTable from "./PedidosInacao";
import PedidosRedistribuicaoTable from "./PedidosRedistribuicao";
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
          marginBottom: "10px",
        }}
        resetSelected={() => managing.setSelectedRows([])}
        switchers={[
          {
            amount: data.attorneyProcessesInOperationList.length,
            name: "Processos em atuação",
          },
          { amount: 0, name: "Pedidos de informação" },
          {
            amount: data.attorneyRequestsForInactionList.length,
            name: "Pedidos de inação",
          },
          {
            amount: data.attorneyRedistributionRequestsList.length,
            name: "Pedidos de redistribuição",
          },
          { amount: 0, name: "Pedidos de ingresso no feito" },
        ]}
      />
      {managing.showingTable == 0 ? (
        <ProcessosEmOperacaoTable />
      ) : managing.showingTable == 1 ? (
        <></>
      ) : managing.showingTable == 2 ? (
        <PedidosInacaoTable />
      ) : managing.showingTable == 3 ? (
        <PedidosRedistribuicaoTable />
      ) : (
        <></>
      )}
    </>
  );
};

export default AttorneyTables;
