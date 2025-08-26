import React from "react";
import { PecasProvider } from "./PecasContext";
import { EditorProvider } from "./EditorContext";
import { ProcessoProvider } from "./ProcessoContext";

interface PropsI {
    children: React.ReactNode;
    comProcesso: boolean;
}

const GeneralContext = (props: PropsI) => {
    const { children } = props;
    return (
        <PecasProvider comProcesso={props.comProcesso}>
            <ProcessoProvider>
                <EditorProvider>{children}</EditorProvider>
            </ProcessoProvider>
        </PecasProvider>
    );
};

export default GeneralContext;
