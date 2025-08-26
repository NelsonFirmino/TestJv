import { XCircle } from "phosphor-react";
import styled from "styled-components";

type ErrorDate = {
  error: string | undefined;
};

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
  height: 100vh;
  width: 100%;
  transition: all 500ms;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  background-color: white;
  min-width: 50rem;
  min-height: 20rem;
  max-width: 70rem;
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

export const MsgContainer = styled.div`
  display: flex;
  padding: 1.5rem 1rem;
  border-radius: 1rem;
  background-color: #d9544f54;
  font-size: 1.2rem;
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

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ContentSection = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));

  &:not(last-child) {
    margin-bottom: 2rem;
  }
`;

export const ContainerField = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60rem;
`;

export const FieldTitle = styled.h3`
  display: flex;
  position: relative;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkerGrey};
  margin-bottom: 0.5rem;
  align-items: center;
`;

export const FieldContainer = styled.div`
  display: flex;
`;

export const DateContent = styled.div<ErrorDate>`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.lighterGrey};
  border: 1px solid
    ${({ theme, error }) => (error ? "#ca0000" : theme.colors.lighterGrey)};

  &:first-child {
    border-right: 1px solid ${({ theme }) => theme.colors.grey};
  }
`;

export const DateDescription = styled.span`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;

export const DateInput = styled.input`
  font-size: 1.5rem;
  border: none;
  outline: none;
  background: none;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Input = styled.input`
  flex: auto;
  font-size: 1.3rem;
  height: 3.8rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  text-indent: 1rem;
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.4rem;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.grey};
  }

  &:focus {
    outline: 1px solid #2684ff;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

export const OptionCancel = styled.div`
  cursor: pointer;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const OptionSave = styled.button`
  text-decoration: none;
  outline: none;
  background-color: ${({ disabled }) => (disabled ? "#b7b9bb" : " #1ca59e")};
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 500ms;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.lightGray};
  border: none;

  &:active {
    background-color: ${({ disabled }) => (disabled ? "#b7b9bb" : "#166c68")};
  }
`;

export const LoadingSpinner = styled.div`
  animation: is-rotating 1s infinite;
  border: 2px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.jvrisAqua};
  height: 2rem;
  width: 2rem;
  margin: auto;

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;
