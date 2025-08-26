import { DashboardCardProps } from './dashboard-card.interface'
import * as S from './styled'

export const DashboardCard = ({ title, children, button, request }: DashboardCardProps) => {
    return (
        <S.Wrapper>
            <S.ContainerCardTitle>
                <S.CardTitle>{title}</S.CardTitle>
                <S.CardButton>{button}</S.CardButton>
            </S.ContainerCardTitle>
            <S.CardBody>
                {request?.isLoading ? <S.LoadingSpinner /> : children}
            </S.CardBody>
        </S.Wrapper>
    )
}