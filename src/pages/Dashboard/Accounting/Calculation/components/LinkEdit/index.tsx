import * as S from "./styled";

interface LinkEditI {
  dataTable?: any;
  onClick?: () => void;
}

export const LinkEdit = (props: LinkEditI) => {

  const { dataTable, onClick } = props;

  return (
    <S.Wrapper
      onClick={onClick}>
      Editar
    </S.Wrapper>
  );
};
