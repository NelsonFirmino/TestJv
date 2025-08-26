import { BookmarkSimple } from "phosphor-react";
import styled from "styled-components";

type PecaIconProps = {
    idPeca: number;
};

export const PecaIcon = styled(BookmarkSimple)<PecaIconProps>`
    font-size: 1.4rem;
    color: ${({ theme, idPeca }) => idPeca > 0 ? theme.colors.softPurple : ""};
    opacity: ${({  idPeca }) => idPeca > 0 ? 1 : 0.15};
`;