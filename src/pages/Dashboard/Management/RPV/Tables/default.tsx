import JvrisTable from "../../../../../components/JvrisTable";
import { JvrisTableI } from "../../../../../components/JvrisTable/JvrisTable.interface";


const DefaultTable = (props: JvrisTableI) => {
    return (
        <JvrisTable
            columnDefaultOrder={{
                columnIndex: 3,
                order: "descendente"
            }}
            download
            {...props}
        />
    )
}

export default DefaultTable