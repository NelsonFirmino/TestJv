import { List, Plus } from "phosphor-react";
import styled from "styled-components";
import media from "styled-media-query";
import Select from "react-select";
import { Link } from "react-router-dom";

type ErrorDate = {
  error: string | undefined;
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

export const PageIcon = styled(List)`
  font-size: 2rem;
  margin-right: 1rem;
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

export const TitlePage = styled.h2`
  color: ${({ theme }) => theme.colors.titlePage};
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`;

export const RedirectPage = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 50%;
  margin-left: auto;
  width: 4rem;
  height: 4rem;
  transition: all 500ms;
  background-color: ${({ theme }) => theme.colors.pageButton};

  &:hover {
    background-color: ${({ theme }) => theme.colors.pageButtonDark};
  }
`;

export const RedirectPageIcon = styled(Plus)`
  font-size: 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
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

  & > * {
    position: relative;
    z-index: 150;
  }
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

export const ErrorMessage = styled.span`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.softRed};
`;

export const WarningMessage = styled.span`
  margin-top: 0.5rem;
  font-size: 1.1rem;
  font-weight: bold;
`;

export const SubmitButton = styled.button`
  position: relative;
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
  color: white;
  border-radius: 0.5rem;
  font-size: 1.5rem;
`;

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
`;

export const LoadingSpinner = styled.div`
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
