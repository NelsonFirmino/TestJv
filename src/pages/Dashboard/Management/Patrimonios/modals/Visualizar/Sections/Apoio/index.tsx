import * as S from "../../../../styled";
import useEPContext from "../../context";
import RegistroSS from "./1-RegistroSS";
import ProcessoAdm from "./2-ProcessoAdm";
import ProcessosJud from "./3-ProcessosJud";
import NPasta from "./4-NPasta";
import NcartaAfo from "./5-NcartaAfo";
import Afetacao from "./6-Afetacao";
import AdmDiretaIndireta from "./7-AdmDiretaIndireta";
import Beneficiario from "./8-Beneficiario";

const EPApoio = () => {
    const { form, patrimonio } = useEPContext();
    const formValues = form.watch();

    return (
        <S.SectionWrapper>
            <S.TitleSectionWrapper>
                <S.TitleSection>Dados de Apoio</S.TitleSection>
            </S.TitleSectionWrapper>
            <S.Form>
                <S.ContentSection>
                    <RegistroSS />
                    <ProcessoAdm />
                </S.ContentSection>

                <S.ContentSection>
                    <ProcessosJud />

                    <NPasta />
                </S.ContentSection>

                <S.ContentSection>
                    <NcartaAfo />
                </S.ContentSection>

                <S.ContentSection>
                    <Afetacao />
                    {formValues?.dadosApoio?.afetacao && <Beneficiario />}
                </S.ContentSection>

                {formValues?.dadosApoio?.afetacao && (
                    <S.ContentSection>
                        <AdmDiretaIndireta />
                    </S.ContentSection>
                )}
            </S.Form>
        </S.SectionWrapper>
    );
};

export default EPApoio;
