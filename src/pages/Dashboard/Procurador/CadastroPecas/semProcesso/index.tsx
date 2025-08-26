import { lazy } from "react";
import InputsSection from "./Sections/Inputs";
import * as S from "../styled";
import ButtonsSection from "./Sections/Buttons";
import GeneralContext from "../context";
import DocEditor from "../comProcesso/Sections/DocEditor";

const CadastroPecas = () => {
    return (
        <GeneralContext comProcesso={false}>
            <S.ContainerHeader>
                <S.TitleHeader>Cadastro de Modelo</S.TitleHeader>
            </S.ContainerHeader>
            <InputsSection />
            <DocEditor />
            <ButtonsSection />
        </GeneralContext>
    );
};

export default CadastroPecas;

export const CadastroPecasLazy = lazy(() => import("./"));
