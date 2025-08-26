import Accordion from "react-bootstrap/Accordion";
import * as S from "../../../styled";
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
        <Accordion.Item eventKey="3">
            <Accordion.Header>
                <S.TitleSection>Dados cartoriais</S.TitleSection>
            </Accordion.Header>
            <Accordion.Body>
                <S.Form onSubmit={form.handleSubmit}>
                    <S.ContentSection>
                        <Cartorio />
                    </S.ContentSection>
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
                                <MaisInfos />
                            </S.ContentSection>
                        </>
                    )}
                </S.Form>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default EPCartoriais;
