import { FadersHorizontal  } from "phosphor-react";
import styled from "styled-components";
import Select from "react-select";

export const Wrapper = styled.div`
  display: flex;
  position: relative;
`

export const ContainerButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.15rem;
  border-radius: 1rem;
  margin-right: 1rem;
  background-color: ${({ theme }) => theme.colors["gray/700"]};
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors["gray/900"]};
  }
`;

export const Icon = styled(FadersHorizontal)`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const ContainerSelect = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const NameColum = styled.h2`
  display: flex ;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors["gray/600"]};
`;

export const CustomSelect = styled(Select)`
  * {
    font-size: 1.2rem;
  };
  width: 26rem;
`;