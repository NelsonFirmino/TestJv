import { ProcessoInAction } from '../../../../../../../api/services/attorneys/attorneys.interface'
import { formatStatusDateDashboard } from '../../../../../../../utils/formatStatusDateDashboard.util'
import * as S from './styled'

interface StatusProcessProps {
    data: ProcessoInAction
}

export const StatusProcess = ({ data }: StatusProcessProps) => {
    const { color, prazo } = formatStatusDateDashboard(data.dtPrazo);
    return (
        <S.Wrapper color={color}>{prazo}</S.Wrapper>
    )
}