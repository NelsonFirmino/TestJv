import { ProcessoInAction } from '../../../../../../../api/services/attorneys/attorneys.interface'
import * as S from './styled'

interface PecaSymbolProps {
    data: ProcessoInAction
}

export const PecaSymbol = ({ data }: PecaSymbolProps) => {
    return (
        <S.PecaIcon
            weight='fill'
            idPeca={data.idPeca}
            alt={data.idPeca > 0 ? "Peça cadastrada para este ato" : "Não existe peça cadastrada para este ato"} />
    )
}