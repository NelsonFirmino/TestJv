import { ArrowBendDownRight } from "@phosphor-icons/react";
import { useState } from "react";
import { formatToBrazilianDate } from "../../../../../utils/formatToBrazilianDate.util";
import { removeHTMLFormat } from "../../../../../utils/removeHTMLFormat";
import * as S from "./styled";

type RowTablePreviousProcedureParams = {
  dtDataHora: string;
  txTipo: string;
  txDescricao: string;
  txObservacao?: string;
};

export const RowTablePreviousProcedure = ({
  dtDataHora,
  txDescricao,
  txTipo,
  txObservacao,
}: RowTablePreviousProcedureParams) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  return (
    <>
      <S.RowTablePreviousProcedure>
        <S.MainTd style={{ fontWeight: "bold", width: "10%" }}>
          {formatToBrazilianDate(dtDataHora)}
        </S.MainTd>
        {txTipo ? (
          <S.Td
            dangerouslySetInnerHTML={{
              __html: txTipo,
            }}
          />
        ) : (
          ""
        )}
        {txTipo ? (
          <S.Td
            dangerouslySetInnerHTML={{
              __html: txDescricao,
            }}
          />
        ) : (
          ""
        )}

        <S.ButtonTD onClick={() => setShowMoreInfo(!showMoreInfo)}>
          <S.InfoButtonTable>
            <S.InfoObservationIcon weight="bold" alt="Visualizar" />
          </S.InfoButtonTable>
        </S.ButtonTD>
      </S.RowTablePreviousProcedure>
      <S.MoreInfo colSpan={4} showInfo={showMoreInfo}>
        <S.CenteredDiv>
          <S.MoreInfoIcon weight="fill" />
          {txObservacao ? (
            <S.MoreInfoText
              dangerouslySetInnerHTML={{
                __html: txObservacao,
              }}
            />
          ) : (
            <S.MoreInfoText>Nenhuma observação cadastrada.</S.MoreInfoText>
          )}
        </S.CenteredDiv>
      </S.MoreInfo>
    </>
  );
};
