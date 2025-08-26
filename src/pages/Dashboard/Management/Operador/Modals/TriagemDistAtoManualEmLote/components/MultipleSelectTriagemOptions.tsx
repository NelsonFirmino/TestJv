import { OptionsForSelectedProcessContainer } from "../../../../Attorney/components/Tables/Atuacao/styled";
import { useOperadorContext } from "../../../context";
import * as S from "./styled";

const MutipleSelectTriagemOptions = () => {
  const { processosData, setOpenTriagemModal, openTriagemModal } =
    useOperadorContext();

  return (
    <OptionsForSelectedProcessContainer isOpen={processosData.length > 0}>
      <S.SelectedButtonWrapper>
        <S.SelectedButton
          onClick={() => {
            setOpenTriagemModal(true);
          }}
        >
          Triagem
        </S.SelectedButton>
      </S.SelectedButtonWrapper>
    </OptionsForSelectedProcessContainer>
  );
};

export default MutipleSelectTriagemOptions;
