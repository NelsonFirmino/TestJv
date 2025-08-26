import { BookBookmark, CheckFat, Minus, Trash } from "@phosphor-icons/react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import styled from "styled-components";

type ConditionalLabel = {
  value: boolean | undefined;
};

const calculateWidth = (numElements) => {
  // Defina suas regras de largura aqui, dependendo do número de elementos
  if (numElements <= 3) {
    return "20rem";
  } else {
    return "30rem";
  }
};

export const Wrapper = styled.div``;

export const PageIcon = styled(BookBookmark)`
  font-size: 2rem;
  margin-right: 1rem;
`;

export const Form = styled.form`
  width: 100%;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;

  &:not(last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.lighterGray};
  }
`;

export const TitleSectionContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

export const TitleSection = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.darkGrey};
`;
type numElements = {
  numElements: number;
};
export const ContentSectionFirstRow = styled.div<numElements>`
  display: flex;
  justify-content: space-between;
  max-width: ${({ numElements }) => {
    // Use um ternário para determinar o width com base no número de elementos
    return numElements <= 3 ? "60%" : "100%";
  }};

  &:not(last-child) {
    margin-bottom: 2rem;
  }
`;

export const ContentSection = styled.div`
  display: flex;
  justify-content: space-between;

  &:not(last-child) {
    margin-bottom: 2rem;
  }
`;

export const ObservationContentSection = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));

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

export const SectionDataPartiesCapsule = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  &:not(:last-child) {
    margin-right: 2rem;
    /* margin-bottom: 1rem; */
  }

  @media (max-width: 900px) {
    &:not(:first-child) {
      margin-top: 1rem;
    }
  }
`;

export const SectionTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkerGrey};
  letter-spacing: 1px;
  margin-bottom: 1rem;
`;

export const SectionDataInfo = styled.div`
  min-width: 10rem;
  font-size: 1.4rem;
  font-weight: bold;
`;

export const SectionDataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const CustomSelect = styled(Select)`
  min-width: 20rem;
  * {
    font-size: 1.3rem;
  }
`;

export const CustomAutocomplete = styled(AsyncSelect)`
  min-width: 30rem;
  * {
    font-size: 1.3rem;
  }
`;

export const TextInput = styled.input<{
  disabled?: boolean;
}>`
  flex: auto;
  font-size: 1.3rem;
  height: 3.9rem;
  max-height: 3.9rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  text-indent: 1rem;
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.4rem;

  background-color: ${({ disabled }) => (disabled ? "#f2f2f2" : "white")};

  &:hover {
    border: ${({ disabled }) =>
      disabled ? "" : `1px solid ${({ theme }) => theme.colors.grey};`};
  }

  &:focus {
    outline: 1px solid #2684ff;
  }
`;

export const TextAreaInput = styled.textarea`
  flex: auto;
  font-size: 1.3rem;
  min-height: 10rem;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  text-indent: 1rem;
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.5rem;
  padding: 1rem 0.2rem;
  width: 100%;
`;

// SELECT

export const RadioButtonContainer = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
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

export const ContainerTable = styled.div`
  width: 100%;
  max-width: 30rem;
  padding: 1rem 0;
  background-color: #f2f2f2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);

  &:not(last-child) {
    margin-bottom: 1rem;
  }
`;

export const ContainerObservationTable = styled.div`
  width: 100%;
  padding: 1rem 0.5rem;
`;

export const Title = styled.h2`
  text-align: left;
  font-size: 1.4rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  padding-left: 1rem;
  padding-bottom: 1rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    text-align: left;
    font-size: 1.2rem;
  }
`;

export const ObservationContainer = styled.div`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    text-align: left;
    font-size: 1.2rem;
  }
`;

export const RowTable = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
`;

export const RowTableObservation = styled.tr`
  border-top: 1px solid ${({ theme }) => theme.colors.gray};
  &:nth-child(odd) {
    background-color: #f1f2f7;
  }
`;

export const MainTh = styled.th`
  width: 90%;
`;

export const MainTd = styled.td`
  width: 90%;
`;

export const SecundaryTh = styled.td`
  width: 10%;
`;

export const SecundaryTd = styled.td`
  vertical-align: middle;
`;

export const WarningNotFound = styled.p`
  margin: 1rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.softOrange};
`;

export const AddPartButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 500ms;
  margin-left: auto;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.lightGray};

  &:hover {
    background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
  }
`;

export const MainPartButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b7b9bb;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 500ms;

  &:not(last-child) {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.softGreen};
  }

  &:active {
    background-color: #3c7b3c;
  }
`;

export const RemovePartButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b7b9bb;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 500ms;

  &:not(last-child) {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.softRed};
  }

  &:active {
    background-color: #90312e;
  }
`;

export const isPrincipalPartButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b7b9bb;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 500ms;

  &:not(last-child) {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.softGreen};
  }

  &:active {
    background-color: #367136;
  }
`;

export const CheckIcon = styled(CheckFat)`
  font-size: 1.2rem;
  color: white;
`;

export const MinusIcon = styled(Minus)`
  font-size: 1.2rem;
  color: white;
`;

export const RemoveIcon = styled(Trash)`
  font-size: 1.3rem;
  color: white;
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

export const FormContainer = styled.main`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
  height: 100%;
`;

export const FormObservation = styled.form`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ContainerSubmitObservation = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: end;
`;

export const SubmitObservationForm = styled.button`
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

  &:hover {
    background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
  }

  &:active {
    background-color: ${({ disabled }) => (disabled ? "#b7b9bb" : "#166c68")};
  }
`;

export const WarningMessage = styled.span`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
`;

export const LoadingSpinnerObservation = styled.div`
  animation: is-rotating 1s infinite;
  border: 2px solid ${({ theme }) => theme.colors.mediumGrey};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.colors.jvrisAqua};
  height: 2rem;
  width: 2rem;
  margin-left: 1rem;

  @keyframes is-rotating {
    to {
      transform: rotate(1turn);
    }
  }
`;
