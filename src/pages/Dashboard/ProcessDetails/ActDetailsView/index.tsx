import { useParams } from "react-router-dom";
import { PageTitle } from "../../../../components/TitlePage";
import { useAct } from "../../../../hooks/useAct";
import { useProcessSecretaries } from "../../../../hooks/useProcessSecretaries";
import { formatToBrazilianDate } from "../../../../utils/formatToBrazilianDate.util";
import { useSecretaries } from "../../../../hooks/useSecretaries";
import { ProcessClass } from "./components/ProcessClass";
import { useActAttachments } from "../../../../hooks/useActAttachments";
import { openOctetStreamInNewTab } from "../../../../utils/openOctetStreamInNewTab.util";
import { useActObservations } from "../../../../hooks/useActObservations";
import { useState } from "react";
import { ModalRegisterAudience } from "./components/ModalRegisterAudienceModal";
import { useActAudience } from "../../../../hooks/useActAudience";
import { ModalRemoveAudience } from "./components/ModalRemoveAudience";
import * as S from "./styled";

const ActDetailsView = () => {
  const { act_id } = useParams();
  const { isLoadingAct, act } = useAct(act_id);
  const { isLoadingProcessSecretaries, processSecretaries } =
    useProcessSecretaries();
  const { secretariesList, loadingSecretariesist } = useSecretaries();
  const { actAttachments, isLoadingActAttachments } = useActAttachments(act_id);
  const { actObservations, isLoadingActObservations } =
    useActObservations(act_id);
  const { actAudience, isLoadingActAudience } = useActAudience(act_id);
  const [showModalRegisterAudience, setShowModalRegisterAudience] = useState<{
    open: boolean;
    idAto: string;
  }>({
    open: false,
    idAto: "0",
  });
  const [showModalRemoveAudience, setShowModalRemoveAudience] = useState<{
    open: boolean;
    idAto: string;
    idAudiencia: number;
  }>({
    open: false,
    idAto: "0",
    idAudiencia: 0,
  });


  return (
    <>
      <PageTitle
        pageTitle="VISUALIZAR CADASTRO DE ATO"
        pageIcon={<S.PageIcon />}
      />

      {!isLoadingAct && act?.status === "NotFound" ? (
        <S.Section>
          <S.NotFound>Nenhum ato encontrado</S.NotFound>
        </S.Section>
      ) : (
        <>
          {showModalRegisterAudience.open && (
            <ModalRegisterAudience
              showModalRegisterAudience={showModalRegisterAudience}
              setShowModalRegisterAudience={setShowModalRegisterAudience}
            />
          )}

          {showModalRemoveAudience.open && (
            <ModalRemoveAudience
              showModalRemoveAudience={showModalRemoveAudience}
              setShowModalRemoveAudience={setShowModalRemoveAudience}
            />
          )}
          <S.Section>
            <S.TitleSectionContainer>
              <S.TitleSection>
                Informações Cadastrais do Processo
              </S.TitleSection>
            </S.TitleSectionContainer>
            <S.ContentSection>
              <S.ContainerField>
                <S.FieldTitle>Sistema Processual</S.FieldTitle>
                {!isLoadingAct && !isLoadingProcessSecretaries ? (
                  <S.TextInput
                    type="text"
                    placeholder="Número do processo"
                    disabled={true}
                    defaultValue={
                      processSecretaries?.data.find(
                        (ps) =>
                          ps.id === act?.data.idSistemaProcessual &&
                          ps.txSistemaProcessual
                      )?.txSistemaProcessual
                    }
                  />
                ) : (
                  <S.LoadingSpinner />
                )}
              </S.ContainerField>

              <S.ContainerField>
                <S.FieldTitle>Número do Processo</S.FieldTitle>
                {!isLoadingAct ? (
                  <S.TextInput
                    type="text"
                    placeholder="Número do processo"
                    disabled={true}
                    defaultValue={act.data.txNumeroFormatado}
                  />
                ) : (
                  <S.LoadingSpinner />
                )}
              </S.ContainerField>

              <S.ContainerField>
                <S.FieldTitle>Código de Aviso</S.FieldTitle>
                {!isLoadingAct ? (
                  <S.TextInput
                    type="text"
                    placeholder="Número do processo"
                    disabled={true}
                    defaultValue={act.data.nuCodigoAviso}
                  />
                ) : (
                  <S.LoadingSpinner />
                )}
              </S.ContainerField>
            </S.ContentSection>

            <S.ContentSection>
              <S.ContainerField>
                <S.FieldTitle>Classe Processual</S.FieldTitle>
                {!isLoadingAct ? (
                  <ProcessClass class_id={act?.data.idClasse} />
                ) : (
                  <S.LoadingSpinner />
                )}
              </S.ContainerField>

              <S.ContainerField>
                <S.FieldTitle>Secretaria</S.FieldTitle>
                {!isLoadingAct && !loadingSecretariesist ? (
                  <S.TextInput
                    type="text"
                    placeholder="Secretaria"
                    disabled={true}
                    defaultValue={
                      secretariesList?.find(
                        (s) => s.value === act?.data.idSecretaria && s.label
                      )?.label
                    }
                  />
                ) : (
                  <S.LoadingSpinner />
                )}
              </S.ContainerField>
            </S.ContentSection>

            <S.ContentSection>
              <S.ContainerField>
                <S.FieldTitle>Tribunal</S.FieldTitle>
                {!isLoadingAct ? (
                  <S.TextInput
                    type="text"
                    placeholder="Nome do autor, reclamente ou exequente"
                    disabled={true}
                    defaultValue={act?.data.txOrgaojulgador}
                  />
                ) : (
                  <S.LoadingSpinner />
                )}
              </S.ContainerField>

              <S.ContainerField>
                <S.FieldTitle>Instância</S.FieldTitle>
                {!isLoadingAct ? (
                  <S.TextInput
                    type="text"
                    placeholder="Número do processo"
                    disabled={true}
                    defaultValue={act?.data.nuInstancia + "ª Instância"}
                  />
                ) : (
                  <S.LoadingSpinner />
                )}
              </S.ContainerField>

              <S.ContainerField>
                <S.FieldTitle>Órgão Julgador</S.FieldTitle>
                {!isLoadingAct ? (
                  <S.TextInput
                    type="text"
                    placeholder="Nome do autor, reclamente ou exequente"
                    disabled={true}
                    defaultValue={act?.data.txTribunal}
                  />
                ) : (
                  <S.LoadingSpinner />
                )}
              </S.ContainerField>
            </S.ContentSection>

            <S.ContentSection>
              <S.ContainerField>
                <S.FieldTitle>Data da Ciência</S.FieldTitle>
                {!isLoadingAct ? (
                  <S.TextInput
                    type="text"
                    placeholder="Nome do autor, reclamente ou exequente"
                    disabled={true}
                    defaultValue={formatToBrazilianDate(act?.data.dtCiencia)}
                  />
                ) : (
                  <S.LoadingSpinner />
                )}
              </S.ContainerField>

              <S.ContainerField>
                <S.FieldTitle>Data de Prazo</S.FieldTitle>
                {!isLoadingAct ? (
                  <S.TextInput
                    required={true}
                    type="text"
                    placeholder="Data de prazo"
                    disabled={true}
                    defaultValue={
                      act?.data.dtPrazo
                        ? formatToBrazilianDate(act?.data.dtPrazo)
                        : "Data não registrada"
                    }
                  />
                ) : (
                  <S.LoadingSpinner />
                )}
              </S.ContainerField>

              <S.ContainerField>
                <S.FieldTitle>Urgente</S.FieldTitle>
                {!isLoadingAct ? (
                  <S.TextInputUrgency
                    isUrgent={act?.data.isUrgente}
                    type="text"
                    placeholder="Nome do autor, reclamente ou exequente"
                    disabled={true}
                    defaultValue={act?.data.isUrgente ? "SIM" : "NÃO"}
                  />
                ) : (
                  <S.LoadingSpinner />
                )}
              </S.ContainerField>
            </S.ContentSection>
          </S.Section>

          <S.Section>
            <S.TitleSectionContainer>
              <S.TitleSection>Audiências registradas</S.TitleSection>

              {!isLoadingActAudience ? (
                !(actAudience?.status === "OK") ? (
                  <S.AddAudienceButton
                    onClick={() =>
                      setShowModalRegisterAudience({
                        open: true,
                        idAto: act_id,
                      })
                    }
                  >
                    <S.IconAddAudience weight="bold" />
                  </S.AddAudienceButton>
                ) : (
                  ""
                )
              ) : (
                <S.LoadingSpinner />
              )}
            </S.TitleSectionContainer>

            {!isLoadingActAudience ? (
              actAudience.status === "OK" ? (
                <S.ContainerAudience>
                  <S.AudienceTitle>Audiência Marcada: </S.AudienceTitle>Para o
                  dia
                  <S.AudienceDate>
                    {actAudience.data.dtAudiencia} -{" "}
                    {actAudience.data.hrAudiencia}
                  </S.AudienceDate>
                  <S.ContainerRemoveAudience
                    onClick={() =>
                      setShowModalRemoveAudience({
                        open: true,
                        idAto: act_id,
                        idAudiencia: actAudience.data.id,
                      })
                    }
                  >
                    <S.RemoveAudienceIcon />
                  </S.ContainerRemoveAudience>
                </S.ContainerAudience>
              ) : (
                ""
              )
            ) : (
              <S.LoadingSpinner />
            )}
          </S.Section>

          <S.Section>
            <S.TitleSectionContainer>
              <S.TitleSection>Anexos do ato</S.TitleSection>
            </S.TitleSectionContainer>

            {!isLoadingActAttachments ? (
              <S.ContainerTable>
                <S.Table>
                  <S.Thead>
                    <S.RowTable>
                      <S.Th>Descrição</S.Th>
                      <S.Th>Data</S.Th>
                      <S.ButtonTh>Visualizar</S.ButtonTh>
                    </S.RowTable>
                  </S.Thead>
                  <S.TBody>
                    {actAttachments?.data?.length > 0 ? (
                      actAttachments.data.map((aa) => (
                        <S.RowTableObservation key={aa.id}>
                          <td style={{ fontWeight: "bold" }}>
                            {aa.txDescricao}
                          </td>
                          <td>
                            {formatToBrazilianDate(aa.dtCadastro) +
                              " " +
                              aa.hrCadastro}
                          </td>

                          <S.ButtonTD>
                            <S.DownloadAttachmentButtonTable
                              onClick={() =>
                                openOctetStreamInNewTab(aa.file_stream, aa.name)
                              }
                            >
                              <S.DownloadAttachmentIcon />
                            </S.DownloadAttachmentButtonTable>
                          </S.ButtonTD>
                        </S.RowTableObservation>
                      ))
                    ) : (
                      <S.RowMessage colSpan={3}>
                        Nenhum arquivo anexado
                      </S.RowMessage>
                    )}
                  </S.TBody>
                </S.Table>
              </S.ContainerTable>
            ) : (
              <S.LoadingSpinner />
            )}
          </S.Section>

          <S.Section>
            <S.TitleSectionContainer>
              <S.TitleSection>Observações do ato</S.TitleSection>
            </S.TitleSectionContainer>

            {!isLoadingActObservations ? (
              <S.ContainerTable>
                <S.Table>
                  <S.Thead>
                    <S.RowTable>
                      <S.Th>Usuário</S.Th>
                      <S.Th>Data</S.Th>
                      <S.Th>Observação</S.Th>
                    </S.RowTable>
                  </S.Thead>
                  <S.TBody>
                    {actObservations?.data?.length > 0 ? (
                      actObservations.data.map((ao) => (
                        <S.RowTableObservation key={ao.id}>
                          <td style={{ fontWeight: "bold" }}>
                            {ao.txNomeUsuario}
                          </td>
                          <td>{ao.dtCadastro + " " + ao.hrCadastro}</td>
                          <td>{ao.txObservacao}</td>
                        </S.RowTableObservation>
                      ))
                    ) : (
                      <S.RowMessage colSpan={3}>
                        Nenhuma observação encontrada
                      </S.RowMessage>
                    )}
                  </S.TBody>
                </S.Table>
              </S.ContainerTable>
            ) : (
              <S.LoadingSpinner />
            )}
          </S.Section>
        </>
      )}
    </>
  );
};

export default ActDetailsView;
