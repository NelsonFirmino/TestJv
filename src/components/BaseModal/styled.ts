import { X } from "phosphor-react";
import styled from "styled-components";

type ModalProps = {
  isOpen: boolean;
};

type ModalContainerProps = {
  isSchedule: boolean;
  isSelect?: boolean;
  isReports?: boolean;
};

export const Wrapper = styled.div<ModalProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  transition: all 0.3s;
  background-color: ${({ isOpen }) =>
    isOpen ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0)"};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  height: 100vh;
  width: 100%;
  pointer-events: ${({ isOpen }) => (isOpen ? "all" : "none")};
`;

export const ModalContainer = styled.div<ModalContainerProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 1rem;
  min-width: ${({ isSchedule }) => (isSchedule ? "70rem" : "50rem")};
  max-width: ${({ isSchedule }) => (isSchedule ? "70rem" : "80rem")};
  min-height: ${({ isSchedule }) => (isSchedule ? "42rem" : "")};
  max-height: ${({ isSchedule }) => (isSchedule ? "42rem" : "60rem")};
  overflow-y: ${({ isSelect }) => (isSelect ? "visible" : "auto")};
  padding: 1.5rem;
  padding-top: 0;
  background-color: ${({ theme }) => theme.colors["gray/50"]};
  border: 1px solid ${({ theme }) => theme.colors["gray/300"]};

  @media (max-width: 450px) {
    min-width: ${({ isSchedule }) => (isSchedule ? "70rem" : "36rem")};
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  background-color: ${({ theme }) => theme.colors["gray/50"]};
  top: 0;
  z-index: 200;
  border-bottom: 1px solid ${({ theme }) => theme.colors["gray/300"]};
  padding-bottom: 1rem;
  padding-top: 1.5rem;
  margin-bottom: 1rem;
  flex: 1;
  width: 100%;
`;

export const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors["gray/900"]};
`;

export const CloseModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const CloseIcon = styled(X)`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors["gray/900"]};
  cursor: pointer;
  transition: all 500ms;

  &:hover {
    color: ${({ theme }) => theme.colors.darkRed};
  }
`;

export const BodyModal = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;
