import * as S from "./styled";
const TipoRpv = ({ dataTable }: any) => {
  const handleTipo = (sigla: string) => {
    if (sigla == "R") {
      return "RPV";
    } else {
      return "Precatórios";
    }
  };
  return <S.Wrapper>{handleTipo(dataTable.txTipo)}</S.Wrapper>;
};

export default TipoRpv;
