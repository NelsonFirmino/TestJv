import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { ProcessoInAction } from "../../../../../../api/services/attorneys/attorneys.interface";
import { getAudienceByAttorneyId } from "../../../../../../api/services/audiencies/audiences";
import { getProcessosRelevantesMes } from "../../../../../../api/services/processosRelevantesMes/processosRelecantesMes";
import { BaseModal } from "../../../../../../components/BaseModal";
import { DashboardCard } from "../../../../../../components/DashboardCard";
import { SharedState } from "../../../../../../context/SharedContext";
import { usePecasNaoFinalizadas } from "../../../../../../hooks/usePecasNaoFinalizadas";
import {
  convertDateFormat2,
  getToday,
  getTomorrow,
} from "../../../../../../utils/Date.utils";
import { convertDateFormat } from "../../../../../../utils/convertDateFormat.util";
import { getFirstAndLastDayMonth } from "../../../../../../utils/getFirstAndLastDayMonth.util";
import { getUtilWeek } from "../../../../../../utils/getUtilWeek.util";
import * as S from "../../styled";
import { Schedule } from "../Schedule";
import { PecasNaoFinalizadasModal } from "./PecasNaoFinalizadasModal";

type CardsProps = {
  data?: ProcessoInAction[];
  isLoading: boolean;
};

const Cards = ({ data, isLoading }: CardsProps) => {
  const [isOpenSheduleModal, setOpenSheduleModal] = useState(false);
  const [isOpenPecasNFinalizadasModal, setOpenPecasNFinalizadasModal] =
    useState(false);
  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;
  const {
    mutate: mutateProcessosRelevantesMes,
    data: response,
    isLoading: isLoadingProcessosRelevantesMes,
  } = useMutation(getProcessosRelevantesMes);
  const {
    mutate: mutateAudienceByAttorneyId,
    data: responseAudienceByAttorneyId,
    isLoading: isLoadingAudienceByAttorneyId,
  } = useMutation(getAudienceByAttorneyId);

  const { pecasNaoFinalizadas, isLoadingPecasNaoFinalizadas } =
    usePecasNaoFinalizadas(+user_id);

  let dataAtual = new Date();

  const processoDeadlineToday =
    !isLoading && data?.filter((process) => process.dtPrazo == getToday());
  const processoDeadlineTomorrow =
    !isLoading && data?.filter((process) => process.dtPrazo == getTomorrow());
  const processoDeadlineWeek =
    !isLoading &&
    data?.filter(
      (process) =>
        process.dtPrazo >= formatarData(dataAtual) &&
        process.dtPrazo <= convertDateFormat(getUtilWeek().fim)
    );

  let today = convertDateFormat2(getToday());

  function formatarData(data) {
    const dataFormatada = new Date(data);
    const dia = dataFormatada.getDate().toString().padStart(2, "0");
    const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataFormatada.getFullYear().toString();
    return `${ano}-${mes}-${dia}`;
  }

  useEffect(() => {
    mutateProcessosRelevantesMes({
      idProcurador: +user_id,
      dtInicio: convertDateFormat(getFirstAndLastDayMonth().primeiroDiaMes),
      dtFim: convertDateFormat(getFirstAndLastDayMonth().ultimoDiaMes),
    });
    mutateAudienceByAttorneyId({
      id: user_id.toString(),
      dtInicio: formatarData(dataAtual),
      dtFim: convertDateFormat(getUtilWeek().fim),
    });
  }, [user_id]);

  return (
    <S.CardsGrid>
      <DashboardCard
        title="Agenda semanal"
        request={{
          isLoading:
            isLoading ||
            isLoadingProcessosRelevantesMes ||
            isLoadingAudienceByAttorneyId,
        }}
        button={
          <S.ScheduleButton
            disabled={
              isLoading ||
              isLoadingProcessosRelevantesMes ||
              isLoadingAudienceByAttorneyId
            }
            onClick={() => setOpenSheduleModal(true)}
          >
            <S.ScheduleButtonIcon weight="bold" alt="Abrir agenda" />
          </S.ScheduleButton>
        }
      >
        <BaseModal
          title="Agenda semanal"
          // title={
          //   today >= getUtilWeek().inicio && today <= getUtilWeek().fim
          //     ? "Agenda Semanal - Semana Atual"
          //     : "Agenda Semanal"
          // }
          isOpenModal={isOpenSheduleModal}
          setOpenModal={setOpenSheduleModal}
          isSchedule={true}
        >
          <Schedule isOpen={isOpenSheduleModal} />
        </BaseModal>
        <S.CardLineContent>
          <S.CardNumberToday isMoreThanZero={Boolean(processoDeadlineToday)}>
            {processoDeadlineToday?.length}
          </S.CardNumberToday>{" "}
          processo(s) vencendo hoje
        </S.CardLineContent>
        <S.CardLineContent>
          <S.CardNumberTomorrow
            isMoreThanZero={Boolean(processoDeadlineTomorrow)}
          >
            {processoDeadlineTomorrow?.length}
          </S.CardNumberTomorrow>{" "}
          processo(s) vencendo amanhã
        </S.CardLineContent>
        <S.CardLineContent>
          {processoDeadlineWeek?.length} processo(s) vencendo nesta semana
        </S.CardLineContent>
        <S.CardLineContent>
          {responseAudienceByAttorneyId?.data?.length || 0} audiências para esta
          semana
        </S.CardLineContent>
      </DashboardCard>

      <DashboardCard
        title="Atuações do mês"
        request={{ isLoading: isLoadingProcessosRelevantesMes }}
      >
        <S.CardLineContent>
          {response?.data.nuDistribuicaoRecebida} distribuições recebidas
        </S.CardLineContent>
        <S.CardLineContent>
          {response?.data.nuRedistribuicoes} redistribuições recebidas
        </S.CardLineContent>
        <S.CardLineContent>
          {response?.data.processoConcluido} distribuições concluídas com peças
        </S.CardLineContent>
      </DashboardCard>

      <DashboardCard
        title="Peças"
        request={{
          isLoading: isLoadingPecasNaoFinalizadas,
        }}
      >
        <BaseModal
          title="Peças não finalizadas"
          isOpenModal={isOpenPecasNFinalizadasModal}
          setOpenModal={setOpenPecasNFinalizadasModal}
          isSchedule={false}
        >
          <PecasNaoFinalizadasModal />
        </BaseModal>
        <S.PecasNaoFinalizadasLine>
          <S.CardLineContent>
            <S.PecasNaoFinalizadasNumber
              isMoreThanZero={Boolean(
                pecasNaoFinalizadas?.data
                  ? pecasNaoFinalizadas?.data?.length
                  : 0
              )}
            >
              {pecasNaoFinalizadas?.data
                ? pecasNaoFinalizadas?.data?.length
                : "0"}
            </S.PecasNaoFinalizadasNumber>{" "}
            não finalizada(s)
          </S.CardLineContent>
          <S.PecasNaoFinalizadasButton
            disabled={isLoadingPecasNaoFinalizadas}
            onClick={() => setOpenPecasNFinalizadasModal(true)}
          >
            <S.PecasNaoFinalizadasButtonIcon
              weight="bold"
              alt="Abrir peças não finalizadas"
            />
          </S.PecasNaoFinalizadasButton>
        </S.PecasNaoFinalizadasLine>
        <S.CardLineContent>
          <S.PecasFinalizadasMesNumber
            isMoreThanZero={Boolean(response?.data.pecasFinalizadas)}
          >
            {response?.data.pecasFinalizadas}
          </S.PecasFinalizadasMesNumber>{" "}
          finalizada(s) no mês
        </S.CardLineContent>
      </DashboardCard>

      <DashboardCard
        title="Fichas de cálculo mensal"
        request={{ isLoading: isLoadingProcessosRelevantesMes }}
      >
        <S.CardLineContent>
          {response?.data.fichasRespondidas} respondida(s) no mês
        </S.CardLineContent>
        <S.CardLineContent>
          {response?.data.fichasPendentes} aguardando resposta(s)
        </S.CardLineContent>
      </DashboardCard>

      <DashboardCard
        title="Processos relevantes do mês"
        request={{ isLoading: isLoadingProcessosRelevantesMes }}
      >
        <S.CardLineContent>
          {response?.data.nuValorExpressivo} valor expressivo
        </S.CardLineContent>
        <S.CardLineContent>
          {response?.data.processosTCE} processo(s) TCE
        </S.CardLineContent>
      </DashboardCard>
    </S.CardsGrid>
  );
};

export default Cards;
