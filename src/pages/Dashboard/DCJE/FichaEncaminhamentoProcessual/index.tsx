import Arquivos from "./Sections/Arquivos";
import DadosColAutos from "./Sections/DadosColAutos";
import InformacoesDist from "./Sections/InformacoesDist";
import InformaçõesCadastrais from "./Sections/InformaçõesCadastrais";
import OrientacaoCalc from "./Sections/OrientacaoCalc";
import ParamsCorreMoneJuros from "./Sections/ParamsCorreMoneJuros";
import RazaoPedido from "./Sections/RazaoPedido";
import SaveFichaButton from "./Sections/SaveButton";
import FEPTitleSection from "./Sections/Title";
import useFEPContext, { FEPProvider } from "./useFEPContext";

const Sections = () => {
    const { noFicha } = useFEPContext();
    return noFicha ? (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem"
            }}
        >
            <p
                style={{
                    fontSize: "1.5rem"
                }}
            >
                Não foi encontrada nenhuma ficha para este processo
            </p>
        </div>
    ) : (
        <>
            <FEPTitleSection />
            <InformaçõesCadastrais />
            <InformacoesDist />
            <RazaoPedido />
            <DadosColAutos />
            <ParamsCorreMoneJuros />
            <OrientacaoCalc />
            <Arquivos />
            <SaveFichaButton />
        </>
    );
};

const FichaEncaminhamentoProcessual = () => {
    return (
        <div>
            <FEPProvider>
                <Sections />
            </FEPProvider>
        </div>
    );
};

export default FichaEncaminhamentoProcessual;
