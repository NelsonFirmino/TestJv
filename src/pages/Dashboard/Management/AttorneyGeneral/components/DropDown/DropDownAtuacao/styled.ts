import { CaretDown } from "phosphor-react";
import styled from "styled-components";

type ContainerOptionsProps = {
  showOptions: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  position: relative;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
  }
`;

export const DropDownIcon = styled(CaretDown)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const ContainerOptions = styled.div<ContainerOptionsProps>`
  display: ${({ showOptions }) => (showOptions ? "flex" : "none")};
  opacity: ${({ showOptions }) => (showOptions ? 1 : 0)};
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.darkGrey};
  align-items: center;
  transition: all 500ms;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};
  width: 5rem;
`;
