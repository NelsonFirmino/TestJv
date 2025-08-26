import { ProcessoInAction } from "../../../../../../../api/services/attorneys/attorneys.interface";
import * as S from "./styled";

interface RelevanciaAtoProps {
  data: ProcessoInAction;
}

export const RelevanciaAto = ({ data }: RelevanciaAtoProps) => {
  console.log(data);
  return (
    <S.RelecanciaAtoIcon
      weight={data?.isUrgente ? "fill" : "bold"}
      isUrgente={data.isUrgente}
      alt={data.isUrgente ? "Urgente" : "Normal"}
    />
  );
};
