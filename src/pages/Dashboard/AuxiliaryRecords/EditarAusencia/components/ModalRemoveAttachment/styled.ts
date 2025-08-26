import { XCircle } from "phosphor-react";
import styled from "styled-components";
import Select from "react-select";
import { MagnifyingGlass } from "phosphor-react";

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
  min-width: 40rem;
  min-height: 20rem;
  overflow: hidden;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.softOrange};
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

export const FieldTitle = styled.h3`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkerGrey};
  margin-bottom: 0.5rem;
`;

export const CustomSelect = styled(Select)`
  width: 100%;
  * {
    font-size: 1.3rem;
  }
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
