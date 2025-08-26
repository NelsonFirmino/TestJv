import { lazy } from "react";
import GeneralContext from "../context";
import ButtonsSection from "./Sections/Buttons";
import DadosProcesso from "./Sections/DadosProcesso";
import DocEditor from "./Sections/DocEditor";
import CadastroPecasHeader from "./Sections/Header";
import InputsSection from "./Sections/Inputs";

const CadastroPecasComProc = () => {
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
                <DadosProcesso />
            </div>
        </GeneralContext>
    );
};

export default CadastroPecasComProc;

export const CadastroPecasComProcLazy = lazy(() => import("./"));
