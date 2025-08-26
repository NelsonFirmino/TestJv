import { useContext, useEffect, useState } from "react";
import {
  ParseToJvrisRequestsForInaction,
  requestsForInactionColumns,
} from "./utils";

import { DefaultAttorneyTables } from "../styled";
import * as S from "./styled";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";

const PedidosInacaoTable = () => {
  const { managing, data } = useTablesContext();
  const { openModal } = useModalsContext();
  const [Tabledata, setTabledata] = useState([])

  useEffect(() => {
    async function setTable() {
      const tdata = await ParseToJvrisRequestsForInaction(data.attorneyRequestsForInactionList as any)
      setTabledata(tdata)
    }
    if (data.attorneyRequestsForInactionList) setTable()
  }, [data.attorneyRequestsForInactionList])

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
          hasData={data.attorneyRequestsForInactionList.length > 0}
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

export default PedidosInacaoTable;
