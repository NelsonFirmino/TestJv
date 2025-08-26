import { useEffect, useState } from "react";
import {
  ParseToJvrisRedistributionRequests,
  redistributionRequestsColumns,
} from "./utils";
import { DefaultAttorneyTables } from "../styled";
import theme from "../../../../../../../globalStyle/theme";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";

const RedistributionRequestsTable = () => {
  const { managing, data } = useTablesContext();
  const { openModal } = useModalsContext();
  const [Tabledata, setTableData] = useState([]);

  useEffect(() => {
    if (Tabledata.length > 0) {
      managing.setLoadingData(false);
      managing.setLoadingStatus("");
    } else {
      managing.setLoadingData(true);
    }
  }, [Tabledata]);

  useEffect(() => {
    setTableData(
      ParseToJvrisRedistributionRequests(
        data.attorneyRedistributionRequestsList
      )
    );
  }, []);

  return (
    <div>
      {managing.selectedRows.length > 0 && (
        <button
          onClick={() => openModal(modalsID.avalPedidoRedistribuicao)}
          style={{
            display: "flex",
            width: "180px",
            height: "40px",
            borderRadius: "4px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.jvrisAqua,
            marginBottom: "2rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          <p
            style={{
              color: theme.colors.white,
              fontSize: "1.4rem",
            }}
          >
            Avaliar Pedidos
          </p>
        </button>
      )}
      {data.attorneyRedistributionRequestsList.length > 0 ? (
        <DefaultAttorneyTables
          ShowSelect
          onSelectedRows={(rows) => {
            const selectedRowsData = rows.map((row) => {
              return data.attorneyRedistributionRequestsList[row]
                .txNumeroFormatado;
            });

            managing.setSelectedRows(selectedRowsData);

            managing.resetSelectedData();
            managing.select(rows, data.attorneyRedistributionRequestsList);
          }}
          columns={redistributionRequestsColumns}
          data={Tabledata}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <p
            style={{
              color: theme.colors.softRed,
              fontSize: "1.4rem",
              //fontWeight: "bold"
            }}
          >
            Não foram encontrados pedidos de redistribuição
          </p>
        </div>
      )}
    </div>
  );
};

export default RedistributionRequestsTable;
