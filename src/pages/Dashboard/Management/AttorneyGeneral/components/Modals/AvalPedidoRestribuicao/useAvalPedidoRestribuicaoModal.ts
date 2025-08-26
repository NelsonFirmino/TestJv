import { useContext, useState, useEffect } from "react";
import { OptionsType, StdState } from "../../../interfaces";
import useRedistribuiçõesService from "../../../../../../../api/services/redistribuições";
import useEspecializadasService from "../../../../../../../api/services/Especializada";
import useTriagensService from "../../../../../../../api/services/Triagens";
import useProcuradorService from "../../../../../../../api/services/Procurador";
import { AttorneyRedistributionRequestsDataI } from "../../../../../../../api/services/attorneys/redistributionRequests/attorneys.redistributionRequests.interface";
import { toast } from "react-hot-toast";
import { mapToSelect } from "../../../../../../../utils/MapDataToSelect";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import jwtDecode from "jwt-decode";

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

const useAvalPedidoRestribuicaoModal = () => {
  const { managing } = useTablesContext();
  const { isModalOpen, closeModal, currModal } = useModalsContext();

  const [especializadas, setEspecializadas] = useState<StdState>();
  const [procuradores, setProcuradores] = useState<StdState>();

  const [processosOptions, setProcessosOptions] = useState<OptionsType[]>([]);
  const [processosSelecionados, setProcessosSelecionados] = useState<
    OptionsType[]
  >([]);
  const [observacao, setObservacao] = useState("");
  const { acatarPedido } = useRedistribuiçõesService();
  const { especializadas: espec, getMany: getEspecializadas } =
    useEspecializadasService();
  const { getMany: getTriagens, triagens } = useTriagensService();
  const { get: getProcurador, procuradores: procs } = useProcuradorService();

  useEffect(() => {
    if (
      managing.selectedData &&
      isModalOpen(modalsID.avalPedidoRedistribuicao) &&
      currModal === modalsID.avalPedidoRedistribuicao
    ) {
      getTriagens(
        managing.selectedData.map((item) => item.idDistribuicaoAntiga)
      );
    }
  }, [managing.selectedData]);

  useEffect(() => {
    if (triagens) {
      getEspecializadas(triagens.map((item) => item.idSecretaria));
    }
  }, [triagens]);

  useEffect(() => {
    if (espec) {
      const data = mapToSelect(espec, ["id", "txEspecializada"]);
      setEspecializadas({
        generalData: data,
        selected: undefined,
      });
    }
  }, [espec]);

  useEffect(() => {
    if (procs) {
      const data = mapToSelect(procs, ["id", "txProcurador"]);
      setProcuradores({
        generalData: data,
        selected: undefined,
      });
    }
  }, [procs]);

  useEffect(() => {
    if (especializadas?.selected) {
      getProcurador(parseInt(especializadas?.selected.toString()));
    }
  }, [especializadas]);

  useEffect(() => {
    if (managing.selectedData) {
      const mappedData = mapToOptionsType(
        managing.selectedData,
        "txNumeroFormatado",
        "txNumeroFormatado"
      );
      setProcessosOptions(mappedData);
      setProcessosSelecionados(mappedData);
    }
  }, [managing.selectedData]);

  function updateSelectedProcessos(event: any) {
    let ev = event as OptionsType[];
    ev.forEach((item) => {
      item.isSelected = true;
    });
    if (ev) {
      setProcessosSelecionados(ev);
    }
  }

  function handleObservacaoChange(event: any) {
    setObservacao(event.target.value);
  }

  function selectEspecializada(event: any) {
    setEspecializadas({
      generalData: especializadas?.generalData,
      selected: event.value,
    });
  }

  function selectProcurador(event: any) {
    setProcuradores({
      generalData: procuradores?.generalData,
      selected: event.value,
    });
  }

  function resetForm() {
    managing.resetSingularSelectedData();
    closeModal();
  }

  function acatarPedidos(isRecusado: boolean) {
    const data = managing.selectedData;
    if (data && especializadas?.selected && procuradores?.selected)
      try {
        for (let i = 0; i < data.length; i++) {
          //colocar for each aqui
          acatarPedido({
            id: data[i].id,
            idEspecializada: especializadas.selected,
            idProcurador: procuradores.selected,
            idUsuarioCadastro: (
              jwtDecode(localStorage.getItem("token") as any) as any
            )["Jvris.User.Id"],
            isRecusado: isRecusado,
            txObservacao: observacao,
          });
        }

        toast("Sucesso", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#81c784",
            color: "#fff",
            fontSize: "30px",
          },
        });
        resetForm();
      } catch (err) {
        toast("Erro ", {
          icon: "😥",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        });
      }
  }

  return {
    isOpen: isModalOpen(modalsID.avalPedidoRedistribuicao),
    close: resetForm,
    selectEspecializada,
    processosSelecionados,
    processosOptions,
    selectProcurador,
    observacao,
    handleObservacaoChange,
    updateSelectedProcessos,
    especializadas,
    procuradores,
    acatarPedidos,
  };
};

export default useAvalPedidoRestribuicaoModal;
