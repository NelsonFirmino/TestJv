import { Partes } from "../../../../../../api/services/partes/partes.interface"

interface PersonTypeProps {
    data: Partes
}

export const PersonType = ({ data }: PersonTypeProps) => {
    return <>
        {data.txTipoPessoa === "F" ? "Física" : "Jurídica"}
    </>
}