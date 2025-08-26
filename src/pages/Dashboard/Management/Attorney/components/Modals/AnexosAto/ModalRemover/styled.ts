import { XCircle } from "phosphor-react";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  transition: all 500ms;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  background-color: white;
  min-width: 40rem;
  overflow: hidden;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

export const TitleModal = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
`;

export const CloseModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6rem 1rem;
  border-radius: 1rem;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.softYellow};
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.lighterGrey};
  transition: all 500ms;

  &:hover {
    background-color: ${({ theme }) => theme.colors.softYellowDark};
  }
`;

export const CloseIcon = styled(XCircle)`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.colors.lightGray};
  cursor: pointer;
  transition: all 500ms;

  &:hover {
    color: red;
  }
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  padding: 2rem;
`;

export const ContainerField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldTitle = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 0.5rem;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const ComfirmButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ theme }) => theme.colors.softGreen};
  outline: none;
  border: none;
  text-align: center;
  width: 10rem;
  padding: 1rem 2rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.1rem;
`;

export const CancelButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ theme }) => theme.colors.softRed};
  outline: none;
  border: none;
  text-align: center;
  width: 10rem;
  padding: 1rem 2rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.1rem;
`;
