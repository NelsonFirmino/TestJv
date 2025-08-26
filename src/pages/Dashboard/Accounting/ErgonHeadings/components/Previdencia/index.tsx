import * as S from "./styled";
const Previdencia = ({ dataTable }: any) => {
  const handlePrevidencia = (previdencia: boolean) => {
    if (previdencia) {
      return <S.Text style={{ color: "blue" }}>Sim</S.Text>;
    } else {
      return <S.Text style={{ color: "red" }}>Não</S.Text>;
    }
  };
  return <S.Wrapper>{handlePrevidencia(dataTable.isPrevidencia)}</S.Wrapper>;
};

export default Previdencia;
