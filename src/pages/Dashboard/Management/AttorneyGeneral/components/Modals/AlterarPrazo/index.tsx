import {JvrisModal} from "../../../../../../../components/JvrisModal";
import * as SM from "../../../../../../../components/JvrisModal/styled";
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
              <SM.ProcessosSelect
                isSearchable={false}
                placeholder="Clique aqui para ver os processos"
                value={processosSelecionados.filter(
                  (item) => item.isSelected || item.isFixed
                )}
                options={processosOptions}
                isClearable={
                  !processosSelecionados.some((item) => item.isFixed)
                }
                isMulti
                isDisabled
              />
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
