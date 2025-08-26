import { Columns } from "./utils";
import { DefaultAttorneyTables } from "../styled";
import usePPC from "./usePPC";
import { SecretariasI } from "./interfaces";
import { useEffect } from "react";
import { LoadingSpinner2 } from "../../../../../../../components/Loading/styled";

export interface ProcessosTableI {
  setSecretarias: React.Dispatch<React.SetStateAction<SecretariasI[]>>
  setData: React.Dispatch<React.SetStateAction<any>>
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ProcessosTable = (props: ProcessosTableI) => {

  const { setSecretarias, setData, setOpenModal } = props;
  const { tableData, tableClicable, ProcPendentes } = usePPC(
    {
      setSecretarias,
      setData,
      setOpenModal
    }
  );

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",

    }}>
      {!tableData.length ?
        <LoadingSpinner2 style={{
          width: "100px",
          height: "100px",
          borderWidth: "10px",
        }} />
        :
        <DefaultAttorneyTables
          columns={Columns}
          data={tableData}
          ClicableButton={tableClicable}
        />
      }

    </div>
  );
};

export default ProcessosTable;
