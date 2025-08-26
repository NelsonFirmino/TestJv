import { ProcessoInAction } from "../../../../../../../api/services/attorneys/attorneys.interface";
import { formatStatusDateCienciaDashboard } from "../../../../../../../utils/formatStatusDateCienciaDashboard.util";
import { formatStatusDateDashboard } from "../../../../../../../utils/formatStatusDateDashboard.util";
import * as S from "./styled";

interface StatusProcessProps {
  data: ProcessoInAction;
  type: "dtCiencia" | "dtPrazo";
}

export const StatusProcessDashboardOperador = ({
  data,
  type,
}: StatusProcessProps) => {
  const { color, prazo } = formatStatusDateDashboard(data.dtPrazo);
  const { colorCiencia, ciencia } = formatStatusDateCienciaDashboard(
    data.dtCiencia
  );

  console.log(data);

  return (
    <>
      {type === "dtCiencia" ? (
        <S.Wrapper color={colorCiencia}>{ciencia}</S.Wrapper>
      ) : (
        <S.Wrapper color={color}>{prazo}</S.Wrapper>
      )}
    </>
  );
};
