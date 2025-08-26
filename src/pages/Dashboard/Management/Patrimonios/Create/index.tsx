import Accordion from "react-bootstrap/Accordion";
import { PageTitle } from "../../../../../components/TitlePage";
import useEPContext, { EPProvider } from "./context";

import * as S from "../styled";
import EPApoio from "./Sections/Apoio";
import EPCartoriais from "./Sections/Cartoriais";
import EPEndereco from "./Sections/Endereco";
import EPImoveis from "./Sections/Imovel";

const SubButton = () => {
    return <S.SubmitButton type="submit">Salvar</S.SubmitButton>;
};

const EP = () => {
    const { form, activeKey, setActiveKey } = useEPContext();
    return (
        <form onSubmit={form.handleSubmit}>
            <PageTitle pageTitle="Criar Patrimônio" button={<SubButton />} />

            <Accordion
                defaultActiveKey="0"
                activeKey={activeKey}
                onSelect={(e: string) => {
                    setActiveKey(e);
                }}
            >
                <EPImoveis />
                <EPEndereco />
                <EPApoio />
                <EPCartoriais />
            </Accordion>
        </form>
    );
};

const EditPatrimonios = () => {
    return (
        <EPProvider>
            <EP />
        </EPProvider>
    );
};

export default EditPatrimonios;
