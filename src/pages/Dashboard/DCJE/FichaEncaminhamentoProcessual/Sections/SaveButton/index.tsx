import * as S from "../../styled";
import useFEPContext from "../../useFEPContext";

const SaveFichaButton = () => {
  const { fichaDCJE, submit, postProceduralRecord, putProceduralRecord } =
    useFEPContext();

  return (
    <S.SaveButtonContainer>
      <S.SaveButton
        onClick={submit}
        disabled={fichaDCJE?.isEncerrado || fichaDCJE?.isDevolvido}
      >
        {fichaDCJE?.id ? "Editar" : "Salvar"}
      </S.SaveButton>
      {(putProceduralRecord.isLoading || postProceduralRecord.isLoading) && (
        <S.LoadingSpinnerSave />
      )}
    </S.SaveButtonContainer>
  );
};

export default SaveFichaButton;
