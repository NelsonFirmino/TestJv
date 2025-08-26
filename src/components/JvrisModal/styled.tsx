import { File, Trash } from "phosphor-react";
import Modal from "react-modal";
import Select, { Props, StylesConfig } from "react-select";
import styled from "styled-components";
import media from "styled-media-query";
import theme from "../../globalStyle/theme";
import {
    ButtonInterface,
    ConditionalLabel,
    LabelInterface,
    SelectInterface,
    TextAreaInterface
} from "./interfaces";

export const ContentSelect = styled(Select)<SelectInterface>`
    width: ${({ width }) => width ?? "100%"};
    * {
        font-size: 1.3rem;
    }
`;

export const ProcessosSelect = (props: Props) => {
    const styles: StylesConfig<any, true> = {
        multiValueLabel: (base, state) => {
            return state.data.isFixed
                ? {
                      ...base,
                      fontWeight: "bold",
                      color: "white",
                      paddingRight: 6
                  }
                : base;
        },
        indicatorsContainer: (base) => ({
            ...base,
            display: "none"
        }),
        multiValueRemove: (base, state) => {
            return state.data.isFixed ? { ...base, display: "none" } : base;
        },
        multiValue: (base, state) => {
            return state.data.isFixed
                ? {
                      ...base,
                      backgroundColor: theme.colors.jvrisAqua,
                      fontSize: "1.7rem"
                  }
                : { ...base, marginRight: "6px" };
        },
        control: (base) => ({
            ...base,
            border: `2px solid ${theme.colors.jvrisAqua}`,
            boxShadow: "none",
            overflow: "auto",
            maxHeight: "100px"
        }),
        indicatorSeparator: (base) => ({
            ...base,
            display: "none"
        }),
        valueContainer: (base) => ({
            ...base,
            overflow: "auto",
            //width: "max-content",
            //height: "max-content",

            padding: "8px"
        }),
        container: (base) => ({
            ...base,
            minWidth: "100%",
            maxWidth: "420px"
        }),
        menu: (base) => ({
            ...base,
            border: `2px solid ${theme.colors.jvrisAqua}`
        })
    };

    return <ContentSelect {...(props as any)} styles={styles as any} />;
};

export const ModalStyle: Modal.Styles = {
    overlay: {
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 1000
    },
    content: {
        //width: "fit-content",
        //height: "fit-content",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.45)",
        border: "none",
        padding: "0px",
        overflow: "visible",
        maxWidth: "100%"
    }
};

export const Wrapper = styled.div`
    width: fit-content;
    min-width: 450px;
    position: relative;
    //max-height: 60rem;

    /*  ${media.lessThan("medium")`
    max-width: 400px;
  `}

    ${media.greaterThan("medium")`
    max-width: 600px;
  `}

  ${media.greaterThan("large")`
    max-width: 1000px;
  `} */
`;

export const TitleContainer = styled.div`
    display: flex;
    padding: 0px 25px;
    width: auto;
    height: 60px;
    align-items: center;
    border-bottom: 1px solid ${theme.colors.grey};
    background-color: ${theme.colors.jvrisAqua};
    justify-content: space-between;
`;

export const TitleLabel = styled.div<{
    fontSize?: string;
}>`
    font-size: ${({ fontSize }) => fontSize ?? "20px"};
    font-weight: bold;
    color: ${theme.colors.white};
`;

export const TitleButtonWrapper = styled.div`
    display: flex;
    margin-left: 20px;
`;

export const TitleButton = styled.button<ButtonInterface>`
    padding: 1rem;
    color: ${({ fontColor }) => fontColor ?? theme.colors.white};
    background-color: ${({ buttonColor }) =>
        buttonColor ?? theme.colors.softOrange};
    border: none;
    border-radius: 5px;
    font-size: 12px;
    color: ${theme.colors.white};
    margin-left: 10px;

    &:hover {
        cursor: pointer;
        background-color: ${({ hoverColor }) =>
            hoverColor ?? theme.colors.softYellow};
    }
`;

export const AddButton = styled.button<ButtonInterface>`
    padding: 1rem;
    color: ${({ fontColor }) => fontColor ?? theme.colors.white};
    background-color: ${({ buttonColor }) =>
        buttonColor ?? theme.colors.jvrisAquaDark};
    border: none;
    border-radius: 5px;
    font-size: 12px;
    color: ${theme.colors.white};
    margin-left: 10px;

    &:hover {
        cursor: pointer;
        background-color: ${({ hoverColor }) =>
            hoverColor ?? theme.colors.jvrisAquaDarker};
    }
`;

export const Form = styled.form``;

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

export const WarningMessage = styled.span`
    margin-top: 0.5rem;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 10px;
`;

export const TableWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: center; */
`;

export const TableContainer = styled.div`
    width: 100%;
`;

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ToggleContainer = styled.div`
    margin: 0 auto;
    width: 100%;
    margin-top: 2rem;
    padding: 2rem;
    background-color: ${({ theme }) => theme.colors.lightGrey};
    border-radius: 6px;
`;

export const FileInput = styled.input`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

export const ContentWrapperRow = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ContentWrapperRowOrColumn = styled.div`
    display: flex;
    flex-direction: row;
    min-width: 600px;
    width: fit-content;

    ${media.lessThan("large")`
    flex-direction: column;
  `}
`;

export const ContentWrapperRowData = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;

    &:first-child {
        margin-right: 30px;
    }
`;

export const ContentTitle = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    margin-top: 10px;
`;

export const CustomSelect = styled(Select)`
    width: 100%;
    * {
        font-size: 1.3rem;
    }
`;

export const TextButtom = styled.div`
    font-size: 2rem;
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    color: ${({ theme }) => theme.colors.white};
    padding: 1rem;
    text-align: center;
    border-radius: 1rem;
    width: 100%;
    flex-direction: row;
    display: flex;
`;

export const ContentTitleLabel = styled.div<LabelInterface>`
    font-size: ${({ fontSize }) => fontSize ?? "16px"};
    font-weight: ${({ fontWeight }) => fontWeight ?? "normal"};
    color: ${({ fontColor }) => fontColor ?? theme.colors.darkGrey};

    margin-right: 5px;
    margin-top: 5px;
`;

export const ContentSubTitleLabel = styled.div<LabelInterface>`
    font-size: ${({ fontSize }) => fontSize ?? "15px"};
    font-weight: ${({ fontWeight }) => fontWeight ?? "normal"};
    color: ${({ fontColor }) => fontColor ?? theme.colors.darkGrey};

    margin-right: 5px;
    margin-top: -8px;
`;

export const ContentSeparator = styled.div`
    border-bottom: 1px solid ${theme.colors.lightGrey};
    margin-top: 15px;
`;

export const ContentInput = styled.input`
    font-size: 15px;
    outline: none;
    background: none;
    text-align: start;
    width: 100%;
    max-height: 40px;
    padding: 1rem;
    border: 1px solid ${theme.colors.grey};
    border-radius: 5px;
`;

export const ContentInputDate = styled.input.attrs({ type: "date" })`
    font-size: 15px;
    outline: none;
    background: none;
    text-align: start;
    width: 100%;
    max-height: 40px;
    padding: 1rem;
    border: 1px solid ${theme.colors.grey};
    border-radius: 5px;
`;

export const ContentInputTime = styled.input.attrs({ type: "time" })`
    font-size: 15px;
    outline: none;
    background: none;
    text-align: start;
    width: 100%;
    max-height: 40px;
    padding: 1rem;
    border: 1px solid ${theme.colors.grey};
    border-radius: 5px;
`;

export const ContentInputCheckbox = styled.input.attrs({ type: "checkbox" })`
    font-size: 15px;
    outline: none;
    background: none;
    text-align: start;
    max-height: 40px;
    padding: 1rem;
    border: 1px solid ${theme.colors.grey};
    border-radius: 5px;
`;

export const ContentTextArea = styled.textarea<TextAreaInterface>`
    font-size: 15px;
    outline: none;
    background: none;
    width: 100%;
    min-height: 40px;
    height: ${({ height }) => height ?? "100px"};
    max-height: 250px;
    padding: 1rem;
    border: 1px solid ${theme.colors.grey};
    border-radius: 5px;
    resize: vertical;
`;

export const ContentButton = styled.div`
    display: flex;
    justify-content: end;

    margin-top: 20px;
`;

export const ContentButtonLabel = styled.button<ButtonInterface>`
    font-size: 15px;
    padding: 1rem;
    color: ${({ fontColor }) => fontColor ?? theme.colors.white};
    background-color: ${({ disabled, buttonColor }) =>
        disabled ? theme.colors.grey : buttonColor ?? theme.colors.jvrisAqua};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    border: none;
    border-radius: 5px;
    margin-left: 10px;
    width: ${({ width }) => width ?? "auto"};

    &:hover {
        background-color: ${({ disabled, hoverColor }) =>
            disabled
                ? theme.colors.grey
                : hoverColor ?? theme.colors.jvrisAquaDark};
        transition: 300ms;
    }
`;

export const ContentSelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ContentRadioButton = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
`;

export const RadioButtonTitle = styled.div<LabelInterface>`
    font-size: ${({ fontSize }) => fontSize ?? "11px"};
    font-weight: ${({ fontWeight }) => fontWeight ?? "normal"};
    color: ${({ fontColor }) => fontColor ?? theme.colors.darkGrey};
    margin-right: 0.5rem;
`;

export const RadioButtonContainer = styled.label`
    display: flex;
    position: relative;
    flex-direction: row;
    margin-right: 1rem;
    align-items: center;
`;

export const RadioButtonLabel = styled.label<ConditionalLabel>`
    position: absolute;
    z-index: 1;
    font-size: 1.2rem;
    font-weight: bold;
    user-select: none;
    pointer-events: none;
    color: white;
    transition: left 500ms;

    left: ${({ value }) => (value ? "12%" : "64%")};
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

// Table

export const ContainerTable = styled.div`
    display: flex;

    &:not(:last-child) {
        margin-bottom: 2rem;
    }
`;

export const ContainerContentTable = styled.div`
    flex: 1;
    &:not(:last-child) {
        margin-right: 10rem;
    }
`;

export const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 3px 10px rgba(0, 0, 0, 0.05);

    td {
        padding: 10px;
        text-align: left;
        font-size: 1.2rem;
    }
`;

export const Thead = styled.thead``;

export const RowTable = styled.tr`
    background-color: #f2f2f2;
`;

export const Th = styled.th`
    padding: 10px;
    text-align: left;
    font-size: 1.2rem;
`;

export const ButtonTh = styled.th`
    width: 5%;
    padding: 10px;
    text-align: center;
    font-size: 1.2rem;
`;

export const TBody = styled.tbody``;

export const RowTableObservation = styled.tr`
    border-top: 1px solid ${({ theme }) => theme.colors.gray};
    transition: background-color 200ms;
    &:nth-child(even) {
        background-color: #f2f2f2;
    }

    &:hover {
        background-color: #dedede;
    }
`;

export const RowMessage = styled.td`
    font-size: 1.4rem;
    padding: 2rem;

    &:hover {
        background-color: #dedede;
    }
`;

export const Td = styled.td`
    color: "black";
`;

export const ButtonTD = styled.td`
    /* display: flex; */
`;

export const RemoveButtonTable = styled.div`
    text-align: right;
    display: flex;
    margin: auto;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.colors.grey};
    object-fit: cover;
    cursor: pointer;
    transition: background-color 500ms;

    &:hover {
        background-color: ${({ theme }) => theme.colors.softRed};
    }
`;
export const ViewButtonTable = styled.div`
    text-align: right;
    display: flex;
    margin: auto;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    background-color: ${({ theme }) => theme.colors.grey};
    object-fit: cover;
    cursor: pointer;
    transition: background-color 500ms;

    &:hover {
        background-color: ${({ theme }) => theme.colors.softRed};
    }
`;

export const RemoveObservationIcon = styled(Trash)`
    font-size: 1.4rem;
`;

export const ViewAttachmentIcon = styled(File)`
    font-size: 1.4rem;
`;

export const AttachmentsData = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 5rem;
    margin-right: 5rem;
`;

export const AttachmentsTitle = styled.div`
    display: flex;
    justify-content: flex-start;
    font-size: 1.3rem;
    font-weight: bold;
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
`;

export const AttachmentsContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    font-size: 1.3rem;
    margin-top: 1rem;
    margin-bottom: 3rem;
`;

export const AttachmentsContentTitle = styled.div`
    font-size: 1.3rem;
    margin-right: 1rem;
    font-weight: bold;
`;

export const AttachmentsImport = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.3rem;
`;

export const AttachmentsInput = styled.input`
    cursor: pointer;
    font-size: 1.3rem;
`;

export const SectionSearchButton = styled.div`
    display: flex;
    align-items: center;
    transition: 300ms;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    text-align: center;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 1.3rem;
    color: white;
    outline: none;
    border: none;
    margin-left: 1rem;
    height: 3rem;

    :hover {
        background-color: ${({ theme }) => theme.colors.jvrisAquaDark};
    }
`;
