import * as S from './styled'

export const Relevant = ({ dataTable }: any) => {
    return (
        <S.ConditionalTextRelevant isUrgente={dataTable.isUrgente}>{dataTable.isUrgente ? "URGENTE" : "NORMAL"}</S.ConditionalTextRelevant>
    )
}