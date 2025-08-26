import styled from "styled-components";
import Select from "react-select";
import { MagnifyingGlass } from "phosphor-react";

export const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkerGrey};
  letter-spacing: 1px;
  margin-bottom: 1rem;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
`;

export const MsgContainer = styled.div`
  display: flex;
  padding: 1.5rem 1rem;
  border-radius: 1rem;
  background-color: #d9544f54;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const ContainerForm = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.lightGray};
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
  margin-top: 2rem;
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
  cursor: pointer;
  border: none;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.softGreen};
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.white};
`;

export const CustomSelect = styled(Select)`
  width: 100%;
  * {
    font-size: 1.3rem;
  }
  & > div {
    border: 1px solid ${({ theme }) => theme.colors.lighterGrey};
  }
`;
