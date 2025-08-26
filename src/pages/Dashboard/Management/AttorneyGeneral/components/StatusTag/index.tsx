import { formatStatusDate } from "../../../../../../utils/formatStatusDate.util";
import * as S from "./styled";

export const StatusTag = (data: any) => {
  const { prazo, color } = formatStatusDate(data.dataTable?.dtPrazo);
  return <S.Tag color={color}>{prazo}</S.Tag>;
};
