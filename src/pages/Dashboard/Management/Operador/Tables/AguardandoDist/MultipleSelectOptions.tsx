import { OptionsForSelectedProcessContainer } from "../../../Attorney/components/Tables/Atuacao/styled";
import { useOperadorContext } from "../../context";
import * as S from "./styled";

const MutipleSelectOptions = () => {
  const {
    processosData,
    setOpenDistribuirModal,
    setOpenOBSModal,
    setOpenExcluirTriagemAtoModal,
    setOpenEditarTriagemEmLoteModal,
  } = useOperadorContext();

  console.log(processosData);

  return (
    <OptionsForSelectedProcessContainer isOpen={processosData.length > 0}>
      <S.SelectedButtonWrapper>
        <S.SelectedButton
          onClick={() => {
            setOpenDistribuirModal(true);
          }}
        >
          Distribuir
        </S.SelectedButton>
        <S.SelectedButton
          onClick={() => {
            setOpenEditarTriagemEmLoteModal(true);
          }}
        >
          Editar Triagem
        </S.SelectedButton>
        <S.SelectedButton
          onClick={() => {
            setOpenOBSModal(true);
          }}
        >
          Observar
        </S.SelectedButton>
        <S.SelectedButton
          onClick={() => {
            setOpenExcluirTriagemAtoModal(true);
          }}
        >
          Excluir
        </S.SelectedButton>
      </S.SelectedButtonWrapper>
    </OptionsForSelectedProcessContainer>
  );
};

export default MutipleSelectOptions;
