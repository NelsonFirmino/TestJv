import styled from "styled-components";

type ModalContainerProps = {
  isOpen?: boolean;
  onClick?: () => void;
};

export const Overlay = styled.div<ModalContainerProps>`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  position: fixed;
  /* top: 0;
  left: 0;
  right: 0;
  left: 0; */
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  overflow: auto; /* Permite que a sobreposição role se necessário */
`;

export const ModalContainer = styled.div<ModalContainerProps>`
  top: 0;
  left: 100%;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  border-radius: 1rem;
  padding: 1.5rem;
  background-color: ${({ theme }) => theme.colors["gray/50"]};
  border: 1px solid ${({ theme }) => theme.colors["gray/300"]};
  z-index: 2000;
`;
