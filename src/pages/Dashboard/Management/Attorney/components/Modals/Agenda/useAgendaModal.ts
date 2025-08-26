import { useEffect, useState } from "react";
import useDashboardsService from "../../../../../../../api/services/Dashboards";
import { agendaSemanalI } from "../../../../../../../api/services/Dashboards/interface";
import {
  convertDateFormat,
  getToday,
  getTomorrow,
  getWeek,
} from "../../../../../../../utils/Date.utils";
import { AttorneyProcessesInOperationDataI } from "../../../../../../../api/services/attorneys/processesInOperation/attorneys.processesInOperation.interface";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { usePrazosContext } from "../../../context/PrazosContext";
import useAudienciasService from "../../../../../../../api/services/Procuradores/audiencias/useAudienciasService";
import { SharedState } from "../../../../../../../context/SharedContext";

const useAgendaModal = () => {
  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;
  const { data } = useTablesContext();
  const { isModalOpen, closeModal, openModal } = useModalsContext();
  const {
    processosVencendoAmanha,
    processosVencendoHoje,
    processosVencendoNessaSemana,
    updateProcessos,
  } = usePrazosContext();
  const { agendasSemanais, getAgendasSemanais } = useDashboardsService();
  const [agendaSemanal, setAgendaSemanal] = useState<agendaSemanalI>();
  const { audiencias, getAudiencias } = useAudienciasService();
  const [processosMostrando, setProcessosMostrando] = useState<
    AttorneyProcessesInOperationDataI[]
  >([]);
  const [prazosSelected, setPrazosSelected] = useState(0);
  const [audienciasSelected, setAudienciasSelected] = useState(-1);

  useEffect(() => {
    getAgendasSemanais();
  }, []);

  useEffect(() => {
    if (prazosSelected != -1) updateProcessoMostrando(prazosSelected);
  }, [
    processosVencendoHoje,
    processosVencendoAmanha,
    processosVencendoNessaSemana,
  ]);

  useEffect(() => {
    if (agendasSemanais) {
      const thisWeek = getWeek(new Date(getToday()));
      for (let i = 0; i < agendasSemanais.length; i++) {
        const agenda = agendasSemanais[i];
        if (
          agenda.dtInicio == thisWeek.startOfWeekFormatted &&
          agenda.dtFim == thisWeek.endOfWeekFormatted
        ) {
          setAgendaSemanal(agenda);
          updateWeek(agenda);
          break;
        }
      }
    }
  }, [agendasSemanais]);
  useEffect(() => {
    if (agendaSemanal && data.attorneyProcessesInOperationList) {
      const procVhj = data.attorneyProcessesInOperationList.filter(
        (process) => process.dtPrazo == getToday()
      );
      const procVam = data.attorneyProcessesInOperationList.filter(
        (process) => process.dtPrazo == getTomorrow()
      );
      const procVsem = data.attorneyProcessesInOperationList.filter(
        (process) =>
          process.dtPrazo >= convertDateFormat(agendaSemanal.dtInicio) &&
          process.dtPrazo <= convertDateFormat(agendaSemanal.dtFim)
      );
      updateProcessos(procVhj, "hoje");
      updateProcessos(procVam, "amanha");
      updateProcessos(procVsem, "essaSemana");
    }
  }, [agendaSemanal, data.attorneyProcessesInOperationList]);

  function updateWeek(agenda: agendaSemanalI) {
    /* const procVam = agendasSemanais?.filter(
            (agen) => agen.nuSemana === agenda.nuSemana
        ); */

    getAudiencias({
      procurador: +user_id,
      datafim: agenda.dtFim,
      datainicio: agenda.dtInicio,
    });

    //setProcessosVencendoAmanha(procVam ? procVam : []);
  }

  function moveAgendaFoward() {
    if (agendasSemanais) {
      const index = agendasSemanais.indexOf(agendaSemanal!);
      if (index < agendasSemanais.length - 1) {
        const agendaSem = agendasSemanais[index + 1];
        setAgendaSemanal(agendaSem);
        updateWeek(agendaSem);
      }
    }
  }

  function moveAgendaBack() {
    if (agendasSemanais) {
      const index = agendasSemanais.indexOf(agendaSemanal!);
      if (index > 0) {
        const agendaSem = agendasSemanais[index - 1];
        setAgendaSemanal(agendaSem);
        updateWeek(agendaSem);
      }
    }
  }

  function updateProcessoMostrando(prazoSelecionado: number) {
    if (prazoSelecionado == 0) {
      setProcessosMostrando(processosVencendoHoje);
    } else if (prazoSelecionado == 1) {
      setProcessosMostrando(processosVencendoAmanha);
    } else if (prazoSelecionado == 2) {
      setProcessosMostrando(processosVencendoNessaSemana);
    }
  }

  return {
    close: closeModal,
    open: openModal,
    isOpen: isModalOpen(modalsID.agenda),
    agendasSemanais,
    agendaSemanal,
    audiencias,
    moveAgendaFoward,
    moveAgendaBack,
    updateWeek,
    processosVencendoAmanha,
    processosVencendoHoje,
    processosVencendoNessaSemana,
    processosMostrando,
    updateProcessoMostrando,
    setPrazosSelected,
    prazosSelected,
    audienciasSelected,
    setAudienciasSelected,
  };
};

export default useAgendaModal;
