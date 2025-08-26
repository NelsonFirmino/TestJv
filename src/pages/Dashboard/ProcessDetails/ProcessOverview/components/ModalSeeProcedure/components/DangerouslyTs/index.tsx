import * as S from './styled'

interface DangerouslyTsProps {
    dataTable: any,
    keyData: string
}

export const DangerouslyTs = ({ dataTable, keyData }: DangerouslyTsProps) => {
    return (
        <S.Td dangerouslySetInnerHTML={{ __html: dataTable[keyData] }} />
    )
}