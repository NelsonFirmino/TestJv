import { Editor as TinyEditor } from "@tinymce/tinymce-react";
import Select from "react-select";
import StateManagedSelect from "react-select/dist/declarations/src/stateManager";
import styled from "styled-components";
import JvrisLoading from "../../../../components/JvrisLoading";

export const Wrapper = styled.div`
    //padding: 2.4rem;
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1.4rem;
`;

export const InsideInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ContainerHeader = styled.div`
    display: flex;
    background-color: ${({ theme }) => theme.colors.jvrisAqua};
    align-items: center;
    padding: 1.8rem 1.8rem;
    max-height: 6rem;
    //border-radius: 0.8rem;
`;

export const TitleHeader = styled.h1`
    font-size: 1.8rem;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.white};
`;

export const TitleInput = styled.input`
    background-color: #fff;
    height: 38px;
    width: 100%;
    font-size: 1.2rem;
    padding: 0px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const DatasWrapper = styled.div<{ column?: boolean }>`
    display: flex;
    flex-direction: ${({ column }) => (column ? "column" : "row")};
    margin: 1.2rem;
    flex-wrap: wrap;
    gap: 1.4rem;
`;

export const DataWrapper = styled.div<{
    gap?: number | string;
}>`
    display: flex;
    flex-direction: column;
    gap: ${({ gap }) => (gap ? gap : 0.8)}rem;
    flex: 1;
    outline: 1px solid ${({ theme }) => theme.colors.lightGrey};
    padding: 1rem;
    border-radius: 0.4rem;
`;

export const ManyDataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    outline: 1px solid ${({ theme }) => theme.colors.lightGrey};
    padding: 1rem;
    border-radius: 0.4rem;
`;

const Label = styled.p<{
    Font?: "small" | "medium" | "big";
    bold?: boolean;
}>`
    width: fit-content;
    //padding: 0.4rem 0rem;
    font-weight: 900;
    font-size: ${({ Font }) => {
        switch (Font) {
            case "small":
                return "1.2rem";
            case "medium":
                return "1.4rem";
            case "big":
                return "1.6rem";
            default:
                return "1.4rem";
        }
    }};
    font-weight: ${({ bold }) => (bold ? 900 : 400)};
`;

export const DataLabelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.8rem;
    align-items: center;
`;

export const Data = styled(Label)`
    color: ${({ theme }) => theme.colors.gray};
    width: max-content;
`;

export const DataLabel = styled(Label)<{ isError?: boolean }>`
    font-weight: 900;
    width: max-content;
    color: ${({ theme, isError }) =>
        isError ? theme.colors.softRed : theme.colors.gray};
`;

export const SeparetedWrapper = styled.label<{
    fit?: boolean;
    align?: boolean;
    justify?: boolean;
    noCursor?: boolean;
    row?: boolean;
    noHover?: boolean;
    gap?: number | string;
    backColor?: string;
    backColorHover?: string;
    color?: string;
    colorHover?: string;
}>`
    display: flex;
    border-radius: 0.4rem;
    flex-direction: ${({ row }) => (row ? "row" : "column")};
    outline: 1px solid rgba(0, 0, 0, 0.1);
    width: ${({ fit }) => (fit ? "fit-content" : "100%")};
    padding: 1rem 1rem;
    cursor: ${({ noCursor: cursor }) => (cursor ? "default" : "pointer")};
    transition: 0.1s ease;
    align-items: ${({ align }) => (align ? "center" : "none")};
    justify-content: ${({ justify }) => (justify ? "center" : "none")};
    gap: ${({ gap }) => (gap ? gap : 0)}rem;
    background-color: ${({ backColor }) => backColor};
    color: ${({ color }) => color};

    &:hover {
        background-color: ${({ noHover, backColorHover }) =>
            noHover
                ? "none"
                : backColorHover
                ? backColorHover
                : "rgba(0, 0, 0, 0.1)"};
        color: ${({ noHover, colorHover }) =>
            noHover ? "none" : colorHover ? colorHover : "none"};
    }
`;

export const Input = styled.input`
    background-color: #fff;
    height: 38px;
    width: 100%;
    font-size: 1.2rem;
    padding: 0px 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 2rem 0rem;
    gap: 1.4rem;
`;

export const Button = styled.button<{
    isSave?: boolean;
    color?: string;
    colorHover?: string;
}>`
    background-color: ${({ theme, isSave, color }) =>
        color
            ? color
            : isSave
            ? theme.colors.jvrisAqua
            : theme.colors.darkgrey_2};

    color: ${({ theme }) => theme.colors.white};
    font-size: 1.2rem;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 0.4rem;
    border: none;
    cursor: pointer;
    transition: 0.1s ease;
    &:hover {
        background-color: ${({ theme, isSave, colorHover }) => {
            if (colorHover) return colorHover;
            return isSave
                ? theme.colors.jvrisAquaDark
                : theme.colors.darkerGrey;
        }};
    }
`;

export const ButtonLabel = styled.label<{ isSave?: boolean }>`
    background-color: ${({ theme, isSave }) =>
        isSave ? theme.colors.jvrisAqua : theme.colors.darkgrey_2};
    color: ${({ theme }) => theme.colors.white};
    font-size: 1.2rem;
    font-weight: 700;
    padding: 1rem 2rem;
    border-radius: 0.4rem;
    border: none;
    cursor: pointer;
    transition: 0.1s ease;
    &:hover {
        background-color: ${({ theme, isSave }) =>
            isSave ? theme.colors.jvrisAquaDark : theme.colors.darkerGrey};
    }
`;

export const SelectData: StateManagedSelect = (props) => {
    return (
        <Select
            loadingMessage={(obj) => {
                obj.inputValue = "Carregando...";
                return obj.inputValue;
            }}
            styles={{
                container: (provided, state) => ({
                    ...provided,
                    flex: 1
                }),
                control: (provided, state) => ({
                    ...provided,
                    backgroundColor: "#fff",
                    height: "30px",
                    fontSize: "3.2rem"
                }),
                option: (provided, state) => ({
                    ...provided,
                    fontSize: "1.2rem"
                }),
                menu: (provided, state) => ({
                    ...provided,
                    zIndex: 3
                }),
                loadingMessage: (provided, state) => ({
                    ...provided,
                    fontSize: "1.2rem"
                })
            }}
            {...props}
        />
    );
};

export const TextEditor = ({
    onChange,
    value,
    loadingDocx
}: {
    onChange: (content: string) => void;
    value: string;
    loadingDocx: boolean;
}) => {
    return loadingDocx ? (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 500
            }}
        >
            <JvrisLoading loading />
        </div>
    ) : (
        <TinyEditor
            tinymceScriptSrc={
                process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
            }
            init={{
                language: "pt_BR",
                promotion: false,
                line_height_formats: "normal 2px 4px 6px 8px 10px",
                font_size_formats:
                    "8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 40px 48px 56px 64px 72px 96px",
                min_height: 600,
                plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "help",
                    "wordcount"
                ],
                toolbar_mode: "sliding",
                toolbar: `undo redo copy cut paste | bold italic underline 
                strikethrough blockquote superscript subscript image link | 
                blocks fontfamily fontsize | alignleft aligncenter 
                alignright alignjustify lineheight | 
                forecolor backcolor | bullist numlist 
                outdent indent table | removeformat`,
                content_style: `
                body 
                { 
                    font-family:Helvetica,Arial,sans-serif; 
                    font-size:14px;
                }
                p 
                {
                    line-height: normal;
                }
                `
            }}
            onEditorChange={onChange}
            value={value}
        />
    );
};
