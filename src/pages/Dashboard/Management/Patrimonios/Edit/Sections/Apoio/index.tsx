import Accordion from "react-bootstrap/Accordion";
import * as S from "../../../styled";
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
        <Accordion.Item eventKey="2">
            <Accordion.Header>
                <S.TitleSection>Dados de apoio</S.TitleSection>
            </Accordion.Header>
            <Accordion.Body>
                <S.Form onSubmit={form.handleSubmit}>
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
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default EPApoio;
