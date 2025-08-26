import { OptionsForSelectedProcessContainer } from "../../../Attorney/components/Tables/Atuacao/styled";
import { useOperadorContext } from "../../context";
import * as S from "./styled";

const MutipleSelectOptions = () => {
    const {
        processosData,
        setOpenDistHjExluirModal,
        setOpenEditarProcessoModal
    } = useOperadorContext();

    return (
        <OptionsForSelectedProcessContainer isOpen={processosData.length > 0}>
            <S.SelectedButtonWrapper>
                <S.SelectedButton
                    onClick={() => {
                        setOpenDistHjExluirModal(true);
                    }}
                >
                    Excluir
                </S.SelectedButton>
                <S.SelectedButton
                    onClick={() => {
                        setOpenEditarProcessoModal(true);
                    }}
                >
                    Editar
                </S.SelectedButton>
            </S.SelectedButtonWrapper>
        </OptionsForSelectedProcessContainer>
    );
};

export default MutipleSelectOptions;
