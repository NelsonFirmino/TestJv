import * as S from "../../../../styled";
import useEPContext from "../../context";
import Logradouro from "./1-Logradouro";
import CEP from "./2-CEP";
import Bairro from "./3-Bairro";
import Municipio from "./4-Municipio";
import Numero from "./5-Numero";
import Latitude from "./6-Latitude";
import Longitude from "./7-Longitude";
import Complemento from "./8-Complemento";
import Confinantes from "./9-Confinantes";

const EPEndereco = () => {
    const { form, patrimonio } = useEPContext();

    return (
        <S.SectionWrapper>
            <S.TitleSectionWrapper>
                <S.TitleSection>Dados de Endereço</S.TitleSection>
            </S.TitleSectionWrapper>
            <S.Form>
                <S.ContentSection>
                    <Logradouro />
                    <S.ContentColSection>
                        <Bairro />
                        <Numero />
                    </S.ContentColSection>
                </S.ContentSection>

                <S.ContentSection>
                    <CEP />
                    <Municipio />
                </S.ContentSection>

                <S.ContentSection>
                    <Latitude />

                    <Longitude />
                </S.ContentSection>

                <S.ContentSection>
                    <Complemento />
                    <Confinantes />
                </S.ContentSection>
            </S.Form>
        </S.SectionWrapper>
    );
};

export default EPEndereco;
