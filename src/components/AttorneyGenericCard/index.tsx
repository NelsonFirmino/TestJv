import { AttorneyGenericCardProps } from "./interfaces/attorneyGenericCard.interface";
import * as S from "./styled";

export const GenericCard = ({
    title,
    children,
    style
}: AttorneyGenericCardProps) => {
    return (
        <S.Wrapper>
            <S.TitleContainer>
                <S.Title>{title}</S.Title>
            </S.TitleContainer>

            <S.CardContent style={style}>{children}</S.CardContent>
        </S.Wrapper>
    );
};
