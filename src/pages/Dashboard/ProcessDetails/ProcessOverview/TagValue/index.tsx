import * as S from "./styled";

type TagValueParams = {
  processValue: number;
};

export const TagValue = ({ processValue }: TagValueParams) => {
  let value = "";
  let color = "";
  const SALARIO_MINIMO = 1412;
  if (processValue) {
    if (processValue < SALARIO_MINIMO * 20) {
      value = "pequeno valor";
      color = "#3E8F00";
    }
    if (
      processValue > SALARIO_MINIMO * 20 &&
      processValue < SALARIO_MINIMO * 100
    ) {
      value = "médio valor";
      color = "#d1d119";
    }
    if (processValue > SALARIO_MINIMO * 100) {
      value = "grande valor";
      color = "#AC0D00";
    }
  } else {
    return;
  }
  return <S.ContainerTagValue color={color}>{value}</S.ContainerTagValue>;
};
