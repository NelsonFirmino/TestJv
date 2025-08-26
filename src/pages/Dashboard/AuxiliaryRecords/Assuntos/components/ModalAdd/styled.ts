import { XCircle } from "phosphor-react";
import styled from "styled-components";
import Select from "react-select";
import { MagnifyingGlass } from "phosphor-react";
import AsyncSelect from "react-select/async";

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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  background-color: white;
  min-width: 50rem;
  min-height: 20rem;
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
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: 2rem;
`;

export const ContainerProcessNumber = styled.div`
  display: flex;
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  margin-bottom: 2rem;
`;

export const ProcessNumber = styled.span`
  margin-left: 0.5rem;
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Form = styled.form`
  width: 100%;
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
  margin-bottom: 1rem;
  width: 100%;

  :last-child {
    margin-left: 2rem;
  }
`;

export const FieldTitle = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 0.5rem;
`;

export const CustomSelect = styled(Select)`
  width: 100%;
  * {
    font-size: 1.3rem;
  }
`;

export const CustomAutocomplete = styled(AsyncSelect)`
  width: 100%;
  min-width: 33rem;
  * {
    font-size: 1.3rem;
  }
`;

export const LettersCounter = styled.span`
  display: inline-block;
  margin-left: auto;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.jvrisAquaDark};
  margin-left: auto;
`;

export const TextAreaInput = styled.textarea`
  flex: auto;
  font-size: 1.3rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  text-indent: 0.5rem;
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.5rem;
  padding: 1rem 0.2rem;
  width: 100%;
`;

export const TextInput = styled.input`
  flex: auto;
  font-size: 1.3rem;
  height: 3.6rem;
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

export const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b7b9bb;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 500ms;
  margin-left: auto;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.lightGray};

  &:hover {
    background-color: #1ca59e;
  }

  &:active {
    background-color: #166c68;
  }
`;

export const SearchIcon = styled(MagnifyingGlass)`
  font-size: 2rem;
`;

export const WarningMessage = styled.div`
  display: flex;
  padding: 1rem;
  font-size: 1.5rem;
  width: 100%;
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.darkBlue};
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

export const OptionRemoveObservation = styled.div`
  cursor: pointer;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.softRed};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const OptionCancel = styled.div`
  cursor: pointer;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.darkBlue};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const OptionRemoveAttachment = styled.div`
  cursor: pointer;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.softRed};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const ContainerSubmitButton = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: end;
`;

export const SubmitButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : theme.colors.softGreen};
  outline: none;
  border: none;
  text-align: center;
  width: fit-content;
  padding: 1rem 2rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.1rem;
`;

export const LoadingSpinner = styled.div`
  animation: is-rotating 1s infinite;
  border: 2px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.jvrisAqua};
  height: 2rem;
  width: 2rem;
  margin: auto auto auto 1rem;

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;
