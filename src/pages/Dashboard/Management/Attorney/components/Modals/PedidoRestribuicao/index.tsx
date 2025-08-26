import { useEffect } from "react";
import { JvrisModal } from "../../../../../../../components/JvrisModal";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import usePedidoRestribuicaoModal from "./usePedidoRestribuicaoModal";
import { ProcessosView } from "../../../styled";

const PedidoRestribuicaoModal = () => {
  const {
    close,
    isOpen,
    motivosRedistribuicoes,
    procuradores,
    especializadas,
    selectEspecializada,
    selectMotivoRedis,
    selectProcurador,
    savePedidoRedist,
    processosOptions,
    managing,
    process,
    observacao,
    setObservacao
  } = usePedidoRestribuicaoModal();



  return (
    <JvrisModal modalIsOpen={isOpen} closeModal={close}>
      <SM.Wrapper>
        <SM.TitleContainer>
          <SM.TitleLabel>Pedido de Redistribuição</SM.TitleLabel>
          <SM.TitleButtonWrapper>
            <SM.TitleButton onClick={() => close()}>Fechar</SM.TitleButton>
          </SM.TitleButtonWrapper>
        </SM.TitleContainer>
        <SM.ContentWrapper>
          {process == "" ? (
            <div>
              <SM.ContentTitle>
                <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                  PROCESSO(S) SELECIONADO(S)
                </SM.ContentTitleLabel>
              </SM.ContentTitle>
              <ProcessosView processosOptions={processosOptions} />
            </div>
          ) : (
            <div>
              <SM.ContentTitle>
                <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                  PROCESSO SELECIONADO:
                </SM.ContentTitleLabel>
                <SM.ContentTitleLabel fontSize="12px" fontWeight="bold">
                  {managing.singularSelectedData?.txNumero}
                </SM.ContentTitleLabel>
              </SM.ContentTitle>
            </div>
          )}
          <SM.ContentSeparator />

          <SM.ContentTitle>
            <SM.ContentTitleLabel>
              Motivo da Redistribuição
            </SM.ContentTitleLabel>
          </SM.ContentTitle>

          <SM.ContentSelect
            placeholder="Selecione um Motivo da Redistribuição"
            options={motivosRedistribuicoes?.generalData}
            isClearable={false}
            onChange={selectMotivoRedis}
          /*  isLoading={loadingAudiencesList} */
          />
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
            name="txObservacao"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
          />

          <SM.ContentButton onClick={savePedidoRedist}>
            <SM.ContentButtonLabel>Enviar Pedido</SM.ContentButtonLabel>
          </SM.ContentButton>
        </SM.ContentWrapper>
      </SM.Wrapper>
    </JvrisModal>
  );
};

export default PedidoRestribuicaoModal;
