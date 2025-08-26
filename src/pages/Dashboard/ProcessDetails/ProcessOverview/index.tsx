import { ArrowsLeftRight, Copy, Paperclip, Printer } from "phosphor-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { autocompleteSpecials } from "../../../../api/services/autocompleteSpecials/autocompleteSpecials";
import { postProcessAttachment } from "../../../../api/services/processAttachments/processAttachments";
import { getProcess } from "../../../../api/services/processGeneral/process";
import { getProcessOverview } from "../../../../api/services/processOverview/processOverview";
import RelevaneImage from "../../../../assets/carimbo-relevante.png";
import { CustomTable } from "../../../../components/CustomTable";
import { HotToastSucess } from "../../../../components/HotToastFuncs";
import { PageTitle } from "../../../../components/TitlePage";
import { SharedState } from "../../../../context/SharedContext";
import { PROFILES } from "../../../../enums/PROFILES.enum";
import { useActsAndProcedure } from "../../../../hooks/useActsAndProcedure";
import { usePreviousProcedure } from "../../../../hooks/usePreviousProcedure";
import { useProcessAttachments } from "../../../../hooks/useProcessAttachments";
import { useProcessAttachmentsDCJE } from "../../../../hooks/useProcessAttachmentsDCJE";
import { useProcessData } from "../../../../hooks/useProcessData";
import { useProcessLinks } from "../../../../hooks/useProcessLinks";
import { useProcessObservations } from "../../../../hooks/useProcessObservations";
import { useProcessParts } from "../../../../hooks/useProcessParts";
import { useProcessoAnexoPJe } from "../../../../hooks/useProcessoAnexoPje";
import { useProcessoPecas } from "../../../../hooks/useProcessoPecas";
import { formatDateToCustomTable } from "../../../../utils/formatDateToCustomTable.util";
import { getBase64 } from "../../../../utils/getBase64.util";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import { ModalAddObservation } from "./ModalAddObservarion";
import { ModalRemoveObservation } from "./ModalRemoveObservation";
import { RowTablePreviousProcedure } from "./RowTablePreviousProcedure";
import { TagValue } from "./TagValue";
import { ActionColumnAttachments } from "./components/ActionColumnAttachments";
import { ActionsColumn } from "./components/ActionsColumn";
import { DownloadAnexoDCJE } from "./components/DownloadAnexoDCJE";
import { DownloadAnexoPJe } from "./components/DownloadAnexoPJe";
import { DownloadPeca } from "./components/DownloadPeca";
import { Relevant } from "./components/RelevantColumn";
import { SubmitConCalc } from "./interfaces/processoverview.interface";
import * as S from "./styled";

const ProcessOverview = () => {
  const { user } = SharedState();
  const navigate = useNavigate();
  const handleRoute = (route: string) => navigate(route);
  const { control, getValues } = useForm<SubmitConCalc>({
    mode: "onChange",
  });
  const queryClient = useQueryClient();
  const { process_id } = useParams();

  // ---------------------Hooks---------------------
  const { processData, isLoadingProcessData } = useProcessData(process_id);
  const { previousProcedure, isLoadingPreviousProcedure } =
    usePreviousProcedure(process_id);
  const { actAndProcedure, isLoadingctAndProcedure } =
    useActsAndProcedure(process_id);
  const { processParts, isLoadingProcessParts } = useProcessParts(process_id);
  const { processoPecas, isLoadingProcessoPecas } =
    useProcessoPecas(process_id);
  const { processAttachments, isLoadingProcessAttachments } =
    useProcessAttachments(process_id);
  const { processObservations, isLoadingProcessObservationss } =
    useProcessObservations(process_id);
  const { processLinks, isLoadingProcessLinkss } = useProcessLinks(process_id);
  const { processoAnexoPJe, isLoadingProcessoAnexoPJe } =
    useProcessoAnexoPJe(process_id);
  const { processAttachmentsDCJE, isLoadingProcessAttachmentsDCJE } =
    useProcessAttachmentsDCJE(process_id);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Verificar se existe processo correspondente de 1º ou 2º grau

  const [processoCorrespondente, setProcessoCorrespondente] = useState(false);
  const [grauProcessoCorrespondente, setGrauProcessoCorrespondente] =
    useState("");

  const {
    mutate: mutateProcess,
    data: responseProcess,
    isLoading: isLoadingProcess,
  } = useMutation(getProcess);

  useEffect(() => {
    if (processData) {
      mutateProcess({ consultData: processData.data.txNumero, resource: 0 });
    }
  }, [navigate, processData]);

  useEffect(() => {
    if (responseProcess && processData) {
      if (responseProcess.totalItens > 1) {
        setProcessoCorrespondente(true);
        if (processData.data.nuInstancia === 1) {
          setGrauProcessoCorrespondente("2");
        } else {
          setGrauProcessoCorrespondente("1");
        }
      }
    }
  }, [responseProcess]);

  console.log("data", processData);
  console.log("response", responseProcess);

  // ---------------------Handlers---------------------
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      e.target.files[0].size <= 15 * 1024 * 1024
    ) {
      setSelectedFile(e.target.files[0]);
      return;
    } else if (e.target.files && e.target.files.length > 0) {
      alert(
        "O arquivo é muito grande! Por favor, selecione um arquivo de até 15MB."
      );
      e.target.value = "";
      setSelectedFile(null);
      return;
    } else {
      setSelectedFile(null);
      return;
    }
  };

  const loadOptions = (inputValue: string, callback: any) => {
    if (!inputValue || inputValue.length < 5) {
      callback(null);
    } else {
      autocompleteSpecials({ txNumero: inputValue }).then((response) => {
        const autocompleteList = response?.data
          ? response.data.map((atc) => ({
              label: atc.txNumeroFormatado,
              value: atc.id,
            }))
          : [];
        callback(autocompleteList);
      });
    }
  };

  const [showModalAddObservation, setShowModalAddObservation] = useState(false);
  const [showModalRemoveObservation, setShowModalRemoveObservation] =
    useState(false);

  const showProcessOverview = useMutation(getProcessOverview, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        openPDFInNewTab(data.data.file_stream);
      }
    },
  });

  const postNewProcessAttachment = useMutation(postProcessAttachment, {
    onSuccess: (data) => {
      if (data?.status === "Created") {
        queryClient.invalidateQueries(`processAttachments-${process_id}`);
      }
    },
  });

  const handleNewAttachment = async () => {
    if (selectedFile) {
      const file_stream = await getBase64(selectedFile);
      const name = selectedFile.name;
      postNewProcessAttachment.mutate({
        file_stream: file_stream.toString(),
        name,
        processId: process_id,
        idUsuarioCadastro: user["Jvris.User.Id"],
      });
      setSelectedFile(null);
    }
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  if (!isLoadingProcessData && processData.status !== "OK") {
    return (
      <>
        <PageTitle pageTitle="Espelho do processo" pageIcon={<S.PageIcon />} />
        <S.InvalidParam>Processo não encontrado.</S.InvalidParam>
      </>
    );
  }

  return (
    <>
      <ModalAddObservation
        setShowModalAddObservation={setShowModalAddObservation}
        showModalAddObservation={showModalAddObservation}
        txFormatedProcessNumber={processData?.data.txNumeroFormatado}
        processId={process_id}
      />
      <PageTitle pageTitle="Espelho do processo" pageIcon={<S.PageIcon />} />
      <S.FormContainer>
        {!isLoadingProcessData && processData.data?.relevancias?.length > 0 && (
          <S.RelevanceContainer>
            <S.WarningRelevance>ATENÇÃO!</S.WarningRelevance>
            Processo com relevância(s):
            <S.Relevance>
              {processData.data?.relevancias[0].txRelevancia}
            </S.Relevance>
            <S.RelevanceImg src={RelevaneImage} />
          </S.RelevanceContainer>
        )}
        <S.SectionResumeProcess>
          <S.SectionSearch>
            <S.FieldContainer>
              <Controller
                name="processNumber"
                control={control}
                render={({ field }) => (
                  <S.CustomAutocomplete
                    placeholder="Digite no mínimo 5 digitos iniciais do processo"
                    cacheOptions={true}
                    loadOptions={loadOptions}
                    defaultOptions
                    noOptionsMessage={() => "Número de processo não encontrado"}
                    {...field}
                    isDisabled={false}
                    isSearchable={true}
                    isClearable={true}
                  />
                )}
              />
            </S.FieldContainer>
            <S.SectionSearchButton
              onClick={() => {
                const newProcessNumber: string =
                  getValues("processNumber")["value"];

                handleRoute(
                  `/dashboard/detalhes-processo/espelho-processos/${newProcessNumber}`
                );
              }}
            >
              Pesquisar
            </S.SectionSearchButton>
          </S.SectionSearch>

          <S.SectionButtons>
            <S.ContainerButton>
              <S.PrintButton
                onClick={() => showProcessOverview.mutate(process_id)}
              >
                <Printer
                  style={{ fontSize: "1.3rem", marginRight: "0.4rem" }}
                />{" "}
                Impressão
              </S.PrintButton>
              {showProcessOverview.isLoading && "Gerando impressão. Aguarde..."}
              {showProcessOverview.data?.message}
            </S.ContainerButton>
            <S.GenericTopButton href="#anexos">
              <Paperclip
                style={{ fontSize: "1.3rem", marginRight: "0.4rem" }}
              />{" "}
              Anexos
            </S.GenericTopButton>
            <S.GenericTopButton href="#tramitacoes">
              <ArrowsLeftRight
                style={{ fontSize: "1.3rem", marginRight: "0.4rem" }}
              />{" "}
              Tramitações Anteriores
            </S.GenericTopButton>
          </S.SectionButtons>
        </S.SectionResumeProcess>

        <S.Section>
          <S.TitleSectionDataContainer>
            <S.SectionDataIcon weight="regular" />
            <S.TitleSection>Dados do Processo</S.TitleSection>
            {!isLoadingProcessData && processData.data?.nuInstancia && (
              <S.GrauProcess>
                {processData.data?.nuInstancia} º grau
              </S.GrauProcess>
            )}
            {!isLoadingProcessData && (
              <TagValue processValue={processData?.data?.vaProcesso} />
            )}
          </S.TitleSectionDataContainer>
          {!isLoadingProcessData ? (
            <>
              <S.ContentSection>
                <S.ContainerField>
                  <S.FieldTitle>Processo</S.FieldTitle>
                  <S.NumProcessContainer>
                    <S.Text>{processData.data?.txNumeroFormatado}</S.Text>
                    <Copy
                      size={16}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          processData.data?.txNumeroFormatado.toString()
                        );
                        HotToastSucess(
                          `${processData.data?.txNumeroFormatado} copiado!`
                        );
                      }}
                      alt="Copiar"
                      style={{
                        cursor: "pointer",
                        marginLeft: "5px",
                      }}
                      weight="fill"
                    />
                    {+user["jvris.User.Perfil"] === PROFILES.OPERADOR && (
                      <S.LinkProcess
                        to={`/dashboard/processo/${processData.data.id}`}
                      >
                        <S.IconLinkProcess weight="bold" />
                      </S.LinkProcess>
                    )}
                    {+user["jvris.User.Perfil"] === PROFILES.OPERADOR && (
                      <S.LinkRegisterAct
                        to={`/dashboard/processo/registro-ato`}
                      >
                        <S.IconLinkAct weight="bold" />
                      </S.LinkRegisterAct>
                    )}
                  </S.NumProcessContainer>
                </S.ContainerField>
                <S.ContainerField>
                  <S.FieldTitle>Assunto</S.FieldTitle>
                  <S.Text>{processData.data.txAssunto}</S.Text>
                </S.ContainerField>
                <S.ContainerField>
                  <S.FieldTitle>Sistema Processual</S.FieldTitle>
                  <S.Text>{processData.data.txSistemaProcessual}</S.Text>
                </S.ContainerField>
                <S.ContainerField>
                  <S.FieldTitle>Vara / Juizado</S.FieldTitle>
                  <S.Text>
                    {processData.data?.txOrgaoJulgador
                      ? processData.data.txOrgaoJulgador
                      : "--"}
                  </S.Text>
                </S.ContainerField>
                <S.ContainerField>
                  <S.FieldTitle>Valor da Causa</S.FieldTitle>
                  <S.Text>{formatNumber(processData.data.vaProcesso)}</S.Text>
                </S.ContainerField>
              </S.ContentSection>
              <S.ContentSection>
                <S.ContainerField>
                  <S.FieldTitle>Tipo Processo</S.FieldTitle>
                  <S.Text>
                    {processData.data.txTipo === "J" && "Judicial"}
                    {processData.data.txTipo === "A" && "Administrativo"}
                  </S.Text>
                </S.ContainerField>
                <S.ContainerField>
                  <S.FieldTitle>Físico</S.FieldTitle>
                  <S.Text>{processData.data.isFisico ? "Sim" : "Não"}</S.Text>
                </S.ContainerField>
                <S.ContainerField>
                  <S.FieldTitle>Relevância</S.FieldTitle>
                  <S.TextRelevancia relevancia={processData.data.txRelevancia}>
                    {processData.data.txRelevancia}
                  </S.TextRelevancia>
                </S.ContainerField>
                <S.ContainerField>
                  <S.FieldTitle>Data de Cadastro</S.FieldTitle>
                  <S.Text>
                    {formatDateToCustomTable(processData.data.dtCadastro)}
                  </S.Text>
                </S.ContainerField>
                <S.ContainerField>
                  <S.FieldTitle>Tribunal</S.FieldTitle>
                  <S.Text>
                    {processData.data.txTribunal
                      ? processData.data.txTribunal
                      : "--"}
                  </S.Text>
                </S.ContainerField>
              </S.ContentSection>
            </>
          ) : (
            <S.LoadingSpinner />
          )}
        </S.Section>

        {/* Processo correspondente em outra instância */}
        {isLoadingProcessData ? (
          <S.ProcessoCorrespondenteContainerField>
            <S.LoadingSpinner />
          </S.ProcessoCorrespondenteContainerField>
        ) : (
          <>
            {processoCorrespondente && (
              <S.ProcessoCorrespondenteContainerField
                onClick={() => {
                  window.open(
                    `/dashboard/detalhes-processo/espelho-processos/${
                      grauProcessoCorrespondente == "1"
                        ? responseProcess?.data?.[0].id
                        : responseProcess?.data?.[1].id
                    }`,
                    "_blank"
                  );
                }}
              >
                <S.FieldTitle style={{ color: "#fff" }}>
                  Processo Correspondente de {grauProcessoCorrespondente}° grau
                </S.FieldTitle>
                <S.NumProcessContainer>
                  <S.Text style={{ color: "#fff" }}>
                    {processData.data?.txNumeroFormatado}
                  </S.Text>
                </S.NumProcessContainer>
              </S.ProcessoCorrespondenteContainerField>
            )}
          </>
        )}

        <S.Section>
          <S.TitleSectionContainer>
            <S.SectionPartsIcon weight="regular" />
            <S.TitleSection>Partes</S.TitleSection>
          </S.TitleSectionContainer>

          <S.ContainerTable>
            <S.ContainerContentTable>
              {!isLoadingProcessParts ? (
                <S.Table>
                  <S.Thead>
                    <S.RowTable>
                      <S.Th>Polo Ativo</S.Th>
                    </S.RowTable>
                  </S.Thead>
                  <S.TBody>
                    {processParts?.data?.length > 0 &&
                      processParts?.data
                        ?.filter((pt) => pt.txPolo === "A")
                        ?.map((pt) => (
                          <S.RowTableObservation key={pt.id}>
                            <S.Td>
                              {pt.parte.txParte}
                              <S.LinkPart
                                to={`/dashboard/detalhes-processo/extrato-de-processos-por-parte/${encodeURIComponent(
                                  pt.parte.txCpfCnpj
                                )}`}
                              >
                                {pt.parte.txCpfCnpj}
                                <S.IconLink weight="bold" />
                              </S.LinkPart>
                            </S.Td>
                          </S.RowTableObservation>
                        ))}
                  </S.TBody>
                </S.Table>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerContentTable>

            <S.ContainerContentTable>
              {!isLoadingProcessParts ? (
                <S.Table>
                  <S.Thead>
                    <S.RowTable>
                      <S.Th>Polo Passivo</S.Th>
                    </S.RowTable>
                  </S.Thead>
                  <S.TBody>
                    {processParts?.data?.length > 0 &&
                      processParts?.data
                        ?.filter((pt) => pt.txPolo === "P")
                        ?.map((pt) => (
                          <S.RowTableObservation key={pt.id}>
                            <S.Td>
                              {pt.parte.txParte}
                              <S.LinkPart
                                to={`/dashboard/detalhes-processo/extrato-de-processos-por-parte/${encodeURIComponent(
                                  pt.parte.txCpfCnpj
                                )}`}
                              >
                                {pt.parte.txCpfCnpj}
                                <S.IconLink weight="bold" />
                              </S.LinkPart>
                            </S.Td>
                          </S.RowTableObservation>
                        ))}
                  </S.TBody>
                </S.Table>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerContentTable>
          </S.ContainerTable>
        </S.Section>

        <S.Section>
          <S.TitleSectionContainer>
            <S.SectionProcessActsIcon weight="regular" />
            <S.TitleSection>Atos e Tramitações</S.TitleSection>
          </S.TitleSectionContainer>

          <CustomTable
            columns={[
              {
                name: "Aviso",
                keyData: "nuCodigoAviso",
                isSortable: false,
              },
              {
                name: "Órgão Julgador",
                keyData: "txOrgaoJulgador",
                isSortable: false,
              },
              {
                name: "Relevância",
                keyData: "isUrgente",
                isSortable: false,
                component: {
                  element: (data) => <Relevant dataTable={data} />,
                  isButton: false,
                },
              },
              {
                name: "Secretaria",
                keyData: "txSecretaria",
                isSortable: false,
              },
              {
                name: "Especializada",
                keyData: "txEspecializada",
                isSortable: false,
              },
              {
                name: "Ciência",
                keyData: "dtCiencia",
                isSortable: true,
                formatToDate: true,
              },
              {
                name: "Prazo",
                keyData: "dtPrazo",
                isSortable: true,
                formatToDate: true,
              },
              {
                name: "Distribuição",
                keyData: "dtDistribuicao",
                isSortable: true,
                formatToDate: true,
              },
              {
                name: "Procurador",
                keyData: "txProcurador",
                isSortable: true,
              },
              {
                name: "Ações",
                keyData: "deisnd",
                isSortable: false,
                component: {
                  element: (data) => (
                    <ActionsColumn
                      dataTable={data}
                      processIdKeyCacheRevalidate={process_id}
                    />
                  ),
                  isButton: false,
                },
              },
            ]}
            data={actAndProcedure?.data ? actAndProcedure.data : []}
            isLoading={isLoadingctAndProcedure}
            showPagination={true}
            possibleDataKeyToBeNull={[
              {
                key: "nuCodigoAviso",
                fallback: "--",
              },
              {
                key: "dtPrazo",
                fallback: "--",
              },
              {
                key: "txOrgaoJulgador",
                fallback: "--",
              },
            ]}
            defaultSortKeyColumn={{
              key: "dtCiencia",
              direction: "descending",
            }}
            showSearchField={false}
            showSelectNumberOfRows={false}
          />
        </S.Section>

        <S.Section>
          <S.TitleSectionContainer>
            <S.SectionObservationsIcon weight="regular" />
            <S.TitleSection>Observações</S.TitleSection>
            <S.AddObservationButton
              onClick={() => setShowModalAddObservation(true)}
            >
              <S.IconAddObservation weight="bold" />
            </S.AddObservationButton>
          </S.TitleSectionContainer>

          <CustomTable
            columns={[
              {
                name: "Operador",
                keyData: "txUsuario",
                isSortable: true,
              },
              {
                name: "Data do Cadastro",
                keyData: "dtCadastro",
                isSortable: true,
                formatToDate: true,
              },
              {
                name: "Observação",
                keyData: "txObservacao",
                isSortable: false,
              },
              {
                name: "Ações",
                keyData: "fesfawe1",
                isSortable: false,
                switchContentToRight: true,
                component: {
                  element: (data) => (
                    <ModalRemoveObservation
                      dataTable={data}
                      processId={process_id}
                      setShowModalRemoveObservation={
                        setShowModalRemoveObservation
                      }
                      showModalRemoveObservation={showModalRemoveObservation}
                    />
                  ),
                  isButton: true,
                },
              },
            ]}
            data={processObservations?.data ? processObservations.data : []}
            isLoading={isLoadingProcessObservationss}
            showPagination={true}
            showSelectNumberOfRows={false}
            selectRows={false}
            showSearchField={false}
            defaultSortKeyColumn={{
              key: "dtCadastro",
              direction: "descending",
            }}
          />
        </S.Section>

        <S.Section>
          <S.TitleSectionContainer>
            <S.SectionProcessLinksIcon weight="regular" />
            <S.TitleSection>Vinculações</S.TitleSection>
          </S.TitleSectionContainer>

          <CustomTable
            data={processLinks?.data ? processLinks.data : []}
            columns={[
              {
                name: "Nº Processo",
                keyData: "txNumeroFormatado",
                isSortable: false,
              },
              {
                name: "Assunto(s)",
                keyData: "txAssunto",
                isSortable: false,
              },
              {
                name: "Valor (R$)",
                keyData: "vaProcesso",
                isSortable: true,
                formatToCurrency: true,
              },
            ]}
            defaultSortKeyColumn={{
              key: "vaProcesso",
              direction: "descending",
            }}
            isLoading={isLoadingProcessLinkss}
            showPagination={true}
            showSearchField={false}
            showSelectNumberOfRows={false}
          />
        </S.Section>

        <S.Section id="anexos">
          <S.TitleSectionContainer>
            <S.SectionProcessAttachmentsIcon weight="regular" />
            <S.TitleSection>Anexos</S.TitleSection>
          </S.TitleSectionContainer>

          <S.AttachmentsContent>
            <S.AttachmentsContentTitle>
              Anexar novo arquivo geral:
            </S.AttachmentsContentTitle>
            <S.AttachmentsImport>
              <S.AttachmentsInput
                id="file-input"
                type="file"
                accept=".pdf, .xlsx, .xls"
                onChange={(e) => {
                  handleFileChange(e);
                }}
              />
              <S.SectionSearchButton onClick={() => handleNewAttachment()}>
                Adicionar
              </S.SectionSearchButton>

              {postNewProcessAttachment.isLoading && <S.LoadingSpinnerPost />}
            </S.AttachmentsImport>
          </S.AttachmentsContent>

          <S.TableTitle>Anexos Gerais</S.TableTitle>
          <CustomTable
            data={processAttachments?.data ? processAttachments?.data : []}
            columns={[
              {
                name: "Descrição",
                keyData: "txDescricao",
                isSortable: false,
              },
              {
                name: "Data",
                keyData: "dtCadastro",
                isSortable: true,
                formatToDate: true,
              },
              {
                name: "Ações",
                keyData: "deisndles",
                isSortable: false,
                switchContentToRight: true,
                component: {
                  element: (data) => (
                    <ActionColumnAttachments
                      dataTable={data}
                      processIdKeyCacheRevalidate={process_id}
                    />
                  ),
                  isButton: true,
                },
              },
            ]}
            defaultSortKeyColumn={{
              key: "dtCadastro",
              direction: "descending",
            }}
            isLoading={isLoadingProcessAttachments}
            showPagination={true}
            showSearchField={false}
            showSelectNumberOfRows={false}
          />

          <S.TableTitle>Peças</S.TableTitle>
          <CustomTable
            data={processoPecas?.data ? processoPecas?.data : []}
            columns={[
              {
                name: "Descrição",
                keyData: "txDescricao",
                isSortable: false,
              },
              {
                name: "Data",
                keyData: "dtCadastro",
                isSortable: true,
                formatToDate: true,
              },
              {
                name: "Ações",
                keyData: "deisndles",
                isSortable: false,
                switchContentToRight: true,
                component: {
                  element: (data) => <DownloadPeca dataTable={data} />,
                  isButton: true,
                },
              },
            ]}
            defaultSortKeyColumn={{
              key: "dtCadastro",
              direction: "descending",
            }}
            isLoading={isLoadingProcessoPecas}
            showPagination={true}
            showSearchField={false}
            showSelectNumberOfRows={false}
          />

          <S.TableTitle>Anexos PJE</S.TableTitle>
          <CustomTable
            data={processoAnexoPJe?.data ? processoAnexoPJe.data : []}
            columns={[
              {
                name: "Descrição",
                keyData: "txDocumento",
                isSortable: false,
              },
              {
                name: "Código do documento PJE",
                keyData: "nuCodigoDocumento",
                isSortable: false,
              },
              {
                name: "Data",
                keyData: "dtDocumento",
                isSortable: true,
                formatToDate: true,
              },
              {
                name: "Ações",
                keyData: "deisndles",
                isSortable: false,
                switchContentToRight: true,
                component: {
                  element: (data) => <DownloadAnexoPJe dataTable={data} />,
                  isButton: true,
                },
              },
            ]}
            defaultSortKeyColumn={{
              key: "dtDocumento",
              direction: "descending",
            }}
            isLoading={isLoadingProcessoAnexoPJe}
            showPagination={true}
            showSearchField={false}
            showSelectNumberOfRows={false}
          />

          <S.TableTitle>Anexos DCJE</S.TableTitle>
          <CustomTable
            data={
              processAttachmentsDCJE?.data ? processAttachmentsDCJE.data : []
            }
            columns={[
              {
                name: "Nº Solicitação",
                keyData: "id",
                isSortable: false,
              },
              {
                name: "Descrição",
                keyData: "txCalculo",
                isSortable: false,
              },
              {
                name: "Tipo",
                keyData: "txTipo",
                isSortable: false,
              },
              {
                name: "Data",
                keyData: "dtCadastro",
                isSortable: true,
                formatToDate: true,
              },
              {
                name: "Ações",
                keyData: "deisndles",
                switchContentToRight: true,
                isSortable: false,
                component: {
                  element: (data) => <DownloadAnexoDCJE dataTable={data} />,
                  isButton: true,
                },
              },
            ]}
            isLoading={isLoadingProcessAttachmentsDCJE}
            showPagination={true}
            showSearchField={false}
            showSelectNumberOfRows={false}
            defaultSortKeyColumn={{
              key: "dtCadastro",
              direction: "descending",
            }}
          />
        </S.Section>

        <S.Section id="tramitacoes">
          <S.TitleSectionContainer>
            <S.SectionProcessLinksBeforeIcon weight="regular" />
            <S.TitleSection>Tramitações anteriores</S.TitleSection>
          </S.TitleSectionContainer>

          <S.ContainerTable>
            <S.ContainerContentTable>
              <S.Table>
                <S.Thead>
                  <S.RowTable>
                    <S.Th>Data</S.Th>
                    <S.Th>Tipo</S.Th>
                    <S.Th>Descrição</S.Th>
                    <S.ButtonTh>Info</S.ButtonTh>
                  </S.RowTable>
                </S.Thead>
                <S.TBody>
                  {!isLoadingPreviousProcedure ? (
                    previousProcedure?.data?.length > 0 &&
                    previousProcedure?.data?.map((pp) => (
                      <RowTablePreviousProcedure
                        dtDataHora={pp.dtDataHora}
                        txDescricao={pp.txDescricao}
                        txTipo={pp.txTipo}
                        txObservacao={pp.txObservacao}
                        key={pp.id}
                      />
                    ))
                  ) : (
                    <S.LoadingSpinner />
                  )}
                </S.TBody>
              </S.Table>
            </S.ContainerContentTable>
          </S.ContainerTable>
        </S.Section>
      </S.FormContainer>
    </>
  );
};

export default ProcessOverview;
