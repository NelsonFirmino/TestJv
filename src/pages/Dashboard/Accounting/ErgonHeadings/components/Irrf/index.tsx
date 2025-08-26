import * as S from "./styled";
const Irrf = ({ dataTable }: any) => {
  const handleIrrf = (irrf: boolean) => {
    if (irrf) {
      return <S.Text style={{ color: "blue" }}>Sim</S.Text>;
    } else {
      return <S.Text style={{ color: "red" }}>Não</S.Text>;
    }
  };
  return <S.Wrapper>{handleIrrf(dataTable.isIrrf)}</S.Wrapper>;
};

export default Irrf;
