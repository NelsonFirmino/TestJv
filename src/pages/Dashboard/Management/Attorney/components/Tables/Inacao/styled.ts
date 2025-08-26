import styled from "styled-components";

type WrapperProps = {
    isOpen: boolean;
}

type OptionsForSelectedProcessContainerProps = {
  isOpen: boolean;
}

export const Wrapper = styled.div<WrapperProps>`
  transition: all 500ms;
  display: ${({ isOpen }) => isOpen ? "flex" : "none"};
  flex-direction: column;
  padding: 0rem 2rem 2rem 2rem;
`;

export const ContainerSwitch = styled.div`
    display: flex;
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid ${({ theme }) => theme.colors["gray/400"]};
`;

export const OptionsForSelectedProcessContainer = styled.section<OptionsForSelectedProcessContainerProps>`
  margin-top: 1rem;
  display: flex;
  transition: all 500ms;
  opacity: ${({ isOpen }) => isOpen ? 1 : 0};
  overflow: ${({ isOpen }) => isOpen ? "visible" : "hidden"};
  width: ${({ isOpen }) => isOpen ? "auto" : "0"};
  height: ${({ isOpen }) => isOpen ? "auto" : "0"};
  font-size: 1rem;
`;