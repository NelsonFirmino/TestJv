import theme from "../../../../../../../globalStyle/theme";
import { useProcessoContext } from "../../../context/ProcessoContext";
import * as S from "../../../styled";

const CadastroPecasHeader = () => {
    const { toogleMostrarDadosProcesso } = useProcessoContext();

    return (
        <S.ContainerHeader
            style={{
                justifyContent: "space-between"
            }}
        >
            <S.TitleHeader>Editor de Peça</S.TitleHeader>
            <S.Button
                onClick={() => toogleMostrarDadosProcesso()}
                color={theme.colors.jvrisAquaDark}
                colorHover={theme.colors.jvrisAquaDarker}
            >
                Mostrar Dados do Processo
            </S.Button>
        </S.ContainerHeader>
    );
};

export default CadastroPecasHeader;
