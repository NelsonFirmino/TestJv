import * as S from "./styled";

export const EditButton = (dataTable: any) => {
  return (
    <S.Wrapper
      to={`/dashboard/cadastros-auxiliares/cadastro-ausencias/${dataTable.dataTable.id}`}
    >
      Editar
    </S.Wrapper>
  );
};
