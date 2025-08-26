import { Info, PresentationChart } from "phosphor-react";
import Select from "react-select";
import styled from "styled-components";
import media from "styled-media-query";

type ErrorDate = {
    error: string | undefined;
};

type CustomSelectProps = {
    error?: boolean;
};

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
`;

export const FormContainer = styled.main`
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
    height: 100%;
`;
export const WarningMessage = styled.span`
    margin-top: 0.5rem;
    font-size: 1.1rem;
    font-weight: bold;
`;
export const TitlePageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid #f9fafb;
    background-color: ${({ theme }) => theme.colors.bgTitlePage};
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

/*
    border:'solid 1px black',
    borderRadius:'100%',
    padding:4,
    cursor
*/

export const IconWrapper = styled.div`
    border: solid 1px black;
    border-radius: 100%;
    padding: 4px;
    cursor: pointer;
`;

export const IconWrapper2 = styled.div`
    border: solid 1px grey;
    border-radius: 5px;
    padding: 4px;
    width: fit-content;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.lightGrey};
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.lighterGray};
    }
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
    padding: 1rem;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    ${media.greaterThan("medium")`
    flex-direction: row;
  `}
`;

export const LettersCounter = styled.div`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.jvrisAquaDark};
    margin-left: auto;
`;

export const TextAreaInput = styled.textarea<{ error?: boolean }>`
    flex: auto;
    font-size: 1.3rem;
    min-height: 12rem;
    border: 1px solid ${({ theme }) => theme.colors.gray};
    text-indent: 1rem;
    outline: ${({ theme }) => theme.colors.softGreen};
    border-radius: 0.5rem;
    padding: 1rem 0.2rem;
    width: 100%;
    ${({ error, theme }) =>
        error
            ? "border: 1px solid #ca0000"
            : `border: 1px solid ${theme.colors.lightGrey}`};

    &:hover {
        border: 1px solid ${({ theme }) => theme.colors.grey};
    }

    &:focus {
        ${({ error, theme }) =>
            error
                ? "border: 1px solid #ca0000"
                : `border: 1px solid ${theme.colors.jvrisAqua}`};
    }
`;

export interface SelectOption {
    label: string;
    value: number | string;
}
export const InfoText = styled.div`
    padding: 1rem;
    display: none;
    position: absolute;
    left: 0;
    bottom: 2.5rem;
    z-index: 1;
    width: fit-content;
    border-radius: 1rem;
    font-size: 1.2rem;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.jvrisAquaDark};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);
    height: fit-content;
    min-width: 20rem;
    max-width: fit-content;
`;

export const InfoContainerField = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover ${InfoText} {
        display: flex;
    }
`;

export const InfoIcon = styled(Info)`
    font-size: 1.8rem;
`;

export const FieldTitle = styled.h3`
    display: flex;
    position: relative;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.darkerGrey};
    margin-bottom: 0.5rem;
    align-items: center;
    gap: 0.5rem;
`;

export const ContainerField = styled.div<{ flex?: boolean }>`
    display: flex;
    flex-direction: column;

    ${({ flex }) =>
        flex &&
        `
        flex: 1;
    `}
`;

export const ContainerFieldTextArea = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ContentSection = styled.div`
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));

    &:not(last-child) {
        margin-bottom: 2rem;
    }
`;
export const ContentColSection = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;
export const TitleSection = styled.h2`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.darkGrey};
    margin-bottom: 0;
    padding-bottom: 0;
`;

export const TitleSectionWrapper = styled.div`
    background-color: ${({ theme }) => theme.colors.lightGrey};
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    gap: 1rem;
`;
export const SectionWrapper = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.lightGrey};
    padding: 1rem;
    border-radius: 0.5rem;
`;
export const AnexoSectionWrapper = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.lightGrey};
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
`;
export const AnexoWrapper = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.lightGrey};
    padding: 1rem;
    border-radius: 0.5rem;
    width: fit-content;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.lighterGrey};
    }
`;
export const TitleSectionContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
`;
export const Section = styled.section`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin: 1rem;

    &:not(:last-child) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.lighterGray};
    }
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

export const FieldValueContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const FieldContainer = styled.div`
    display: flex;
`;

export const LabelField = styled.label`
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.darkGrey};
    margin-bottom: 1rem;
`;
export const Label = styled.label`
    font-size: 1.3rem;
`;

export const OptionsContainer = styled.div`
    display: flex;
    justify-content: end;
`;

export const OptionCancel = styled.div`
    cursor: pointer;
    padding: 1rem;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.colors.darkBlue};
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.white};
`;

export const OptionAction = styled.div`
    cursor: pointer;
    padding: 1rem;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.white};
`;

export const Back = styled.div`
    background-color: ${({ theme }) => theme.colors.white};
    height: 100%;
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;

export const ErrorLabel = styled.span`
    color: #ca0000;
    font-size: 1.2rem;
`;

export const TextInput = styled.input<{ error?: boolean }>`
    flex: auto;
    font-size: 1.3rem;
    height: 3.6rem;
    ${({ error, theme }) =>
        error
            ? "border: 1px solid #ca0000"
            : `border: 1px solid ${theme.colors.lightGrey}`};
    text-indent: 1rem;
    outline: none;
    border-radius: 0.4rem;

    &:hover {
        border: 1px solid ${({ theme }) => theme.colors.grey};
    }

    &:focus {
        ${({ error, theme }) =>
            error
                ? "border: 1px solid #ca0000"
                : `border: 1px solid ${theme.colors.jvrisAqua}`};
    }
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

export const ValueInput = styled.input`
    font-size: 1.5rem;
    border: none;
    outline: none;
    background: none;
`;

export const ValueContainer = styled.div`
    display: flex;
`;

export const ValueContent = styled.div<ErrorDate>`
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

export const ValueDescription = styled.span`
    font-size: 1.3rem;
    margin-bottom: 0.5rem;
`;
export const TextArea = styled.textarea`
    width: 100%;
    height: 80%;
    min-height: 100px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    resize: none;
    font-size: 1.4rem;

    &:focus {
        outline: 1px solid ${({ theme }) => theme.colors.jvrisAqua};
    }
`;

export const CustomSelect = styled(Select)<CustomSelectProps>`
    width: 100%;
    border-radius: 0.5rem;
    * {
        font-size: 1.3rem;
    }
    ${({ error, theme }) =>
        error
            ? "border: 1px solid #ca0000"
            : `border: 1px solid ${theme.colors.lightGrey}`};
    &:hover {
        border: 1px solid ${({ theme }) => theme.colors.grey};
    }

    &:focus {
        ${({ error, theme }) =>
            error
                ? "border: 1px solid #ca0000"
                : `border: 1px solid ${theme.colors.jvrisAqua}`};
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
    width: 100%;
    justify-content: end;
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
export const ContainerForm = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: ${({ theme }) => theme.colors.lightGray};
    gap: 2rem;
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
