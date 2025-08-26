import styled from "styled-components";
import Select from "react-select";
import { MagnifyingGlass } from "phosphor-react";

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

export const ContainerProcessNumber = styled.div`
  display: flex;
  font-size: 1.2rem;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
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
  min-height: 12rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  text-indent: 1rem;
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
  margin-top: 3rem;
  display: flex;
  align-items: center;
`;

export const SubmitButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : theme.colors.softGreen};
  outline: none;
  border: none;
  text-align: center;
  padding: 01rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  margin-right: 1rem;
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
