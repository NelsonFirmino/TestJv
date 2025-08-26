import { lazy, useEffect, useState } from "react";
import ButtonsSection from "./Sections/Buttons";
import GeneralContext from "../context";
import CadastroPecasHeader from "./Sections/Header";
import InputsSection from "../comProcesso/Sections/Inputs";
import DocEditor from "../comProcesso/Sections/DocEditor";

const VisuPecas = () => {
    return (
        <GeneralContext comProcesso={true}>
            <div
                style={{
                    display: "flex"
                }}
            >
                <div
                    style={{
                        width: "100%"
                    }}
                >
                    <CadastroPecasHeader />
                    <InputsSection />
                    <DocEditor />
                    <ButtonsSection />
                </div>
            </div>
        </GeneralContext>
    );
};

export default VisuPecas;

export const VisuPecasLazy = lazy(() => import("./"));
