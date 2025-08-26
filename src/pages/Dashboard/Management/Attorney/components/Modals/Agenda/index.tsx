import { JvrisModal } from "../../../../../../../components/JvrisModal";
import useAgendaModal from "./useAgendaModal";
import * as SM from "../../../../../../../components/JvrisModal/styled";
import {
  CalendarBlank,
  CaretCircleLeft,
  CaretCircleRight,
  ClockClockwise,
} from "phosphor-react";
import theme from "../../../../../../../globalStyle/theme";
import JvrisTable from "../../../../../../../components/JvrisTable";
import ContentSwitcher from "../../../../../../../components/ContentsSwitcher";
import { line_keys_table } from "../../../../../../../components/JvrisTable/Helpers/utils";
import { AudienciasWrapper } from "./styled";
import { AudienciasColumns, AudienciasCustomTable } from "./utils";

const AgendaModal = () => {
  const {
    close,
    isOpen,
    moveAgendaBack,
    moveAgendaFoward,
    agendaSemanal,
    processosVencendoHoje,
    processosVencendoAmanha,
    processosVencendoNessaSemana,
    audiencias,
    updateProcessoMostrando,
    processosMostrando,
    prazosSelected,
    setPrazosSelected,
    audienciasSelected,
    setAudienciasSelected,
  } = useAgendaModal();

  return (
    <JvrisModal modalIsOpen={isOpen} closeModal={close}>
      <SM.Wrapper>
        <SM.TitleContainer>
          <SM.TitleLabel>Agenda Semanal</SM.TitleLabel>
          <SM.TitleButtonWrapper>
            <SM.TitleButton onClick={() => close()}>Fechar</SM.TitleButton>
          </SM.TitleButtonWrapper>
        </SM.TitleContainer>
        <SM.ContentWrapper>
          <SM.ContentTitle
            style={{
              //borderRadius: "1rem",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CaretCircleLeft
              color={theme.colors.jvrisAqua}
              weight="bold"
              cursor={"pointer"}
              onClick={moveAgendaBack}
              width={40}
              height={40}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `4px solid ${theme.colors.jvrisAqua}`,
                padding: "0.8rem",
                borderRadius: "1rem",
                margin: "0rem 2rem",
              }}
            >
              <CalendarBlank
                weight="bold"
                width={40}
                height={40}
                color={theme.colors.jvrisAqua}
              />
              <SM.ContentTitleLabel
                style={{
                  fontSize: "2.4rem",
                  paddingLeft: "0.4rem",
                  fontWeight: "bold",
                  color: theme.colors.jvrisAqua,
                  userSelect: "none",
                }}
              >
                {`${agendaSemanal?.dataExtenso}`}
              </SM.ContentTitleLabel>
            </div>
            <CaretCircleRight
              color={theme.colors.jvrisAqua}
              weight="bold"
              cursor={"pointer"}
              onClick={moveAgendaFoward}
              width={40}
              height={40}
            />
          </SM.ContentTitle>
          <SM.ContentWrapperRowOrColumn
            style={{
              justifyContent: "center",
              borderTop: `2px solid ${theme.colors.lightGrey}`,
            }}
          >
            <SM.ContentWrapper
              style={{
                gap: "1.5rem",
                borderRight: `2px solid ${theme.colors.lightGrey}`,
                alignItems: "center",
                minWidth: "500px",
                flex: 1,
              }}
            >
              <SM.ContentTitleLabel
                fontSize="2rem"
                fontWeight="bold"
                style={{
                  marginTop: "1.4rem",
                }}
              >
                <ClockClockwise
                  size={20}
                  weight="bold"
                  style={{ marginRight: "5px", paddingTop: "5px" }}
                />
                Prazos vencendo
              </SM.ContentTitleLabel>

              <ContentSwitcher
                clickReset
                currentSelected={prazosSelected}
                setCurrentSelected={setPrazosSelected}
                containerStyle={{
                  marginBottom: "10px",
                }}
                switchers={[
                  {
                    amount: processosVencendoHoje.length,
                    name: "Hoje",
                    onClick: () => {
                      updateProcessoMostrando(0);
                    },
                  },
                  {
                    amount: processosVencendoAmanha.length,
                    name: "Amanha",
                    onClick: () => updateProcessoMostrando(1),
                  },
                  {
                    amount: processosVencendoNessaSemana.length,
                    name: "Nesta Semana",
                    onClick: () => updateProcessoMostrando(2),
                  },
                ]}
              />
              {prazosSelected > -1 && (
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <JvrisTable
                    Searchable={false}
                    maxRows={false}
                    maxHeigthToCollapse={"200px"}
                    columns={[
                      {
                        text: "Processo",
                      },
                    ]}
                    //formatDataToTable ["txNumero", "txRelevancia"]
                    data={line_keys_table(processosMostrando, [
                      {
                        key: "txNumero",
                      },
                      {
                        key: "txRelevancia",
                        design: {
                          name: "RelevanciaAto",
                        },
                      },
                    ])}
                  />
                </div>
              )}
            </SM.ContentWrapper>

            <SM.ContentWrapper
              style={{
                gap: "1.5rem",
                alignItems: "center",
                flex: 1,
              }}
            >
              <SM.ContentTitleLabel
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  marginTop: "1.4rem",
                  width: "max-content",
                }}
              >
                <CalendarBlank
                  size={20}
                  weight="bold"
                  style={{ marginRight: "5px", paddingTop: "5px" }}
                />
                Audiências
              </SM.ContentTitleLabel>
              <ContentSwitcher
                clickReset
                currentSelected={audienciasSelected}
                setCurrentSelected={setAudienciasSelected}
                containerStyle={{
                  marginBottom: "10px",
                }}
                switchers={[
                  {
                    amount: audiencias.length,
                    name: "Nesta Semana",
                  },
                ]}
              />
              {audienciasSelected > -1 && (
                <AudienciasWrapper>
                  <JvrisTable
                    Searchable={false}
                    maxRows={false}
                    columns={AudienciasColumns}
                    data={AudienciasCustomTable(audiencias)}
                  />
                </AudienciasWrapper>
              )}
            </SM.ContentWrapper>
          </SM.ContentWrapperRowOrColumn>
        </SM.ContentWrapper>
      </SM.Wrapper>
    </JvrisModal>
  );
};

export default AgendaModal;
