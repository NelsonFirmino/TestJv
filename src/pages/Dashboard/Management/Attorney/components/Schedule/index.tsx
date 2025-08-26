import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { getAttorneyScheduleById } from "../../../../../../api/services/attorneys/attorneys";
import { getAudienceByAttorneyId } from "../../../../../../api/services/audiencies/audiences";
import { CustomTable } from "../../../../../../components/CustomTable";
import { SharedState } from "../../../../../../context/SharedContext";
import {
  convertDateFormat2,
  getToday,
  getTomorrow,
} from "../../../../../../utils/Date.utils";
import {
  atualizarSemana,
  getUtilWeek,
} from "../../../../../../utils/getUtilWeek.util";
import { HearingLinkButton } from "./components/HearingLinkButton";
import { ProcessNumber } from "./components/ProcessNumber";
import { Relevant } from "./components/Relevant";
import { SwitchDataTable, SwitchWeekAuxProps } from "./schedule.interface";
import * as S from "./styled";

type ScheduleProps = {
  isOpen: boolean;
};
export const Schedule = ({ isOpen }: ScheduleProps) => {
  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id.toString();
  const [switchDataTable, setSwitchDataTable] = useState<SwitchDataTable>({
    type: "TODAY",
    data: [],
  });
  const [switchWeekAux, setSwitchWeekAux] = useState<SwitchWeekAuxProps>({
    aux: 0,
    type: "TODAY",
    inicio: getUtilWeek().inicio,
    fim: getUtilWeek().fim,
  });
  const {
    mutate: mutateAttorneyScheduleById,
    data: responseAttoneyScheduleById,
    isLoading: isLoadingAttoneyScheduleById,
  } = useMutation(getAttorneyScheduleById);
  const {
    mutate: mutateAudienceByAttorneyId,
    data: responseAudienceByAttorneyId,
    isLoading: isLoadingAudienceByAttorneyId,
  } = useMutation(getAudienceByAttorneyId);

  let today = convertDateFormat2(getToday());

  // Função para converter a string de data para um objeto de data
  const converterParaData = (dataString) => {
    const [dia, mes, ano] = dataString.split("/");
    return new Date(ano, mes - 1, dia);
  };

  // Convertendo as strings para objetos de data
  const dataToday = converterParaData(today);
  const dataWeekIni = converterParaData(switchWeekAux.inicio);
  const dataWeekFim = converterParaData(switchWeekAux.fim);

  useEffect(() => {
    mutateAttorneyScheduleById(
      {
        idProcurador: +user_id,
        dtPrazoInicial:
          dataToday >= dataWeekIni && dataToday <= dataWeekFim
            ? today
            : switchWeekAux.inicio,
        dtPrazoFinal: switchWeekAux.fim,
      },
      {
        onSuccess: (data) => {
          switch (switchWeekAux.type) {
            case "TODAY":
              setSwitchDataTable({
                type: switchWeekAux.type,
                data: data?.data?.filter(
                  (process) => process.dtPrazo == getToday()
                ),
              });
              break;
            case "TOMORROW":
              setSwitchDataTable({
                type: switchWeekAux.type,
                data: data?.data?.filter(
                  (process) => process.dtPrazo == getTomorrow()
                ),
              });
              break;
            case "WEEK":
              setSwitchDataTable({
                type: switchWeekAux.type,
                data: data?.data,
              });
              break;
          }
        },
      }
    );
    mutateAudienceByAttorneyId({
      id: user_id,
      dtInicio:
        dataToday >= dataWeekIni && dataToday <= dataWeekFim
          ? today
          : switchWeekAux.inicio,
      dtFim: switchWeekAux.fim,
    });
  }, [switchWeekAux, isOpen]);

  const processoDeadlineToday = responseAttoneyScheduleById?.data?.filter(
    (process) => process.dtPrazo == getToday()
  );
  const processoDeadlineTomorrow = responseAttoneyScheduleById?.data?.filter(
    (process) => process.dtPrazo == getTomorrow()
  );

  const handleDataTable = (type: any, data: any) => {
    setSwitchDataTable({ type, data });
  };

  const handleSwitchDateAux = (switchNumber: number, type: string) => {
    let aux = switchWeekAux.aux + switchNumber;
    if (!(aux <= -5 || aux >= 5)) {
      const { fim, inicio } = atualizarSemana(aux);
      setSwitchWeekAux({ aux, type: "TODAY", fim, inicio });
    }
  };

  return (
    <S.Wrapper>
      <S.CurrentWeek
        style={{
          position: "absolute",
          zIndex: "9999",
          top: "1.5rem",
          left: "14.4rem",
          fontSize: "1.6rem",
          fontWeight: "400",
          color: "#111827",
        }}
      >
        {dataToday >= dataWeekIni && dataToday <= dataWeekFim
          ? "- Semana Atual"
          : dataToday >= dataWeekFim
          ? "(Passado)"
          : "(Futuro)"}
      </S.CurrentWeek>
      <S.ScheduleOptionsContainer>
        <>
          <S.ScheduleOptionButton
            onClick={() => handleDataTable("TODAY", processoDeadlineToday)}
            isSelected={switchDataTable.type === "TODAY"}
          >
            {isLoadingAttoneyScheduleById ? (
              <>
                <S.LoadingSpinner />
                <S.ScheduleOptionButtonText style={{ marginLeft: "0.6rem" }}>
                  hoje
                </S.ScheduleOptionButtonText>
              </>
            ) : (
              <S.ScheduleOptionButtonText>
                {processoDeadlineToday?.length ?? 0} hoje
              </S.ScheduleOptionButtonText>
            )}
          </S.ScheduleOptionButton>
          <S.ScheduleOptionButton
            onClick={() =>
              handleDataTable("TOMORROW", processoDeadlineTomorrow)
            }
            isSelected={switchDataTable.type === "TOMORROW"}
          >
            {isLoadingAttoneyScheduleById ? (
              <>
                <S.LoadingSpinner />
                <S.ScheduleOptionButtonText style={{ marginLeft: "0.6rem" }}>
                  amanhã
                </S.ScheduleOptionButtonText>
              </>
            ) : (
              <S.ScheduleOptionButtonText>
                {processoDeadlineTomorrow?.length ?? 0} amanhã
              </S.ScheduleOptionButtonText>
            )}
          </S.ScheduleOptionButton>
          <S.ScheduleOptionButton
            onClick={() =>
              handleDataTable("WEEK", responseAttoneyScheduleById.data)
            }
            isSelected={switchDataTable.type === "WEEK"}
          >
            {isLoadingAttoneyScheduleById ? (
              <>
                <S.LoadingSpinner />
                <S.ScheduleOptionButtonText style={{ marginLeft: "0.6rem" }}>
                  nesta semana
                </S.ScheduleOptionButtonText>
              </>
            ) : (
              <S.ScheduleOptionButtonText>
                {" "}
                {responseAttoneyScheduleById?.data?.length ?? 0} nesta semana
              </S.ScheduleOptionButtonText>
            )}
          </S.ScheduleOptionButton>
          <S.AudienceOptionButton
            onClick={() =>
              handleDataTable("AUDIENCE", responseAudienceByAttorneyId?.data)
            }
            isSelected={switchDataTable.type === "AUDIENCE"}
          >
            <S.AudienceIcon />
            {isLoadingAudienceByAttorneyId ? (
              <>
                <S.LoadingSpinner />
                <S.ScheduleOptionButtonText style={{ marginLeft: "0.6rem" }}>
                  audiências
                </S.ScheduleOptionButtonText>
              </>
            ) : (
              <S.ScheduleOptionButtonText>
                {responseAudienceByAttorneyId?.data?.length ?? 0} audiências
              </S.ScheduleOptionButtonText>
            )}
          </S.AudienceOptionButton>

          <S.SwitchDateContainer>
            <S.ButtonContainer
              disabled={
                switchWeekAux.aux === -4 ||
                isLoadingAttoneyScheduleById ||
                isLoadingAudienceByAttorneyId
              }
            >
              <S.SwitchPrevIcon
                notAllowedToSwitch={
                  switchWeekAux.aux === -4 ||
                  isLoadingAttoneyScheduleById ||
                  isLoadingAudienceByAttorneyId
                }
                onClick={() => handleSwitchDateAux(-1, switchDataTable.type)}
              />
            </S.ButtonContainer>
            <S.CurrentWeekTextContainer>
              <S.CurrentWeek>
                {switchWeekAux.inicio} à {switchWeekAux.fim}
              </S.CurrentWeek>
            </S.CurrentWeekTextContainer>
            <S.ButtonContainer
              disabled={
                switchWeekAux.aux === 4 ||
                isLoadingAttoneyScheduleById ||
                isLoadingAudienceByAttorneyId
              }
            >
              <S.SwitchNextIcon
                notAllowedToSwitch={
                  switchWeekAux.aux === 4 ||
                  isLoadingAttoneyScheduleById ||
                  isLoadingAudienceByAttorneyId
                }
                onClick={() => handleSwitchDateAux(1, switchDataTable.type)}
              />
            </S.ButtonContainer>
          </S.SwitchDateContainer>
        </>
      </S.ScheduleOptionsContainer>
      {switchDataTable?.type === "AUDIENCE" ? (
        <CustomTable
          columns={[
            {
              keyData: "txNumero",
              name: "Processo",
              isSortable: false,
            },
            {
              keyData: "txTipoAudiencia",
              name: "Tipo",
              isSortable: false,
            },
            {
              keyData: "txVara",
              name: "Vara",
              isSortable: false,
            },
            {
              keyData: "dtDataHoraInicio",
              name: "Data",
              isSortable: false,
            },
            {
              name: "",
              isSortable: false,
              keyData: "a",
              component: {
                element: (data) => <HearingLinkButton dataTable={data} />,
                isButton: true,
              },
            },
          ]}
          showPagination={true}
          showSelectNumberOfRows={false}
          showSearchField={false}
          data={switchDataTable?.data ? switchDataTable.data : []}
          isLoading={isLoadingAudienceByAttorneyId}
          possibleDataKeyToBeNull={[
            {
              key: "txLink",
              fallback: "--",
            },
            {
              key: "txVara",
              fallback: "--",
            },
          ]}
        />
      ) : (
        <CustomTable
          columns={[
            {
              keyData: "txNumero",
              name: "Processo",
              isSortable: false,
              component: {
                isButton: false,
                element: (data) => <ProcessNumber dataTable={data} />,
              },
            },
            {
              keyData: "txAssunto",
              name: "Assunto(s)",
              isSortable: true,
            },
            {
              keyData: "txRelevancia",
              name: "Relevância",
              isSortable: false,
              component: {
                isButton: false,
                element: (data) => <Relevant dataTable={data} />,
              },
            },
            {
              keyData: "dtPrazo",
              name: "Prazo",
              isSortable: true,
              formatToDate: true,
            },
          ]}
          showPagination={true}
          showSelectNumberOfRows={false}
          showSearchField={false}
          data={switchDataTable?.data ? switchDataTable.data : []}
          isLoading={isLoadingAttoneyScheduleById}
          maxButtonPagination={3}
          possibleDataKeyToBeNull={[
            {
              key: "txAssunto",
              fallback: "--",
            },
          ]}
          defaultSortKeyColumn={{
            key: "dtPrazo",
            direction: "ascending",
          }}
        />
      )}
    </S.Wrapper>
  );
};
