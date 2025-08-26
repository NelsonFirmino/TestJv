import * as S from "./styled";
const TipoCalculo = ({ dataTable }: any) => {
  const handleTipoCalculo = (tipoCalculo: number) => {
    switch (tipoCalculo) {
      case 0:
        return <S.Text>---</S.Text>;
        break;
      case 1:
        return <S.Text>Salário</S.Text>;
        break;
      case 2:
        return <S.Text>Percentual Salário</S.Text>;
        break;
      case 3:
        return <S.Text>Valor Fixo</S.Text>;
        break;
      case 4:
        return <S.Text>13° Salário</S.Text>;
        break;
      case 5:
        return <S.Text>Férias</S.Text>;
        break;
      default:
        <S.Text>---</S.Text>;
    }
  };
  return <S.Wrapper>{handleTipoCalculo(dataTable.nuTipoCalculo)}</S.Wrapper>;
};

export default TipoCalculo;
