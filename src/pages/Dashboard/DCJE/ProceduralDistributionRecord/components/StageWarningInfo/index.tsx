import * as S from "./styled";

export const StageWarningInfo = ({
  proceduralRecordDCJEDataByActId,
  isLoadingProceduralRecordDCJEDataByActId,
}) => {
  let message = "";

  if (
    !isLoadingProceduralRecordDCJEDataByActId &&
    proceduralRecordDCJEDataByActId?.status === "OK"
  ) {
    if (proceduralRecordDCJEDataByActId?.data?.idDistribuicao !== 0) {
      message =
        "Ficha Processual já distribuída para DCJE. Não é possível editar!";
    } else if (proceduralRecordDCJEDataByActId?.data?.isEncerrado) {
      message = "Ficha Processual Encerrada. Não é possível editar!";
    } else if (proceduralRecordDCJEDataByActId?.data?.isDevolvido) {
      message = "Processo devolvido";
    }
  }

  return <S.Wrapper>{message && <p>{message}</p>}</S.Wrapper>;
};
