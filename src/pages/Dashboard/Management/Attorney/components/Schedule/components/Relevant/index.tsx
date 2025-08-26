import { Circle } from 'phosphor-react'
import * as S from './styled'

export const Relevant = ({ dataTable }: any) => {

    let icon = <Circle weight='bold' color='#5CB85C' size={"1.5rem"} alt='Normal' />
    switch (dataTable.txRelevancia) {
        case "Urgente":
            icon = <Circle weight='fill' color='#C66422' size={"1.5rem"} alt='Urgente' />
            break;
    }

    return (
        <S.Wrapper>{icon}</S.Wrapper>
    )
}