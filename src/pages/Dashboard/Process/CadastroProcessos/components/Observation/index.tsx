import { useState } from "react";
import { ObservationParams } from "./observation.interface";
import { ModalConfirmRemoveObservation } from "../ModalConfirmRemoveObservation";
import * as S from "./styled";
import { formatToBrazilianDate } from "../../../../../../utils/formatToBrazilianDate.util";

export const Observation = ({
  observationId,
  processId,
  name,
  created_at,
  time,
  observation,
}: ObservationParams) => {
  const [
    showModalConfirmRemoveObservation,
    setShowModalConfirmRemoveObservation,
  ] = useState(false);

  return (
    <S.Wrapper>
      {showModalConfirmRemoveObservation && (
        <ModalConfirmRemoveObservation
          observationId={observationId}
          processId={processId}
          setShowModalConfirmRemoveObservation={
            setShowModalConfirmRemoveObservation
          }
        />
      )}
      <S.ObservationHeader>
        <S.Name>
          {name}
          <S.DeleteObservationContainer
            onClick={() => setShowModalConfirmRemoveObservation(true)}
          >
            <S.RemoveIcon weight="fill" />
          </S.DeleteObservationContainer>
        </S.Name>
        <S.Date>
          {formatToBrazilianDate(created_at)} {time.substring(0, 5)}
        </S.Date>
      </S.ObservationHeader>
      <S.Observation>{observation}</S.Observation>
    </S.Wrapper>
  );
};
