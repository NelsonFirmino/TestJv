import * as S from "../../../../styled";
import useEPContext from "../../context";
import ExisteMatricula from "./1-ExisteMatricula";
import Motivo from "./2-Motivo";
import Matricula from "./3-Matricula";
import Cartorio from "./4-Cartorio";
import MaisInfos from "./4-MaisInfos";

const EPCartoriais = () => {
    const { form, patrimonio } = useEPContext();
    const formValues = form.watch();

    return (
        <S.SectionWrapper>
            <S.TitleSectionWrapper>
                <S.TitleSection>Dados Cartoriais</S.TitleSection>
            </S.TitleSectionWrapper>
            <S.Form>
                <S.ContentSection>
                    <ExisteMatricula />
                    {!formValues?.dadosCartoriais?.existeMatricula && (
                        <Motivo />
                    )}
                </S.ContentSection>
                {formValues?.dadosCartoriais?.existeMatricula && (
                    <>
                        <S.ContentSection>
                            <Matricula />
                            <Cartorio />
                        </S.ContentSection>
                        <S.ContentSection>
                            <MaisInfos />
                        </S.ContentSection>
                    </>
                )}
            </S.Form>
        </S.SectionWrapper>
    );
};

export default EPCartoriais;
