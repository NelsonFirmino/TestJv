import { useEffect, useState } from "react";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import { JvrisModal } from "../../../../../../../components/JvrisModal";
import theme from "../../../../../../../globalStyle/theme";
import { postComplyRequestForInaction } from "../../../../../../../api/services/complyRequestForInaction/complyRequestForInaction";
import toast from "react-hot-toast";
import { useTablesContext } from "../../../context/TablesContext";
import { useModalsContext } from "../../../context/ModalsContext";
import { modalsID } from "../../../context/ModalsContext/modalsID";
import { OptionsType } from "../../../interfaces";
import { SharedState } from "../../../../../../../context/SharedContext";
import { HotToastSucess, HotToastWarning } from "../../../../../../../components/HotToastFuncs";
import { ProcessosView } from "../../../styled";

const AcatarPedidosModal = () => {
  const { user } = SharedState();
  const { managing } = useTablesContext();
  const { isModalOpen, closeModal, setShouldReset } = useModalsContext();

  const [observacao, setObservacao] = useState("");
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
        "txNumeroProcesso"
      );
      setProcessosOptions(mappedData);
      setProcessosSelecionados(mappedData);
    }
  }, [managing.selectedData]);

  const resetAndClose = () => {
    managing.resetSingularSelectedData();
    setObservacao("");
    closeModal();
  };

  function onSubmit(isRecusado: boolean, txObservacao: string) {
    managing.selectedData?.forEach((value) => {
      postComplyRequestForInaction({
        id: value.id,
        isRecusado,
        txObservacao,
        idUsuarioCadastro: user["Jvris.User.Id"],
      }).then((response) => {
        if (response.status == "Created") {
          if (isRecusado) {
            HotToastWarning("O Pedido Não foi Acatado")
          }
          else {
            HotToastSucess("O Pedido foi Acatado")
          }
          setShouldReset(true);
          resetAndClose();
        } else {
          HotToastWarning("Ocorreu um erro ao acatar o pedido");
        }
      });
    });
  }

  return (
    <JvrisModal
      modalIsOpen={isModalOpen(modalsID.acatarPedidos)}
      closeModal={resetAndClose}
    >
      <SM.Wrapper>
        <SM.TitleContainer>
          <SM.TitleLabel>Acato Pedido Inação</SM.TitleLabel>
          <SM.TitleButtonWrapper>
            <SM.TitleButton onClick={resetAndClose}>Fechar</SM.TitleButton>
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
            <SM.ContentTitleLabel>Parecer</SM.ContentTitleLabel>
          </SM.ContentTitle>
          <SM.ContentTextArea
            onChange={(obj) => {
              setObservacao(obj.target.value);
            }}
          />
          <SM.ContentTitle style={{ marginTop: "2rem", marginBottom: "-1rem" }}>
            <SM.ContentTitleLabel>Acatar Pedido?</SM.ContentTitleLabel>
          </SM.ContentTitle>
          <SM.ContentButton
            style={{
              justifyContent: "start",
              marginLeft: "-1rem",
            }}
          >
            <SM.ContentButtonLabel
              width="8rem"
              onClick={() => onSubmit(true, observacao)}
            >
              Sim
            </SM.ContentButtonLabel>
            <SM.ContentButtonLabel
              onClick={() => onSubmit(false, observacao)}
              buttonColor={theme.colors.softRed}
              hoverColor={theme.colors.darkRed}
              width="8rem"
            >
              Não
            </SM.ContentButtonLabel>
          </SM.ContentButton>
        </SM.ContentWrapper>
      </SM.Wrapper>
    </JvrisModal>
  );
};

export default AcatarPedidosModal;
