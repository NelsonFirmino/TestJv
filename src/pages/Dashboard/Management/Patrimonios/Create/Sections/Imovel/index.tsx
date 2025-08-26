import Accordion from "react-bootstrap/Accordion";
import * as S from "../../../styled";
import useEPContext from "../../context";
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
    const { form, patrimonio } = useEPContext();
    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>
                <S.TitleSection>Dados do imóvel</S.TitleSection>
            </Accordion.Header>
            <Accordion.Body>
                <S.Form onSubmit={form.handleSubmit}>
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
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default EPImoveis;
