import { OptionsForSelectedProcessContainer } from "../../../../Attorney/components/Tables/Atuacao/styled";
import { useOperadorContext } from "../../../context";
import * as S from "./styled";

const MultipleSelectEditarTriagemOptions = () => {
  const { processosData, setOpenEditarTriagemEmLoteModal, openTriagemModal } =
    useOperadorContext();

  return (
    <OptionsForSelectedProcessContainer isOpen={processosData.length > 0}>
      <S.SelectedButtonWrapper>
        <S.SelectedButton
          onClick={() => {
            setOpenEditarTriagemEmLoteModal(true);
          }}
        >
          Editar Triagem
        </S.SelectedButton>
      </S.SelectedButtonWrapper>
    </OptionsForSelectedProcessContainer>
  );
};

export default MultipleSelectEditarTriagemOptions;
