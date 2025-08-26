import { Circle } from "phosphor-react";
import styled from "styled-components";

type RelecanciaAtoIcon = {
  isUrgente: boolean;
};

export const RelecanciaAtoIcon = styled(Circle)<RelecanciaAtoIcon>`
  font-size: 1.4rem;
  color: ${({ theme, isUrgente }) =>
    !isUrgente ? theme.colors.softGreen : theme.colors.softOrange};
`;
