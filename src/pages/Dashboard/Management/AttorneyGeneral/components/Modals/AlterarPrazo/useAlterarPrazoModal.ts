import { useContext, useEffect, useState } from "react";
import useAtosService from "../../../../../../../api/services/atos/atos";
import { toast } from "react-hot-toast";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { OptionsType } from "../../../interfaces";

const useAlterarPrazoModal = () => {
  const { managing } = useTablesContext();
  const { isModalOpen, closeModal, openModal, currModal } = useModalsContext();

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
            toast("Data alterada com sucesso", {
              icon: "👏",
              style: {
                borderRadius: "10px",
                background: "#81c784",
                color: "#fff",
                fontSize: "30px",
              },
            });
          })
          .catch((err) => {
            toast.error("Erro ao alterar data", {
              icon: "😥",
              style: {
                borderRadius: "10px",
                background: "#e57373",
                color: "#fff",
                fontSize: "30px",
              },
            });
          })
      : managing.selectedData.map((item: any) => {
          alterarPrazo({
            id: item.id,
            data: date,
          })
            .then((res) => {
              toast("Data alterada com sucesso", {
                icon: "👏",
                style: {
                  borderRadius: "10px",
                  background: "#81c784",
                  color: "#fff",
                  fontSize: "30px",
                },
              });
            })
            .catch((err) => {
              toast.error("Erro ao alterar data", {
                icon: "😥",
                style: {
                  borderRadius: "10px",
                  background: "#e57373",
                  color: "#fff",
                  fontSize: "30px",
                },
              });
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
