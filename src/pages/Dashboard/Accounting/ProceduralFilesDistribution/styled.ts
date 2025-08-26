import { CurrencyDollarSimple } from "phosphor-react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import styled from "styled-components";
import media from "styled-media-query";

export type ErrorDate = {
    error?: string;
};

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    min-height: 100%;
`;

export const ExeDistB = styled.div`
    width: 18rem;
    height: 4rem;
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    align-items: center;
    justify-content: center;
    color: white;
    display: flex;
    border-radius: 0.5rem;
    transition: all 500ms ease;
    cursor: pointer;

    p {
        font-size: 1.4rem;
        margin: 0;
    }

    &:hover {
        background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
    }
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

export const PageIcon = styled(CurrencyDollarSimple)`
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
      margin-right: 2rem;
    }
  `}
`;

export const LeftSection = styled.section`
    display: flex;
    flex-direction: column;

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
    font-size: 1.3rem;
    height: 3.8rem;
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

export const ContainerButtons = styled.div`
    display: flex;
`;

export const SubmitButton = styled.button`
    transition: all 500ms ease;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    //margin-top: 3rem;
    height: 3.6rem;
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
    height: 3.6rem;
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

export const CustomAutocomplete = styled(AsyncSelect)`
    width: 100%;
    * {
        font-size: 1.3rem;
    }
`;
