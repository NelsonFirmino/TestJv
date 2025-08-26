import * as S from "../../../../styled";
import InfoAquisição from "./1-InfoAquisicao";
import TipoImovel from "./2-TipoImovel";
import FormaAquisição from "./3-FormaAquisicao";
import AnoAquisicao from "./4-AnoAquisicao";
import Outorgado from "./5-Outorgado";
import Outorgantes from "./6-Outorgantes";
import AreaTotal from "./7-AreaTotal";
import AreaContruida from "./8-AreaContruida";
import InformacoesImovel from "./9-InformacoesImovel";

const EPImoveis = () => {
    return (
        <S.SectionWrapper>
            <S.TitleSectionWrapper>
                <S.TitleSection>Dados do Imovel</S.TitleSection>
            </S.TitleSectionWrapper>
            <S.Form>
                <S.ContentSection>
                    <InfoAquisição />
                </S.ContentSection>

                <S.ContentSection>
                    <TipoImovel />
                </S.ContentSection>

                <S.ContentSection>
                    <FormaAquisição />

                    <AnoAquisicao />
                </S.ContentSection>

                <S.ContentSection>
                    <Outorgado />

                    <Outorgantes />
                </S.ContentSection>

                <S.ContentSection>
                    <AreaTotal />

                    <AreaContruida />
                </S.ContentSection>

                <S.ContentSection>
                    <InformacoesImovel />
                </S.ContentSection>
            </S.Form>
        </S.SectionWrapper>
    );
};

export default EPImoveis;
