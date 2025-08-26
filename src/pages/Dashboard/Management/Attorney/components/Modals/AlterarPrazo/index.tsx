import { JvrisModal } from "../../../../../../../components/JvrisModal";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import { ProcessosView } from "../../../styled";
import useAlterarPrazoModal from "./useAlterarPrazoModal";

const AlterarPrazoModal = () => {
  const {
    close,
    isOpen,
    date,
    handleDateChange,
    handleAlterarPrazo,
    process,
    managing,
    processosOptions,
    processosSelecionados,
  } = useAlterarPrazoModal();

  return (
    <JvrisModal modalIsOpen={isOpen} closeModal={close}>
      <SM.Wrapper>
        <SM.TitleContainer>
          <SM.TitleLabel>Alterar Prazo</SM.TitleLabel>
          <SM.TitleButtonWrapper>
            <SM.TitleButton onClick={close}>Fechar</SM.TitleButton>
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
            <SM.ContentTitleLabel>Novo prazo</SM.ContentTitleLabel>
          </SM.ContentTitle>
          <SM.ContentInputDate
            type="date"
            value={date}
            onChange={handleDateChange}
          />
          <SM.ContentButton>
            <SM.ContentButtonLabel onClick={handleAlterarPrazo}>
              Salvar
            </SM.ContentButtonLabel>
          </SM.ContentButton>
        </SM.ContentWrapper>
      </SM.Wrapper>
    </JvrisModal>
  );
};

export default AlterarPrazoModal;
