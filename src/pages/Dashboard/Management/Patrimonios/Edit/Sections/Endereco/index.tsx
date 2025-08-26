import Accordion from "react-bootstrap/Accordion";
import * as S from "../../../styled";
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
        <Accordion.Item eventKey="1">
            <Accordion.Header>
                <S.TitleSection>Dados de endereço</S.TitleSection>
            </Accordion.Header>
            <Accordion.Body>
                <S.Form onSubmit={form.handleSubmit}>
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
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default EPEndereco;
