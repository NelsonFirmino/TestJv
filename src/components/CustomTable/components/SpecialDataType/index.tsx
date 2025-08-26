import { formatStatusDate } from "../../../../utils/formatStatusDate.util";
import { SpecialDataTypeProps } from "./interfaces/special-data-type.interface";
import * as S from "./styled";

const SpecialTypeIcon = ({ type, data }: SpecialDataTypeProps) => {
  if (type === "relevancia") {
    return (
      <S.RelevantIcon
        isUrgente={data.isUrgente}
        weight={data.isUrgente ? "fill" : "bold"}
        alt={data.isUrgente ? "Ato - Urgente" : "Ato - Normal"}
      />
    );
  }

  if (type === "status") {
    const { prazo, color } = formatStatusDate(data.dtPrazo);
    return <S.TagStatus color={color}>{prazo}</S.TagStatus>;
  }

  return null;
};

export default SpecialTypeIcon;
