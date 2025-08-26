import * as mammoth from "mammoth/mammoth.browser";
import { createContext, useContext, useState } from "react";
import {
    HotToastError,
    HotToastWarning
} from "../../../../../../components/HotToastFuncs";
import { EditorContextI } from "./interfaces";
import { brasao } from "./brasaobase64";

const EditorContext = createContext<EditorContextI>({} as EditorContextI);

export const EditorProvider = (props: any) => {
    const [text, setText] = useState(
        `<img width = "260px" src="${brasao}" style="display: block; margin-left: auto; margin-right: auto;"`
    );
    const [loadingDocx, setLoadingDocx] = useState(false);

    function loadText(event: any) {
        function loadDocx(file: any) {
            var reader = new FileReader();

            reader.onload = (event) => {
                if (event.target) {
                    setLoadingDocx(true);
                    mammoth
                        .convertToHtml({ arrayBuffer: event.target.result })
                        .then((result) => {
                            setText(result.value);

                            setLoadingDocx(false);
                        })
                        .catch((err) => {
                            HotToastError("Erro ao carregar arquivo");
                            setLoadingDocx(false);
                        });
                }
            };
            reader.readAsArrayBuffer(file);
        }

        function loadTxt(file: any) {
            const convertTxtToHtml = (txtContent: string) => {
                // Your logic to convert plain text to HTML goes here
                // This can be as simple as wrapping the text in <p> tags
                return `<p>${txtContent}</p>`;
            };

            var reader = new FileReader();

            reader.onload = (event) => {
                const txtContent = event.target.result;
                if (typeof txtContent !== "string") {
                    HotToastError("Erro ao carregar arquivo");
                    return;
                }
                const htmlResult = convertTxtToHtml(txtContent);
                setText(htmlResult);
            };
            reader.readAsText(file);
        }

        if (event.target.files) {
            //(true);
            //check if file is docx
            const fName =
                event.target.files && event.target.files[0]
                    ? event.target.files[0].name.split(".").pop()
                    : undefined;
            if (!fName) HotToastError("Erro ao carregar arquivo");
            if (fName === "docx") {
                loadDocx(event.target.files[0]);
            }
            //check if file is txt
            else if (fName === "txt") {
                loadTxt(event.target.files[0]);
            } else {
                HotToastWarning("Formato de arquivo não suportado");
            }
        }
    }

    function updateText(text: string) {
        setText(text);
    }

    return (
        <EditorContext.Provider
            value={{
                loadingDocx,
                text,
                loadDocx: loadText,
                updateText
            }}
        >
            {props.children}
        </EditorContext.Provider>
    );
};

export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error("usePecasContext must be used within a EditorProvider");
    }
    return context;
};
