import { PresentationChart } from "@phosphor-icons/react";
import Select from "react-select";
import styled from "styled-components";
import media from "styled-media-query";

type ErrorDate = {
  error: string | undefined;
};

type CustomSelectProps = {
  error?: string | undefined;
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

export const TitlePageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid #f9fafb;
  background-color: ${({ theme }) => theme.colors.bgTitlePage};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const PageIcon = styled(PresentationChart)`
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

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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

export const SectionSelect = styled.section`
  display: flex;
  width: 100%;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 3rem;
  }

  &:nth-child(1) {
    margin-right: 2rem;
  }

  ${media.lessThan("medium")`
    flex-direction: column; /* Quebra no mobile */
    align-items: flex-start; /* Evita que fique centralizado estranho */
    margin-bottom: 3rem;
  `}

  ${media.greaterThan("medium")`
    flex-direction: row; /* Lado a lado no desktop */
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

export const ContainerField = styled.div`
  min-width: 35rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const FieldTitle = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-bottom: 0.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.7rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkerGrey};
  letter-spacing: 1px;
  margin-bottom: 2rem;
`;

export const FieldDateContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldContainer = styled.div`
  display: flex;
`;

export const LabelField = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.darkGrey};
  margin-top: 1rem;
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

export const DateInput = styled.input`
  font-size: 1.5rem;
  border: none;
  outline: none;
  background: none;
`;

export const CheckboxInput = styled.input`
  margin-left: 0.5rem;
`;

export const CheckboxTitle = styled.span`
  font-size: 1.3rem;
  margin-left: 0.5rem;
`;

export const CustomSelect = styled(Select)<CustomSelectProps>`
  width: 40rem;
  * {
    font-size: 1.3rem;
  }
  & > div {
    border: 1px solid
      ${({ theme, error }) => (error ? "#ca0000" : theme.colors.lighterGrey)};
  }
`;

export const CustomSelectNew = styled(Select)`
  width: 100%;
  max-width: 35rem;
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

export const WarningMessage = styled.span`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
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
