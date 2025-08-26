import * as S from './styled'

export const BlockedStatus = ({dataTable}: any) => {
    return (
        <S.Wrapper>{dataTable?.isBloqueado ? <S.BlockedStatus>Sim</S.BlockedStatus> : 'Não'}</S.Wrapper>
    )
}