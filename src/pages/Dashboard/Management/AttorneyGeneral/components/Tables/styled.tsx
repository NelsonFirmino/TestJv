import JvrisTable from "../../../../../../components/JvrisTable";
import { JvrisTableI } from "../../../../../../components/JvrisTable/JvrisTable.interface";
import { useTablesContext } from "../../context/TablesContext";

export const DefaultAttorneyTables = (props: JvrisTableI) => {
    const { data } = useTablesContext();
    return (
        <JvrisTable
            loading={{
                loadingData: data.loading.loadingData,
                loadingStatus: data.loading.loadingStatus,
            
            }}
            download
            ShowSelect

            {...props}
        />
    );
};
