import JvrisTable from "../../../../../components/JvrisTable";
import { JvrisTableI } from "../../../../../components/JvrisTable/JvrisTable.interface";

export const DefaultAttorneyTables = (props: JvrisTableI) => {
    return (
        <JvrisTable
            ShowSelect={false}
            download


            {...props}
        />
    );
};
