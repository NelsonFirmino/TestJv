import { useState } from "react";
import { useActsAndProcedure } from "../../../../../hooks/useActsAndProcedure";
import { formatToBrazilianDate } from "../../../../../utils/formatToBrazilianDate.util";
import { ModalSeeProcedure } from "../components/ModalSeeProcedure";
import * as S from "./styled";
import { ModalAddActObservation } from "../components/ModalAddActObservation";

type ActAndObserationTableProps = {
  process_id: string;
};

export const ActAndObservationTable = ({
  process_id
}: ActAndObserationTableProps) => {
  const [showModalActObservation, setShowModalActObservation] = useState({
    open: false,
    processId: process_id,
    idAto: null,
  })
  const [showModalSeeProcedure, setShowModalSeeProcedure] = useState<{
    open?: boolean;
    actId: string;
  }>({
    open: false,
    actId: "0",
  });
  const { actAndProcedure, isLoadingctAndProcedure } =
    useActsAndProcedure(process_id);

  if (isLoadingctAndProcedure) {
    return <S.LoadingSpinner />;
  }

  if (
    !actAndProcedure?.data ||
    actAndProcedure?.data?.length === 0 ||
    actAndProcedure?.status === "BadRequest"
  ) {
    return (
      <S.RowMessage colSpan={3}>
        Nenhum ato ou tramitação registrada
      </S.RowMessage>
    );
  }

  return (
    <>
      {actAndProcedure?.data.reverse().map((ap) => (
        <S.RowTableObservation key={ap.id}>
          <td style={{ fontWeight: "bold" }}>
            {ap.nuCodigoAviso ? ap.nuCodigoAviso : "--"}
          </td>
          <td>{ap.txOrgaoJulgador}</td>
          <td>{ap.isUrgente ? "URGENTE" : "NORMAL"}</td>
          <td>{ap.txSecretaria}</td>
          <td>{ap.txEspecializada}</td>
          <td>{formatToBrazilianDate(ap.dtCiencia)}</td>
          <td>{ap.dtPrazo ? formatToBrazilianDate(ap.dtPrazo) : "--"}</td>
          <td>
            {ap?.dtDistribuicao
              ? formatToBrazilianDate(ap.dtDistribuicao)
              : "--"}
          </td>
          <td>{ap?.txProcurador ? ap.txProcurador : "--"}</td>

          <S.ButtonTD>
            <S.SeeActDetails
              to={`/dashboard/detalhes-processo/visualizar-ato/${ap.id}`}
            >
              <S.SeeActObservationIcon weight="bold" alt="Cadastro do ato" />
            </S.SeeActDetails>
            <S.SeeActButtonTable
              onClick={() => {
                setShowModalActObservation({
                  open: true,
                  processId: process_id,
                  idAto: ap.id.toString(),
                });
              }}
            >
              <S.AddObservationIcon weight="fill" alt="Observação do ato" />
            </S.SeeActButtonTable>
            <S.InfoButtonTable
              onClick={() =>
                setShowModalSeeProcedure({
                  actId: ap.id.toString(),
                  open: true,
                })
              }
            >
              <S.InfoObservationIcon weight="bold" alt="Ver tranmitações" />
            </S.InfoButtonTable>
          </S.ButtonTD>
        </S.RowTableObservation>
      ))}
    </>
  );
};
