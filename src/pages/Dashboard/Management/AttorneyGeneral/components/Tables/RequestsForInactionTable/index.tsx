import { useEffect, useState } from "react";
import {
  ParseToJvrisRequestsForInaction,
  requestsForInactionColumns,
} from "./utils";
import { DefaultAttorneyTables } from "../styled";
import * as S from "./styled";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";

const RequestsForInactionTable = () => {
  const { managing, data } = useTablesContext();
  const { openModal } = useModalsContext();
  const [Tabledata, setTabledata] = useState([]);

  useEffect(() => {
    if (Tabledata.length > 0) {
      managing.setLoadingData(false);
      managing.setLoadingStatus("");
    } else {
      managing.setLoadingData(true);
    }
  }, [Tabledata]);

  useEffect(() => {
    async function setTable() {
      const tdata = await ParseToJvrisRequestsForInaction(
        data.attorneyRequestsForInactionList as any
      );
      setTabledata(tdata);
    }
    if (data.attorneyRequestsForInactionList) setTable();
  }, [data.attorneyRequestsForInactionList]);

  return (
    <>
      {managing.selectedRows.length > 0 && (
        <S.ModalWrapper>
          <S.RequestForInactionModal
            onClick={() => openModal(modalsID.acatarPedidos)}
          >
            Acatar Pedido(s)
          </S.RequestForInactionModal>
        </S.ModalWrapper>
      )}
      {
        <DefaultAttorneyTables
          ShowSelect
          onSelectedRows={(rows) => {
            const selectedRowsData = rows.map((row) => {
              return data.attorneyRequestsForInactionList[row].txNumeroProcesso;
            });

            managing.setSelectedRows(selectedRowsData);
            managing.resetSelectedData();
            managing.select(rows, data.attorneyRequestsForInactionList);
          }}
          columns={requestsForInactionColumns}
          data={Tabledata}
        />
      }
    </>
  );
};

export default RequestsForInactionTable;
