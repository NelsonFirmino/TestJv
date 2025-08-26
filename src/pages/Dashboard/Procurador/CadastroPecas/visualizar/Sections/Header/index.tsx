import { useProcessoContext } from "../../../context/ProcessoContext";
import * as S from "../../../styled";

const CadastroPecasHeader = () => {

    return (
        <S.ContainerHeader
            style={{
                justifyContent: "space-between"
            }}
        >
            <S.TitleHeader>Visualizador de Peça</S.TitleHeader>

        </S.ContainerHeader>
    );
};

export default CadastroPecasHeader;
