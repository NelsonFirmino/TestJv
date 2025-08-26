import { Circle } from "phosphor-react";
import styled from "styled-components";

type IsUrgente = {
  isUrgente: boolean;
};

type TagProps = {
  color: string;
};

export const RelevantIcon = styled(Circle)<IsUrgente>`
  font-size: 1.2rem;
  color: ${({ isUrgente, theme }) =>
    isUrgente ? theme.colors.darkRed : theme.colors.softGreen};
`;

export const TagStatus = styled.div<TagProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.05rem;
  border-radius: 0.5rem;
  padding: 1rem 0.5rem;
  background-color: ${({ color }) => color};
  color: ${({ theme }) => theme.colors.white};
`;
