import * as S from './styled'

export const ProcessNumber = ({ dataTable }: any) => {
    return (
        <S.Wrapper to={`/dashboard/detalhes-processo/espelho-processos/${dataTable.idProcesso}`}>{dataTable.txNumero}</S.Wrapper>
    )
}