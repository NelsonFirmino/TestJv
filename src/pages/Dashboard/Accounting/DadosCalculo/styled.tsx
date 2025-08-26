import { CurrencyDollarSimple, MagnifyingGlass, Plus } from "phosphor-react";
import Select from "react-select";
import styled from "styled-components";
import media from "styled-media-query";
import theme from "../../../../globalStyle/theme";

type CustomSelectProps = {
  error?: string | undefined;
};

type ButtonProps = {
  isCurrent: boolean;
};
type ConditionalLabel = {
  value: boolean | undefined;
};

export const PageIcon = styled(CurrencyDollarSimple)`
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export const FieldTitle = styled.h3`
  display: flex;
  position: relative;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkerGrey};
  margin-bottom: 0.5rem;
  align-items: center;
`;

export const SearchIcon = styled(MagnifyingGlass)`
  width: 13px;
  height: 13px;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-left: 0.5rem;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.jvrisAqua};
  }
`;

/*
 background-color: ${({ disabled }) => (disabled ? "#f2f2f2" : "")};
  border-color: ${({ disabled }) => (disabled ? "#e6e6e6" : "")};
  color: ${({ disabled }) => (disabled ? "#999999" : "")};
*/

export const DateInput = styled.input`
  text-indent: 0.3rem;
  font-size: 1.3rem;
  height: 3.6rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  outline: ${({ theme }) => theme.colors.softGreen};
  //width: 100%;
  border-radius: 0.4rem;
  * {
    font-size: 1.3rem;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.grey};
  }

  &:focus {
    outline: 1px solid #2684ff;
  }
`;

export const SelectInput = styled(Select)`
  flex: auto;
  font-size: 1.3rem;
  height: 3.6rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  outline: ${({ theme }) => theme.colors.softGreen};
  border-radius: 0.4rem;
  * {
    font-size: 1.3rem;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.grey};
  }

  &:focus {
    outline: 1px solid #2684ff;
  }
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

export const ContainerField = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
export const ContainerFieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  /* gap: 3rem; */
  /* margin-top: 2rem; */
  /* justify-content: space-evenly; */
  /* align-items: center; */
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 95%;
  /* height: 25rem; */
`;

export const ContainerExequente = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 33rem; */
`;

export const ContainerExequenteButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

export const AddB = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.3rem;
  width: 4.4rem;
  height: 3.6rem;
  border-radius: 10%;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  border: none;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const FormExequente = styled.form``;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;

  &:not(:last-child) {
    margin-bottom: 3rem;
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
  font-size: 1.4rem;
  font-weight: bold;
  margin-top: -1.5rem;
`;

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
  max-width: 60rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const SectionDataInfoSum = styled.div`
  font-size: 1.2rem;
  word-wrap: break-word;
`;

export const SectionTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkerGrey};
  letter-spacing: 1px;
  margin-bottom: 2rem;
`;

export const SectionInfoTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkerGrey};
  margin-bottom: 1rem;
`;

export const CustomSelect = styled(Select)<CustomSelectProps>`
  width: 35rem;
  * {
    font-size: 1.3rem;
  }
`;

export const CustomSelectCalc = styled(Select)<CustomSelectProps>`
  width: 25rem;
  * {
    font-size: 1.3rem;
  }
`;

export const CustomSelectVinc = styled(Select)<CustomSelectProps>`
  width: 12rem;
  * {
    font-size: 1.3rem;
  }
`;

export const CustomSelectExequente = styled(Select)<CustomSelectProps>`
  width: 23rem;
  * {
    font-size: 1.3rem;
  }
  .react-select__menu {
    z-index: 999999; /* Certifique-se de que o z-index seja maior que o do modal */
  }
`;

export const InputDate = styled.input`
  font-size: 15px;
  outline: none;
  background: none;
  text-align: start;
  width: 100%;
  max-width: 15rem;
  max-height: 40px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors["gray/400"]};
  border-radius: 5px;
`;

export const ContainerButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
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

export const ExcluirButton = styled.button`
  transition: all 500ms ease;
  cursor: pointer;
  margin-top: 3rem;
  background-color: ${({ theme }) => theme.colors.softRed};
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
    background-color: ${({ theme }) => theme.colors.darkRed};
  }
`;

export const ExequenteButtons = styled.div`
  display: flex;
`;

export const AddExequenteButton = styled(Plus)`
  width: 3.5rem;
  height: 3.5rem;
  margin-left: 2rem;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.jvrisAqua};
  border-radius: 6px;
  color: white;
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
    transition: 300ms;
  }
`;

export const SectionTitleExequente = styled.div`
  font-size: 1.3rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkerGrey};
  margin-bottom: 0.5rem;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.greaterThan("medium")`
    flex-direction: row;
  `}
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FieldContainer = styled.div`
  display: flex;
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
