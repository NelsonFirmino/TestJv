import { useContext, useEffect, useState } from "react";
import useAtosService from "../../../../../../../api/services/atos/atos";
import { toast } from "react-hot-toast";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { OptionsType } from "../../../interfaces";
import { HotToastError, HotToastSucess, HotToastWarning } from "../../../../../../../components/HotToastFuncs";

const useAlterarPrazoModal = () => {
  const { managing } = useTablesContext();
  const { isModalOpen, closeModal, openModal, currModal,setShouldReset } = useModalsContext();

  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const { alterarPrazo } = useAtosService();
  const [process, setProcess] = useState("");
  const [processosOptions, setProcessosOptions] = useState<OptionsType[]>([]);
  const [processosSelecionados, setProcessosSelecionados] = useState<
    OptionsType[]
  >([]);

  function mapToOptionsType(
    data: any[],
    valueKey: string,
    labelKey: string
  ): OptionsType[] {
    return data.map((item: any) => {
      return {
        value: item[valueKey],
        label: item[labelKey],
        isFixed: true,
        isSelected: true,
      };
    });
  }

  useEffect(() => {
    if (managing.selectedData) {
      const mappedData = mapToOptionsType(
        managing.selectedData,
        "id",
        "txNumero"
      );
      setProcessosOptions(mappedData);
      setProcessosSelecionados(mappedData);
    }
  }, [managing.selectedData]);

  useEffect(() => {
    if (currModal == modalsID.alterarPrazo)
      managing.singularSelectedData &&
        setProcess(managing.singularSelectedData!.txNumero);
  }, [managing.singularSelectedData]);

  function reset() {
    managing.resetSingularSelectedData();
    setProcess("");
    closeModal();
  }

  function handleDateChange(e: any) {
    const date = new Date(e.target.value);
    setDate(date.toISOString().substring(0, 10));
  }

  function handleAlterarPrazo() {
    process
      ? alterarPrazo({
          id: managing.singularSelectedData.id as number,
          data: date,
        })
          .then((res) => {
            HotToastSucess("Data alterada com sucesso");
            setShouldReset(true);
          })
          .catch((err) => {
            HotToastError("Erro ao alterar data");
          })
      : managing.selectedData.map((item: any) => {
          alterarPrazo({
            id: item.id,
            data: date,
          })
            .then((res) => {
              HotToastSucess("Data alterada com sucesso");
              setShouldReset(true);
            })
            .catch((err) => {
              HotToastWarning("Erro ao alterar data");
            });
        });
    closeModal();
  }

  return {
    close: reset,
    open: openModal,
    isOpen: isModalOpen(modalsID.alterarPrazo),
    date,
    handleDateChange,
    handleAlterarPrazo,
    process,
    managing,
    processosOptions,
    processosSelecionados,
  };
};

export default useAlterarPrazoModal;
