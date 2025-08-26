import { useParams } from "react-router-dom";
import { PageTitle } from "../../../../components/TitlePage";
import { useAttorneys } from "../../../../hooks/useAttorneys";
import { useReasonsRequests } from "../../../../hooks/useReasonsRequests";
import { useActDCJEAttachments } from "../../../../hooks/useActDCJEAttachments";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import { useDCJE } from "../../../../hooks/useDCJE";
import * as S from "./styled";

const ProceduralClosedRecord = () => {
  const { id } = useParams();
  const { attorneysList, loadingAttorneysList } = useAttorneys();
  const { isLoadingFichaDCJE, fichaDCJE } = useDCJE(+id);
  const { reasonsRequestsList, loadingReasonsRequestsList } =
    useReasonsRequests();
  const { actDCJEAttachments, isLoadingActDCJEAttachments } =
    useActDCJEAttachments(+id, {
      enabled: id !== null,
    });
  const formatarNumero = (numero: any) => {
    return (Number(numero) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  if (!isLoadingFichaDCJE && fichaDCJE?.status !== "OK") {
    return (
      <>
        <PageTitle
          pageTitle="FICHA DE ENCAMINHAMENTO PROCESSUAL A DCJE/PGE"
          pageIcon={<S.PageIcon weight="bold" />}
          button={
            <S.RedirectPage to="/dashboard/contadoria/dcje-fichas-encerradas">
              <S.RedirectPageIcon />
            </S.RedirectPage>
          }
        />
        <S.InvalidParam>{fichaDCJE?.message}</S.InvalidParam>
      </>
    );
  }

  return (
    <>
      <PageTitle
        pageTitle="VISUALIZAÇÃO DE FICHA ENCERRADA DE ENCAMINHAMENTO PROCESSUAL A DCJE/PGE"
        pageIcon={<S.PageIcon weight="bold" />}
        button={
          <S.RedirectPage to="/dashboard/contadoria/dcje-fichas-encerradas">
            <S.RedirectPageIcon />
          </S.RedirectPage>
        }
      />
      <S.FormContainer>
        <S.Section>
          <S.TitleSectionContainer>
            <S.TitleSection>Informações Cadastrais do Processo</S.TitleSection>
          </S.TitleSectionContainer>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>
                Número do Processo: *
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Número do processo que está sendo objeto de análise.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  type="text"
                  placeholder="Número do processo"
                  disabled={true}
                  defaultValue={fichaDCJE.data.txNumeroFormatado}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>
                Tribunal:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Número da vara ou juizado do processo que está sendo objeto
                    de análise.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.Text>{fichaDCJE?.data?.txOrgao}</S.Text>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>Órgão Julgador:</S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.Text>{fichaDCJE?.data?.txVara}</S.Text>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>
                MS Conhecimento/Execução:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Número do MS que está sendo objeto de análise.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput disabled={true} type="text" />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>
                Autor/Reclamante/Exequente: *
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Nome da(s) parte(s) autora(s) do processo.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  type="text"
                  disabled={true}
                  placeholder="Nome do autor, reclamente ou exequente"
                  defaultValue={fichaDCJE.data.txAutor}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>
                Réus/Reclamados/Executados: *
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Nome da(s) parte(s) contrária (as) do processo.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  type="text"
                  disabled={true}
                  defaultValue={fichaDCJE.data.txReu}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Número de Autores/Substituídos: *</S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  disabled={true}
                  type="text"
                  defaultValue={fichaDCJE.data.nuAutores}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>
                Valor Total Pleiteado/Executado R$: *
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Valor total que está sendo cobrado do processo.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  type="text"
                  disabled={true}
                  value={formatarNumero(fichaDCJE.data.vaTotal * 100)}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>
                Atualizados Até: *
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Data da atualização do valor que está sendo cobrado.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.DateContent error={null}>
                  <S.DateInput
                    disabled={true}
                    type="date"
                    defaultValue={fichaDCJE.data.dtAtualizacaoValor}
                  />
                </S.DateContent>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>
        </S.Section>

        <S.Section>
          <S.TitleSectionContainer>
            <S.TitleSection>Informações De Distribuição</S.TitleSection>
          </S.TitleSectionContainer>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>
                Procurador (a) Responsável: Dr. (a) *
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Preencher com o nome do procurador responsável pela defesa
                    do processo.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE && !loadingAttorneysList ? (
                <S.TextInput
                  type="text"
                  disabled={true}
                  value={
                    attorneysList.find(
                      (at) => at.value === fichaDCJE.data.idProcurador
                    ).label
                  }
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>
                Prazo p/ Procurador (a): *
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>Data fatal para a defesa do processo.</S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.DateContent error={null}>
                  <S.DateInput
                    type="date"
                    disabled={true}
                    defaultValue={fichaDCJE.data.dtPrazoProcurador}
                  />
                </S.DateContent>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Fase processual</S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  type="text"
                  disabled={true}
                  value={
                    [
                      { label: "Selecione", value: "0" },
                      { label: "Impugnação", value: "IMP" },
                      {
                        label: "Contadoria Judicial (COJUD) - TJRN",
                        value: "COJ",
                      },
                      {
                        label: "Requisição de Pequeno Valor (RPV)",
                        value: "RPV",
                      },
                      { label: "Precatório", value: "PRE" },
                      { label: "Laudo Pericial", value: "LAU" },
                      { label: "Execução", value: "EXE" },
                    ].find((f) => f.value === fichaDCJE.data.txFaseProcessual)
                      .label
                  }
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>
                Prazo p/ DCJE: *
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Data para que o processo retorne da DCJE.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.DateContent error={null}>
                  <S.DateInput
                    disabled={true}
                    type="date"
                    defaultValue={fichaDCJE.data.dtPrazoDCJE}
                  />
                </S.DateContent>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>
        </S.Section>

        <S.Section>
          <S.TitleSectionContainer>
            <S.TitleSection>Razão do Pedido</S.TitleSection>
          </S.TitleSectionContainer>
          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>Assunto: *</S.FieldTitle>
              {!isLoadingFichaDCJE && !loadingReasonsRequestsList ? (
                <S.TextInput
                  type="text"
                  disabled={true}
                  value={
                    reasonsRequestsList.find(
                      (f) => f.value === fichaDCJE.data.idRazaoPedido
                    ).label
                  }
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
            <S.ContainerField></S.ContainerField>
          </S.ContentSection>
        </S.Section>

        <S.Section>
          <S.TitleSectionContainer>
            <S.TitleSection>Dados Coletados dos Autos</S.TitleSection>
          </S.TitleSectionContainer>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>
                Ajuizamento/Impetração: *
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Data em que o processo inicial/conhecimento teve início.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.DateContent error={null}>
                  <S.DateInput
                    disabled={true}
                    type="date"
                    defaultValue={fichaDCJE.data.dtAjuizamento}
                  />
                </S.DateContent>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>
                Data de Citação/Notificação: *
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Data em que a parte contrária foi citada ou notificada.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.DateContent error={null}>
                  <S.DateInput
                    disabled={true}
                    type="date"
                    defaultValue={fichaDCJE.data.dtCitacao}
                  />
                </S.DateContent>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>
                Data do Trânsito em Julgado:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Data em que a sentença ou acórdão transitou em julgado.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.DateContent error={null}>
                  <S.DateInput
                    disabled={true}
                    type="date"
                    defaultValue={fichaDCJE.data.dtTransitoJulgado}
                  />
                </S.DateContent>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>
                Data da Aponsentadoria:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Data em que o(a) Autor(a) se aposentou.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.DateContent error={null}>
                  <S.DateInput
                    disabled={true}
                    type="date"
                    defaultValue={fichaDCJE?.data?.dtAposentadoria}
                  />
                </S.DateContent>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
            <S.ContainerField></S.ContainerField>
            <S.ContainerField></S.ContainerField>
          </S.ContentSection>
        </S.Section>

        <S.Section>
          <S.TitleSectionContainer>
            <S.TitleSection>Parâmetros para Cálculo da Ação</S.TitleSection>
          </S.TitleSectionContainer>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>
                Juros de Mora:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Tipo dos juros de mora definidos na decisão judicial.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  type="text"
                  disabled={true}
                  value={
                    [
                      { label: "Nenhum", value: null },
                      { label: "6% a.a.", value: "6% a.a." },
                      { label: "12% a.a.", value: "12% a.a." },
                      { label: "SELIC (Exclusivamente)", value: "SELIC" },
                      { label: "Poupança", value: "POUPANCA" },
                      { label: "Outro", value: "Outro" },
                    ].find((f) => f.value === fichaDCJE.data.txIndiceJuros)
                      .label
                  }
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>
                Termo Inicial dos Juros de Mora:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Termo onde inicia a contagem dos juros de mora.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  type="text"
                  disabled={true}
                  value={
                    [
                      { label: "Nenhum", value: null },
                      { label: "Citação Inicial", value: "CIN" },
                      { label: "Vencimento da Parcela", value: "VPA" },
                      { label: "Ajuizamento da Ação", value: "AAC" },
                      { label: "Trânsito em Julgado", value: "TJU" },
                      { label: "Evento Danoso", value: "EDA" },
                      { label: "Outro", value: "OUT" },
                    ].find((f) => f.value === fichaDCJE.data.txTermoJurosMora)
                      .label
                  }
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>
                Correção Monetária:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Tipo da correção monetária definida na decisão judicial.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  type="text"
                  disabled={true}
                  value={
                    fichaDCJE?.data?.txIndiceCorrecao
                      ? [
                          { label: "Nenhum", value: null },
                          { label: "IPCA (Justiça Federal)", value: "IPCA" },
                          { label: "TR (Poupança)", value: "TR" },
                          { label: "IPCA + TR", value: "IPCA+TR" },
                          { label: "TR + IPCA", value: "TR+IPCA" },
                          { label: "SELIC", value: "SELIC" },
                          { label: "Outro", value: "OUTRO" },
                        ].find(
                          (f) => f.value === fichaDCJE.data.txIndiceCorrecao
                        )?.label
                      : "Nenhum"
                  }
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>
                Número da Matrícula/Vínculo:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Número da matrícula e o vinculo do servidor.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  disabled={true}
                  type="text"
                  placeholder="Matrícula/Vínculo"
                  defaultValue={fichaDCJE?.data?.txMatricula}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>
                Honorários de Sucumbência (%):
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Honorários de sucumbências definidos na decisão judicial.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  disabled={true}
                  type="text"
                  value={formatarNumero(
                    fichaDCJE?.data?.nuHonorariosPercentual * 10000 || null
                  )}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
            <S.ContainerField>
              <S.FieldTitle>
                Honorários de Sucumbência Fixados:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Valor dos honorários de sucumbências fixados na decisão
                    judicial
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  disabled={true}
                  type="text"
                  value={formatarNumero(
                    fichaDCJE?.data?.vaHonorariosFixos * 100 || null
                  )}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>
                Base de Incidência:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    A base da incidência dos honorários definidos na decisão
                    judicial.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  disabled={true}
                  type="text"
                  value={
                    fichaDCJE?.data?.txBaseIncidencia
                      ? [
                          { label: "Nenhuma", value: null },
                          { label: "Sobre condenação", value: "CON" },
                          { label: "Sobre valor da causa", value: "VCU" },
                          { label: "Sobre valor fixado", value: "VFI" },
                        ].find(
                          (bi) => bi.value === fichaDCJE?.data?.txBaseIncidencia
                        )?.label
                      : "Nenhuma"
                  }
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>
                Data de Fixação:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Data da decisão judicial que fixou os honorários de
                    sucumbência.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.DateContent error={null}>
                  <S.DateInput
                    type="date"
                    disabled={true}
                    value={fichaDCJE?.data?.dtFixacao}
                  />
                </S.DateContent>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerField>
              <S.FieldTitle>
                Observação Sobre os Juros de Mora:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Outras observações acerca dos juros de mora.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  disabled={true}
                  type="text"
                  value={fichaDCJE?.data?.txObservacaoJurosMora}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>

            <S.ContainerField>
              <S.FieldTitle>
                Observação Sobre Correção Monetária:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Outras observações acerca da correção monetária.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextInput
                  disabled={true}
                  type="text"
                  defaultValue={fichaDCJE?.data?.txObservacaoCorrecao}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>
        </S.Section>

        <S.Section>
          <S.TitleSectionContainer>
            <S.TitleSection>
              Orientação Sobre o Cálculo Conforme Sentença e/ou Acórdão
            </S.TitleSection>
          </S.TitleSectionContainer>

          <S.ContentSection>
            <S.ContainerFieldTextArea>
              <S.FieldTitle>
                Descrição do Cálculo: *{" "}
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>Parâmetros jurídicos sobre o cálculo.</S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextAreaInput
                  disabled={true}
                  defaultValue={fichaDCJE?.data?.txOrientacaoCalculo}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerFieldTextArea>
          </S.ContentSection>

          <S.ContentSection>
            <S.ContainerFieldTextArea>
              <S.FieldTitle>
                Informações Complementares:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>Informações Gerais</S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextAreaInput
                  disabled={true}
                  defaultValue={fichaDCJE?.data?.txObservacoesGerais}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerFieldTextArea>
          </S.ContentSection>
        </S.Section>

        <S.Section>
          <S.TitleSectionContainer>
            <S.TitleSection>Anexar Arquivos (PDF | EXCEL): *</S.TitleSection>
          </S.TitleSectionContainer>

          <S.ContentSection>
            {!isLoadingActDCJEAttachments ? (
              actDCJEAttachments?.status === "OK" ? (
                <S.ContainerTable>
                  <S.Table>
                    <thead>
                      <S.RowTable>
                        <S.Th>Identificados</S.Th>
                        <S.Th>Nome do anexo</S.Th>
                        <S.ButtonTh>Ações</S.ButtonTh>
                      </S.RowTable>
                    </thead>
                    <tbody>
                      {actDCJEAttachments!.data.map((at) => (
                        <S.RowTableObservation key={at.id}>
                          <td>{at.id}</td>
                          <td>{at.name}</td>
                          <S.ButtonTD>
                            <S.SeeButtonTable
                              onClick={() => openPDFInNewTab(at.file_stream)}
                            >
                              <S.SeeIcon alt="Ver anexo" />
                            </S.SeeButtonTable>
                          </S.ButtonTD>
                        </S.RowTableObservation>
                      ))}
                    </tbody>
                  </S.Table>
                </S.ContainerTable>
              ) : (
                <S.ContainerTable>
                  <S.WarningNotFound>
                    Nenhum anexo encontrado.
                  </S.WarningNotFound>
                </S.ContainerTable>
              )
            ) : (
              <S.LoadingSpinner />
            )}
          </S.ContentSection>
        </S.Section>
      </S.FormContainer>
    </>
  );
};

export default ProceduralClosedRecord;
