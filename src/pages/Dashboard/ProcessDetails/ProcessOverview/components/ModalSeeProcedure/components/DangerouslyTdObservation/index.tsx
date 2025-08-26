import * as S from './styled'

interface DangerouslyTdObservationProps {
    dataTable: any,
    keyData: string
}

export const DangerouslyTdObservation = ({ dataTable, keyData }: DangerouslyTdObservationProps) => {
    return (
        <S.Td dangerouslySetInnerHTML={{ __html: dataTable[keyData] ? dataTable[keyData] : "--" }} />
    )
}