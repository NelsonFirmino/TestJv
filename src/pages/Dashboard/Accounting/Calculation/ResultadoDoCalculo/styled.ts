import { CurrencyDollarSimple } from "phosphor-react";
import Select from "react-select";
import styled from "styled-components";
import media from "styled-media-query";
import theme from "../../../../../globalStyle/theme";

type ErrorDate = {
  error: string | undefined;
};

type CustomSelectProps = {
  error?: string | undefined;
};

type ButtonProps = {
  isCurrent: boolean;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 2rem; */
`;

export const FormContainer = styled.main`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
  height: 100%;
`;

export const TitlePageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #f9fafb;
  background-color: ${({ theme }) => theme.colors.bgTitlePage};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const PageIcon = styled(CurrencyDollarSimple)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const TitlePage = styled.h2`
  color: ${({ theme }) => theme.colors.titlePage};
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.greaterThan("medium")`
    flex-direction: row;
  `}
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  &:nth-child(1) {
    margin-right: 2rem;
  }

  ${media.lessThan("medium")`
    margin-bottom:3rem;
  `}

  ${media.greaterThan("medium")`
    &:nth-child(1) {
      margin-right: 3rem;
    }
  `}

  ${media.greaterThan("large")`
    &:nth-child(1) {
      margin-right: 10rem;
    }
  `}
`;

export const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkerGrey};
  letter-spacing: 1px;
  margin-bottom: 1rem;
`;

export const FieldDateContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldContainer = styled.div`
  display: flex;
`;

export const LabelField = styled.label`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 1rem;
`;

export const TextInput = styled.input`
  flex: auto;
  font-size: 1.3rem;
  height: 3.6rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  text-indent: 1rem;
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.4rem;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.gray};
  }

  &:focus {
    outline: 1px solid #2684ff;
  }
`;

export const CustomSelect = styled(Select)<CustomSelectProps>`
  width: 30rem;
  * {
    font-size: 1.3rem;
  }
  & > div {
    border: 1px solid
      ${({ theme, error }) => (error ? "#ca0000" : theme.colors.lighterGrey)};
  }
`;

export const ErrorMessage = styled.span`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.softRed};
`;

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-bottom: 3rem;
`;

export const VoltarButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 500ms ease;
  cursor: pointer;
  background-color: ${theme.colors["gray/400"]};
  outline: none;
  border: none;
  text-align: center;
  width: 8rem;
  height: 3.5rem;
  padding: 1rem;
  color: white;
  border-radius: 1rem;
  font-size: 1.5rem;
  gap: 0.2rem;

  :hover {
    background-color: ${theme.colors["gray/500"]};
  }
`;

export const AbaButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ isCurrent }) =>
    !isCurrent ? theme.colors.jvrisAqua : theme.colors["gray/700"]};
  outline: none;
  text-align: center;
  border: none;
  width: 15rem;
  height: 3.5rem;
  padding: 1rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 1rem;
  font-size: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);

  :hover {
    background-color: ${({ theme }) => theme.colors["gray/800"]};
  }
`;

export const SubmitButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-top: 3rem;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : theme.colors.softGreen};
  outline: none;
  border: none;
  text-align: center;
  width: 15rem;
  padding: 1rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.5rem;
`;

export const ClearButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-top: 3rem;
  margin-left: 2rem;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : theme.colors.bgCleanButton};
  outline: none;
  border: none;
  text-align: center;
  width: 15rem;
  padding: 1rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.5rem;
`;

export const RespostaButton = styled.button<ButtonProps>`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-top: 3rem;
  background-color: ${({ isCurrent }) =>
    isCurrent ? theme.colors.darkBlue : theme.colors.softBlue};
  outline: none;
  border: none;
  text-align: center;
  width: 15rem;
  padding: 1rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.5rem;

  :hover {
    background-color: ${({ isCurrent }) =>
      isCurrent ? theme.colors.darkBlue : theme.colors.blue};
  }
`;

export const SalvarButton = styled.button`
  transition: all 500ms ease;
  margin-top: 3rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.grey : theme.colors.jvrisAqua};
  outline: none;
  border: none;
  text-align: center;
  width: 15rem;
  padding: 1rem;
  letter-spacing: 1px;
  color: white;
  border-radius: 0.5rem;
  font-size: 1.5rem;

  :hover {
    background-color: ${({ theme, disabled }) =>
      disabled ? theme.colors["gray/400"] : theme.colors.jvrisAquaDark};
  }
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SectionTitleName = styled.div`
  font-size: 1.5rem;
`;

export const SectionDataRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0rem;
  flex-wrap: wrap;
`;

export const SectionDataRowTextArea = styled.div`
  display: flex;
  justify-content: initial;
  margin: 1rem;
  flex-wrap: wrap;
`;

export const SectionDataCapsule = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 40rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const SectionDataPartiesCapsule = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const SectionDataTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

export const SectionDataContainer = styled.div`
  display: flex;
`;

export const SectionData = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.grey};
  background-color: ${({ theme }) => theme.colors.lightGray};
  padding: 1rem;
  padding-right: 3rem;

  :hover {
    background-color: ${({ theme }) => theme.colors.lightGrey};
  }
`;

export const SectionDataInfo = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;

export const SectionDataInfoSum = styled.div`
  font-size: 1.2rem;
  word-wrap: break-word;
`;

export const SectionValue = styled.div`
  display: flex;
  justify-content: end;
`;

export const SectionSum = styled.section`
  align-items: center;
  width: 96%;
  margin-bottom: 3rem;
  margin-top: 2rem;
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
  min-height: 10rem;
  height: 15rem;
  resize: none;
`;
