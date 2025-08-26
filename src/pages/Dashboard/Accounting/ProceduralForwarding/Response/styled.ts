import { CurrencyDollarSimple, House } from "phosphor-react";
import styled from "styled-components";
import media from "styled-media-query";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import theme from "../../../../../globalStyle/theme";

type ErrorDate = {
  error: string | undefined;
};

type ConditionalLabel = {
  value: boolean | undefined;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  min-height: 100%;
`;

export const FormContainer = styled.main`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
  height: 100%;
`;

export const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PageIcon = styled(House)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;

  ${media.greaterThan("medium")`
    flex-direction: row;
  `}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const Section = styled.section`
  align-items: center;
  width: 96%;
  margin-bottom: 3rem;
  margin-top: 2rem;
`;

export const LeftSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 8rem;
  padding-right: 15rem;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  &:nth-child(1) {
    margin-right: 2rem;
  }

  ${media.lessThan("medium")`
    margin-bottom: 3rem;
  `}

  ${media.greaterThan("medium")`
    &:nth-child(1) {
      margin-right: 3rem;
    }
  `}
`;

export const RightSection = styled.section`
  display: flex;
  flex-direction: column;

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
  padding-left: 2rem;
    &:nth-child(1) {
      margin-right: 3rem;
    }
  `}
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  height: 3rem;
  margin-bottom: 1.5rem;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
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

export const DateContainer = styled.div`
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

export const TextInput = styled.input`
  flex: auto;
  padding: 0 0.5rem;
  font-size: 1.3rem;
  width: auto;
  height: 3.8rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  /* text-indent: 1rem; */
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.4rem;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.grey};
  }

  &:focus {
    outline: 1px solid #2684ff;
  }
`;

export const DateInput = styled.input`
  font-size: 1.5rem;
  border: none;
  outline: none;
  background: none;
`;

export const CustomSelect = styled(Select)`
  width: 100%;
  * {
    font-size: 1.3rem;
  }
`;

export const CustomAutocomplete = styled(AsyncSelect)`
  width: 100%;
  * {
    font-size: 1.3rem;
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
  margin-top: 3rem;
`;

export const SubmitButton = styled.button`
  transition: all 500ms ease;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
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

export const RadioButtonLabel = styled.label<ConditionalLabel>`
  position: absolute;
  z-index: 1;
  font-size: 1.2rem;
  font-weight: bold;
  user-select: none;
  pointer-events: none;
  margin-top: 0.8rem;
  color: white;
  transition: margin-left 500ms;

  margin-left: ${({ value }) => (value ? "1.8rem" : "5.8rem")};
`;

export const RadioButtonContainer = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const WarningMessage = styled.span`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
`;

export const ToggleButton = styled.input.attrs({ type: "checkbox" })`
  position: relative;
  width: 10rem;
  height: 3rem;
  outline: none;
  appearance: none;
  cursor: pointer;
  border-radius: 2rem;
  background-color: ${({ theme }) => theme.colors.softRed};
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.gray};
  transition: background-color 750ms;

  &:checked {
    background-color: ${({ theme }) => theme.colors.softGreen};
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -0.1%;
    top: 0;
    width: 5rem;
    height: 3rem;
    background: #f2f2f2;
    border-radius: 2rem;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.gray};
    transform: scale(0.98, 0.96);
    transition: 500ms;
  }

  &:checked::before {
    left: 5.1rem;
  }
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

export const SectionTitleName = styled.div`
  font-size: 1.5rem;
`;

export const SectionDataRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 1rem 1rem 1rem;
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
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
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
  font-size: 1.2rem;
  word-wrap: break-word;
`;

export const SectionValue = styled.div`
  display: flex;
  justify-content: end;
`;

export const SectionValueImg = styled.img`
  size: 20rem;
`;

export const SectionDataInfoParties = styled.div`
  font-size: 1.2rem;
  word-wrap: break-word;
  padding-right: 0.5rem;
`;

export const ContentTextArea = styled.textarea`
  font-size: 1.2rem;
  outline: none;
  background: none;
  width: 32rem;
  min-width: 20rem;
  min-height: 10rem;
  padding: 1rem;
  border: 1px solid ${theme.colors.grey};
  border-radius: 5px;
  margin-right: 2rem;
`;
