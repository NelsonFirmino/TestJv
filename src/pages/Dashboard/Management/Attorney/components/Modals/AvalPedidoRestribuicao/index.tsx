import { useEffect, useState } from "react";
import { JvrisModal } from "../../../../../../../components/JvrisModal";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import theme from "../../../../../../../globalStyle/theme";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { OptionsType, StdState } from "../../../interfaces";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import useRedistribuiçõesService from "../../../../../../../api/services/redistribuições";
import useEspecializadasService from "../../../../../../../api/services/Especializada";
import useTriagensService from "../../../../../../../api/services/Triagens";
import useProcuradorService from "../../../../../../../api/services/Procurador";
import jwtDecode from "jwt-decode";
import toast from "react-hot-toast";
import { mapToSelect } from "../../../../../../../utils/MapDataToSelect";
import { SharedState } from "../../../../../../../context/SharedContext";
import { HotToastError, HotToastSucess, HotToastWarning } from "../../../../../../../components/HotToastFuncs";
import { ProcessosView } from "../../../styled";

const AvalPedidoRestribuicaoModal = () => {
  const { user, selectedUser } = SharedState();
  const user_id =
    selectedUser === null ? user["Jvris.User.Id"] : selectedUser.id;

  const { managing } = useTablesContext();
  const { isModalOpen, closeModal, setShouldReset } = useModalsContext();
  const [especializadas, setEspecializadas] = useState<StdState>();
  const [procuradores, setProcuradores] = useState<StdState>();
  const [processosOptions, setProcessosOptions] = useState<OptionsType[]>([]);
  const [processosSelecionados, setProcessosSelecionados] = useState<
    OptionsType[]
  >([]);

  const [observacao, setObservacao] = useState("");
  const { acatarPedido } = useRedistribuiçõesService();

  const { getMany: getTriagens, triagens } = useTriagensService();
  const { especializadas: espec, getMany: getEspecializadas } =
    useEspecializadasService();
  const { get: getProcurador, procuradores: procs } = useProcuradorService();

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

  function getUnique(arr, index) {
    const unique = arr
      .map((e) => e[index])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    return unique;
  }

  useEffect(() => {
    if (
      managing.selectedData &&
      isModalOpen(modalsID.avalPedidoRedistribuicao)
    ) {
      getTriagens(
        managing.selectedData.map((item) => item.idDistribuicaoAntiga)
      ).then((value) => {
        getEspecializadas(value.map((item) => item.idSecretaria));
      });
    }
  }, [managing.selectedData, isModalOpen(modalsID.avalPedidoRedistribuicao)]);

  useEffect(() => {
    if (espec) {
      const newEspec = getUnique(espec, "id");
      const data = mapToSelect(newEspec, ["id", "txEspecializada"]);
      setEspecializadas({
        generalData: data,
        selected: undefined,
      });
    }
  }, [espec]);

  useEffect(() => {
    if (especializadas?.selected) {
      getProcurador(especializadas?.selected);
    }
  }, [especializadas]);

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

  function acatarPedidos(isRecusado: boolean) {
    const data = managing.selectedData;
    if (data && especializadas?.selected && procuradores?.selected) {
      try {
        data.forEach((element) => {
          acatarPedido({
            id: element.id,
            idEspecializada: especializadas.selected,
            idProcurador: procuradores.selected,
            idUsuarioCadastro: +user["Jvris.User.Id"],
            isRecusado: isRecusado,
            txObservacao: observacao,
          });
        });
        HotToastSucess("Pedido(s) Acatado(s) com Sucesso");
        setShouldReset(true);
        managing.reSeed();
        closeModal();
      } catch (err) {
        HotToastError("Erro ao Acatar Pedido(s)");
      }
    } else {
      HotToastWarning("Selecione uma Especializada e um Procurador");
    }
  }

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

  const resetOnSubmit = () => {
    closeModal();
  };

  return (
    <JvrisModal
      modalIsOpen={isModalOpen(modalsID.avalPedidoRedistribuicao)}
      closeModal={() => resetOnSubmit()}
    >
      <SM.Wrapper>
        <SM.TitleContainer>
          <SM.TitleLabel>Avaliar Pedido de Redistribuição</SM.TitleLabel>
          <SM.TitleButtonWrapper>
            <SM.TitleButton onClick={() => resetOnSubmit()}>
              Fechar
            </SM.TitleButton>
          </SM.TitleButtonWrapper>
        </SM.TitleContainer>
        <SM.ContentWrapper>
          <SM.ContentTitle>
            <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
              PROCESSO(S) SELECIONADO(S)
            </SM.ContentTitleLabel>
          </SM.ContentTitle>
          <ProcessosView processosOptions={processosOptions} />

          <SM.ContentTitle>
            <SM.ContentTitleLabel>Especializada</SM.ContentTitleLabel>
          </SM.ContentTitle>

          <SM.ContentSelect
            placeholder="Selecione uma Especializada"
            options={especializadas?.generalData}
            isClearable={false}
            onChange={selectEspecializada}
          />
          <SM.ContentTitle>
            <SM.ContentTitleLabel>Procurador</SM.ContentTitleLabel>
          </SM.ContentTitle>

          <SM.ContentSelect
            placeholder="Selecione um Procurador"
            options={procuradores?.generalData}
            isClearable={false}
            onChange={selectProcurador}
            isDisabled={especializadas?.selected ? false : true}
          />
          <SM.ContentTitle>
            <SM.ContentTitleLabel>Observações</SM.ContentTitleLabel>
          </SM.ContentTitle>
          <SM.ContentTextArea
            placeholder="Digite aqui as observações"
            value={observacao}
            onChange={handleObservacaoChange}
            name="txObservacao"
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <SM.ContentTitle>
              <SM.ContentTitleLabel>Aceitar Pedido?</SM.ContentTitleLabel>
            </SM.ContentTitle>
            <SM.ContentButton onClick={() => acatarPedidos(false)}>
              <SM.ContentButtonLabel>Sim</SM.ContentButtonLabel>
            </SM.ContentButton>
            <SM.ContentButton onClick={() => acatarPedidos(true)}>
              <SM.ContentButtonLabel
                style={{
                  backgroundColor: theme.colors.softRed,
                }}
              >
                Não
              </SM.ContentButtonLabel>
            </SM.ContentButton>
          </div>
        </SM.ContentWrapper>
      </SM.Wrapper>
    </JvrisModal>
  );
};

export default AvalPedidoRestribuicaoModal;
