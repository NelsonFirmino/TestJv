import { ChangeEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
  postProceduralRecordDCJEData,
  putProceduralRecordDCJEData,
} from "../../../../api/services/dcje/actsDCJE/actsDCJE";
import { PageTitle } from "../../../../components/TitlePage";
import { SharedState } from "../../../../context/SharedContext";
import { useActDCJEAttachments } from "../../../../hooks/useActDCJEAttachments";
import { useAttorneys } from "../../../../hooks/useAttorneys";
import { useDCJE } from "../../../../hooks/useDCJE";
import { useReasonsRequests } from "../../../../hooks/useReasonsRequests";
import { convertToDecimal } from "../../../../utils/convertToDecimal.util";
import { getBase64 } from "../../../../utils/getBase64.util";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import { ModalConfirmRemoveAttachment } from "./components/ModalConfirmRemoveAttachment";
import { ModalSucess } from "./components/ModalSucess";
import { StageWarningInfo } from "./components/StageWarningInfo";
import { SubmitUpdateDataProcess } from "./interfaces/procedural-record.interface";
import * as S from "./styled";

const ProceduralRedistributionRecord = () => {
  const { user } = SharedState();
  const defaultDate = new Date().toISOString().substring(0, 10);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [valor, setValor] = useState();
  const [honorario, setHonorario] = useState();
  const [honorarioFixados, setHonorarioFixados] = useState();
  const { id } = useParams();
  const { isLoadingFichaDCJE, fichaDCJE } = useDCJE(+id);
  const [
    showModalConfirmRemoveAttachment,
    setShowModalConfirmRemoveAttachment,
  ] = useState<{
    open?: boolean;
    actAttachmentId: number;
  }>({
    open: false,
    actAttachmentId: 0,
  });
  const queryClient = useQueryClient();

  const { attorneysList, loadingAttorneysList } = useAttorneys();
  const { reasonsRequestsList, loadingReasonsRequestsList } =
    useReasonsRequests();
  const proceduralRecordId = fichaDCJE?.data?.id || null;
  const { actDCJEAttachments, isLoadingActDCJEAttachments } =
    useActDCJEAttachments(proceduralRecordId, {
      enabled: proceduralRecordId !== null,
    });

  const putProceduralRecord = useMutation(putProceduralRecordDCJEData, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(`ficha-dcje-${id}`);
      queryClient.invalidateQueries(`actDCJEAttachments-${proceduralRecordId}`);
      toast("Operação efetuada com sucesso.", {
        icon: "✔",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      });
    },
    onError: (error) => {
      toast.error("Error ao concluir atualização.", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#e57373",
          color: "#fff",
          fontSize: "30px",
        },
      });
    },
  });

  const postProceduralRecord = useMutation(postProceduralRecordDCJEData, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(`ficha-dcje-${id}`);
      queryClient.invalidateQueries(`actDCJEAttachments-${proceduralRecordId}`);
      toast("Operação efetuada com sucesso.", {
        icon: "✔",
        style: {
          borderRadius: "10px",
          background: "#81c784",
          color: "#fff",
          fontSize: "30px",
        },
      });
    },
    onError: (error) => {
      toast.error("Error ao concluir operação.", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#e57373",
          color: "#fff",
          fontSize: "30px",
        },
      });
    },
  });

  const {
    watch: watchProceduralRecordDCJE,
    register: registerProceduralRecordDCJE,
    handleSubmit: submitProceduralRecordDCJE,
    formState: { errors },
    setValue: setProceduralRecordDCJEValue,
    control: controlProceduralRecordDCJE,
  } = useForm<SubmitUpdateDataProcess>({
    mode: "onChange",
  });

  useEffect(() => {
    const attorney = attorneysList?.find(
      (at) => at.value == fichaDCJE?.data?.idProcurador
    );

    const reason = reasonsRequestsList?.find(
      (r) => r.value == fichaDCJE?.data?.idRazaoPedido
    );

    const dtAtualizacaoValor = fichaDCJE?.data?.dtAtualizacaoValor;

    const txFaseProcessual = [
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
    ].find((f) => f.value === fichaDCJE?.data?.txFaseProcessual);

    const txBaseIncidencia = [
      { label: "Nenhuma", value: "" },
      { label: "Sobre condenação", value: "CON" },
      { label: "Sobre valor da causa", value: "VCU" },
      { label: "Sobre valor fixado", value: "VFI" },
    ].find((b) => b.value === fichaDCJE?.data?.txBaseIncidencia);

    const dtFixacao = fichaDCJE?.data?.dtFixacao;

    const txIndiceCorrecao = [
      { label: "Nenhum", value: null },
      { label: "IPCA (Justiça Federal)", value: "IPCA" },
      { label: "TR (Poupança)", value: "TR" },
      { label: "IPCA + TR", value: "IPCA+TR" },
      { label: "TR + IPCA", value: "TR+IPCA" },
      { label: "SELIC", value: "SELIC" },
      { label: "Outro", value: "OUTRO" },
    ].find((b) => b.value === fichaDCJE?.data?.txIndiceCorrecao);

    const txIndiceJuros = [
      { label: "Nenhum", value: "" },
      { label: "6% a.a.", value: "6% a.a." },
      { label: "12% a.a.", value: "12% a.a." },
      { label: "SELIC (Exclusivamente)", value: "SELIC" },
      { label: "Poupança", value: "POUPANCA" },
      { label: "Outro", value: "Outro" },
    ].find((b) => b.value === fichaDCJE?.data?.txIndiceJuros);

    const txNumeroFormatado = fichaDCJE?.data?.txNumeroFormatado;

    // TODO: ver se precisa disso
    const txNumeroMandadoSeguranca = "";

    const txTermoJurosMora = [
      { label: "Nenhum", value: null },
      { label: "Citação Inicial", value: "CIN" },
      { label: "Vencimento da Parcela", value: "VPA" },
      { label: "Ajuizamento da Ação", value: "AAC" },
      { label: "Trânsito em Julgado", value: "TJU" },
      { label: "Evento Danoso", value: "EDA" },
      { label: "Outro", value: "OUT" },
    ].find((b) => b.value === fichaDCJE?.data?.txTermoJurosMora);

    if (attorney) {
      setProceduralRecordDCJEValue("idProcurador", attorney);
    }

    if (reason) {
      setProceduralRecordDCJEValue("idRazaoPedido", reason);
    }

    if (txFaseProcessual) {
      setProceduralRecordDCJEValue("txFaseProcessual", txFaseProcessual);
    }

    if (txBaseIncidencia || txIndiceCorrecao === undefined) {
      setProceduralRecordDCJEValue(
        "txBaseIncidencia",
        txBaseIncidencia || { label: "Nenhuma", value: null }
      );
    }

    if (dtFixacao) {
      setProceduralRecordDCJEValue("dtFixacao", dtFixacao);
    }

    if (txIndiceCorrecao || txIndiceCorrecao === undefined) {
      setProceduralRecordDCJEValue(
        "txIndiceCorrecao",
        txIndiceCorrecao === undefined
          ? { label: "Nenhum", value: null }
          : txIndiceCorrecao
      );
    }

    if (txIndiceJuros || txIndiceJuros === undefined) {
      setProceduralRecordDCJEValue(
        "txIndiceJuros",
        txIndiceJuros || { label: "Nenhum", value: null }
      );
    }

    if (txNumeroFormatado) {
      setProceduralRecordDCJEValue("txNumeroFormatado", txNumeroFormatado);
    }

    if (txNumeroMandadoSeguranca) {
      setProceduralRecordDCJEValue(
        "txNumeroMandadoSeguranca",
        txNumeroMandadoSeguranca
      );
    }

    if (txTermoJurosMora || txTermoJurosMora === undefined) {
      setProceduralRecordDCJEValue(
        "txTermoJurosMora",
        txTermoJurosMora || { label: "Nenhum", value: null }
      );
    }

    if (dtAtualizacaoValor) {
      setProceduralRecordDCJEValue("dtAtualizacaoValor", dtAtualizacaoValor);
    }
  }, [attorneysList, reasonsRequestsList, fichaDCJE?.data]);

  const onSubmit: SubmitHandler<SubmitUpdateDataProcess> = async (data) => {
    let lsArquivos = {};
    if (data.lsArquivos) {
      for (let file of data.lsArquivos) {
        const file_stream = await getBase64(file);
        lsArquivos[file.name] = file_stream;
      }
    }

    if (proceduralRecordId) {
      putProceduralRecord.mutate({
        id: fichaDCJE.data.id,
        idAto: fichaDCJE.data.idAto,
        idProcesso: fichaDCJE.data.idProcesso,
        txNumeroMandadoSeguranca: data?.txNumeroMandadoSeguranca || "",
        txNumeroFormatado: data.txNumeroFormatado,
        txAutor: data.txAutor,
        txReu: data.txReu,
        nuAutores: data.nuAutores || fichaDCJE.data.nuAutores,
        vaTotal: convertToDecimal(data.vaTotal.toString()),
        dtAtualizacaoValor: data.dtAtualizacaoValor,
        idProcurador: data.idProcurador.value.toString(),
        dtPrazoProcurador: data.dtPrazoProcurador,
        txFaseProcessual: data.txFaseProcessual.value,
        dtPrazoDCJE: data.dtPrazoDCJE,
        idRazaoPedido: data.idRazaoPedido.value,
        dtAjuizamento: data.dtAjuizamento,
        dtCitacao: data.dtCitacao,
        dtTransitoJulgado: data.dtTransitoJulgado,
        dtAposentadoria: data.dtAposentadoria,
        txMatricula: data.txMatricula,
        nuHonorariosPercentual:
          convertToDecimal(data.nuHonorariosPercentual.toString()) / 100,
        vaHonorariosFixos: convertToDecimal(data.vaHonorariosFixos.toString()),
        txBaseIncidencia: data.txBaseIncidencia.value,
        dtFixacao: data.dtFixacao || "",
        txIndiceJuros: data.txIndiceJuros?.value,
        txTermoJurosMora: data.txTermoJurosMora?.value,
        txIndiceCorrecao: data.txIndiceCorrecao?.value,
        txObservacaoJurosMora: data.txObservacaoJurosMora,
        txObservacaoCorrecao: data.txObservacaoCorrecao,
        txObservacoesGerais: data.txObservacoesGerais,
        txOrientacaoCalculo: data.txOrientacaoCalculo,
        lsArquivos,
        idUsuarioCadastro: user["Jvris.User.Id"],
      });

      return;
    }

    postProceduralRecord.mutate({
      idAto: fichaDCJE.data.idAto,
      idProcesso: fichaDCJE.data.idProcesso,
      txNumeroMandadoSeguranca: data?.txNumeroMandadoSeguranca || "",
      txNumeroFormatado: data.txNumeroFormatado,
      txAutor: data.txAutor,
      txReu: data.txReu,
      nuAutores: data.nuAutores || fichaDCJE.data.nuAutores,
      vaTotal: convertToDecimal(data.vaTotal.toString()),
      dtAtualizacaoValor: data.dtAtualizacaoValor,
      idProcurador: data.idProcurador.value.toString(),
      dtPrazoProcurador: data.dtPrazoProcurador,
      txFaseProcessual: data.txFaseProcessual.value,
      dtPrazoDCJE: data.dtPrazoDCJE,
      idRazaoPedido: data.idRazaoPedido.value,
      dtAjuizamento: data.dtAjuizamento,
      dtCitacao: data.dtCitacao,
      dtTransitoJulgado: data.dtTransitoJulgado,
      dtAposentadoria: data.dtAposentadoria,
      txMatricula: data.txMatricula,
      nuHonorariosPercentual:
        convertToDecimal(data.nuHonorariosPercentual.toString()) / 100,
      vaHonorariosFixos: convertToDecimal(data.vaHonorariosFixos.toString()),
      txBaseIncidencia: data.txBaseIncidencia.value,
      dtFixacao: data.dtFixacao || "",
      txIndiceJuros: data.txIndiceJuros?.value,
      txTermoJurosMora: data.txTermoJurosMora?.value,
      txIndiceCorrecao: data.txIndiceCorrecao?.value,
      txObservacaoJurosMora: data.txObservacaoJurosMora,
      txObservacaoCorrecao: data.txObservacaoCorrecao,
      txObservacoesGerais: data.txObservacoesGerais,
      txOrientacaoCalculo: data.txOrientacaoCalculo,
      lsArquivos,
      idUsuarioCadastro: user["Jvris.User.Id"],
    });
  };

  const handleChange = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setValor(valorNumerico);
    setProceduralRecordDCJEValue("vaTotal", Number(valorNumerico) / 100);
  };

  const handleChangeHonorarios = (e: any) => {
    let valorNumerico = e.target.value.replace(/\D/g, "");
    // Convertendo o valor para número e dividindo por 100
    let valorPercentual = Number(valorNumerico) / 100;
    // Verificando se o valor excede 100.00
    if (valorPercentual > 100.0) {
      valorNumerico = "10000";
      valorPercentual = 100.0;
    }
    setHonorario(valorNumerico);
    setProceduralRecordDCJEValue("nuHonorariosPercentual", valorPercentual);
  };

  const handleChangeHonorariosFixados = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setHonorarioFixados(valorNumerico);
    setProceduralRecordDCJEValue(
      "vaHonorariosFixos",
      Number(valorNumerico) / 100
    );
  };

  const formatarNumero = (numero: any) => {
    return (Number(numero) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (files: FileList) => void
  ) => {
    if (
      e.target.files &&
      e.target.files.length > 0 &&
      e.target.files[0].size <= 15 * 1024 * 1024
    ) {
      onChange(e.target.files);
      setProceduralRecordDCJEValue("lsArquivos", e.target.files);
      return;
    } else if (e.target.files && e.target.files.length > 0) {
      alert(
        "O arquivo é muito grande! Por favor, selecione um arquivo de até 15MB."
      );
      e.target.value = "";
      setProceduralRecordDCJEValue("lsArquivos", null);
      return;
    } else {
      setProceduralRecordDCJEValue("lsArquivos", null);
      return;
    }
  };

  if (!isLoadingFichaDCJE && fichaDCJE?.status !== "OK") {
    return (
      <>
        <PageTitle
          pageTitle="FICHA DE ENCAMINHAMENTO PROCESSUAL A DCJE/PGE DE REDISTRIBUIÇÂO"
          pageIcon={<S.PageIcon weight="bold" />}
          button={
            <S.RedirectPage to="/dashboard/contadoria/dcje-distribuicoes-pendentes">
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
      {showModalConfirmRemoveAttachment.open && (
        <ModalConfirmRemoveAttachment
          setShowModalConfirmRemoveAttachment={
            setShowModalConfirmRemoveAttachment
          }
          showModalConfirmRemoveAttachment={showModalConfirmRemoveAttachment}
          proceduralRecordId={fichaDCJE.data.idAto}
        />
      )}

      {showModalSuccess && (
        <ModalSucess
          message="Operação efetuada com sucesso."
          title="Ficha DCJE"
          setShowModalSuccess={setShowModalSuccess}
        />
      )}
      <PageTitle
        pageTitle="FICHA DE ENCAMINHAMENTO PROCESSUAL A DCJE/PGE DE REDISTRIBUIÇÂO"
        pageIcon={<S.PageIcon weight="bold" />}
        button={
          <S.RedirectPage to="/dashboard/contadoria/dcje-distribuicoes-pendentes">
            <S.RedirectPageIcon />
          </S.RedirectPage>
        }
      />
      <S.FormContainer onSubmit={submitProceduralRecordDCJE(onSubmit)}>
        <S.Section>
          <S.StateProcessMessage>
            <StageWarningInfo
              proceduralRecordDCJEDataByActId={fichaDCJE}
              isLoadingProceduralRecordDCJEDataByActId={isLoadingFichaDCJE}
            />
          </S.StateProcessMessage>
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
                  {...registerProceduralRecordDCJE("txNumeroFormatado")}
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
                <S.TextInput
                  type="text"
                  placeholder="Número do processo"
                  {...registerProceduralRecordDCJE("txNumeroMandadoSeguranca")}
                />
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
                  required={true}
                  placeholder="Nome do autor, reclamente ou exequente"
                  defaultValue={fichaDCJE?.data?.txAutor}
                  {...registerProceduralRecordDCJE("txAutor")}
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
                  required={true}
                  placeholder="Nome do autor, reclamente ou exequente"
                  defaultValue={fichaDCJE?.data?.txReu}
                  {...registerProceduralRecordDCJE("txReu")}
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
                  required={true}
                  type="text"
                  placeholder="Nome do autor, reclamente ou exequente"
                  {...registerProceduralRecordDCJE("nuAutores")}
                  defaultValue={fichaDCJE?.data?.nuAutores}
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
                  placeholder="Número do processo"
                  required={true}
                  value={formatarNumero(
                    valor || fichaDCJE?.data?.vaTotal * 100
                  )}
                  {...registerProceduralRecordDCJE("vaTotal")}
                  onChange={handleChange}
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
                <S.DateContent error={errors.dtAtualizacaoValor?.message}>
                  <S.DateInput
                    type="date"
                    required={true}
                    max={defaultDate}
                    {...registerProceduralRecordDCJE("dtAtualizacaoValor", {
                      required: "Data de fim de período é obrigatória.",
                    })}
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
                <Controller
                  name="idProcurador"
                  control={controlProceduralRecordDCJE}
                  render={({ field }) => (
                    <S.CustomSelect
                      required={true}
                      {...field}
                      placeholder="Selecione o(a) procurador(a)"
                      options={attorneysList}
                      isClearable={false}
                    />
                  )}
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
                <S.DateContent error={errors.dtPrazoProcurador?.message}>
                  <S.DateInput
                    type="date"
                    required={true}
                    max={defaultDate}
                    defaultValue={fichaDCJE?.data?.dtPrazoProcurador}
                    {...registerProceduralRecordDCJE("dtPrazoProcurador")}
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
                Calculista Responsável - DCJE: *
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>Marcar conforme o processo.</S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <Controller
                  name="txFaseProcessual"
                  control={controlProceduralRecordDCJE}
                  render={({ field }) => (
                    <S.CustomSelect
                      required={true}
                      placeholder="Digite mais de 5 caracteres"
                      {...field}
                      options={[
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
                      ]}
                      isClearable={false}
                    />
                  )}
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
                <S.DateContent error={errors.dtPrazoDCJE?.message}>
                  <S.DateInput
                    required={true}
                    type="date"
                    defaultValue={fichaDCJE?.data?.dtPrazoDCJE}
                    {...registerProceduralRecordDCJE("dtPrazoDCJE", {
                      required: "Data de fim de período é obrigatória.",
                    })}
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
                <Controller
                  name="idRazaoPedido"
                  control={controlProceduralRecordDCJE}
                  render={({ field }) => (
                    <S.CustomSelect
                      required={true}
                      {...field}
                      options={reasonsRequestsList}
                      placeholder="Selecione o assunto"
                      isClearable={false}
                    />
                  )}
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
                <S.DateContent error={errors.dtAjuizamento?.message}>
                  <S.DateInput
                    required={true}
                    type="date"
                    defaultValue={fichaDCJE?.data?.dtAjuizamento}
                    {...registerProceduralRecordDCJE("dtAjuizamento")}
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
                <S.DateContent error={errors.dtCitacao?.message}>
                  <S.DateInput
                    required={true}
                    type="date"
                    defaultValue={fichaDCJE?.data?.dtCitacao}
                    {...registerProceduralRecordDCJE("dtCitacao")}
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
                <S.DateContent error={errors.dtTransitoJulgado?.message}>
                  <S.DateInput
                    type="date"
                    defaultValue={fichaDCJE?.data?.dtTransitoJulgado}
                    {...registerProceduralRecordDCJE("dtTransitoJulgado")}
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
                <S.DateContent error={errors.dtAposentadoria?.message}>
                  <S.DateInput
                    type="date"
                    defaultValue={fichaDCJE?.data?.dtAposentadoria || ""}
                    {...registerProceduralRecordDCJE("dtAposentadoria")}
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
                <Controller
                  name="txIndiceJuros"
                  control={controlProceduralRecordDCJE}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Digite mais de 5 caracteres"
                      {...field}
                      options={[
                        { label: "Nenhum", value: null },
                        { label: "6% a.a.", value: "6% a.a." },
                        { label: "12% a.a.", value: "12% a.a." },
                        { label: "SELIC (Exclusivamente)", value: "SELIC" },
                        { label: "Poupança", value: "POUPANCA" },
                        { label: "Outro", value: "Outro" },
                      ]}
                      isClearable={false}
                    />
                  )}
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
                <Controller
                  name="txTermoJurosMora"
                  control={controlProceduralRecordDCJE}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Digite mais de 5 caracteres"
                      {...field}
                      options={[
                        { label: "Nenhum", value: null },
                        { label: "Citação Inicial", value: "CIN" },
                        { label: "Vencimento da Parcela", value: "VPA" },
                        { label: "Ajuizamento da Ação", value: "AAC" },
                        { label: "Trânsito em Julgado", value: "TJU" },
                        { label: "Evento Danoso", value: "EDA" },
                        { label: "Outro", value: "OUT" },
                      ]}
                      isClearable={false}
                    />
                  )}
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
                <Controller
                  name="txIndiceCorrecao"
                  control={controlProceduralRecordDCJE}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Digite mais de 5 caracteres"
                      {...field}
                      options={[
                        { label: "Nenhum", value: null },
                        { label: "IPCA (Justiça Federal)", value: "IPCA" },
                        { label: "TR (Poupança)", value: "TR" },
                        { label: "IPCA + TR", value: "IPCA+TR" },
                        { label: "TR + IPCA", value: "TR+IPCA" },
                        { label: "SELIC", value: "SELIC" },
                        { label: "Outro", value: "OUTRO" },
                      ]}
                      isClearable={false}
                    />
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
                  type="text"
                  placeholder="Matrícula/Vínculo"
                  defaultValue={fichaDCJE?.data?.txMatricula}
                  {...registerProceduralRecordDCJE("txMatricula")}
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
                  type="text"
                  maxLength={6}
                  value={formatarNumero(
                    honorario ||
                      fichaDCJE?.data?.nuHonorariosPercentual * 10000 ||
                      null
                  )}
                  {...registerProceduralRecordDCJE("nuHonorariosPercentual")}
                  onChange={handleChangeHonorarios}
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
                  type="text"
                  maxLength={15}
                  value={formatarNumero(
                    honorarioFixados ||
                      fichaDCJE?.data?.vaHonorariosFixos * 100 ||
                      null
                  )}
                  {...registerProceduralRecordDCJE("vaHonorariosFixos")}
                  onChange={handleChangeHonorariosFixados}
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
                <Controller
                  name="txBaseIncidencia"
                  control={controlProceduralRecordDCJE}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Digite mais de 5 caracteres"
                      {...field}
                      options={[
                        { label: "Nenhuma", value: null },
                        { label: "Sobre condenação", value: "CON" },
                        { label: "Sobre valor da causa", value: "VCU" },
                        { label: "Sobre valor fixado", value: "VFI" },
                      ]}
                      isClearable={false}
                    />
                  )}
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
                <S.DateContent error={errors.dtFixacao?.message}>
                  <S.DateInput
                    type="date"
                    max={defaultDate}
                    disabled={true}
                    {...registerProceduralRecordDCJE("dtFixacao")}
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
                  type="text"
                  maxLength={100}
                  defaultValue={fichaDCJE?.data?.txObservacaoJurosMora}
                  {...registerProceduralRecordDCJE("txObservacaoJurosMora")}
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
                  type="text"
                  maxLength={100}
                  defaultValue={fichaDCJE?.data?.txObservacaoCorrecao}
                  {...registerProceduralRecordDCJE("txObservacaoCorrecao")}
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
                <S.LettersCounter>
                  {
                    (watchProceduralRecordDCJE("txOrientacaoCalculo") || "")
                      .length
                  }{" "}
                  / 10000
                </S.LettersCounter>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextAreaInput
                  required={true}
                  minLength={2}
                  maxLength={10000}
                  defaultValue={fichaDCJE?.data?.txOrientacaoCalculo || ""}
                  placeholder="Digite aqui uma descrição do cálculo de no máximo 10000 caracteres."
                  {...registerProceduralRecordDCJE("txOrientacaoCalculo", {
                    maxLength: 10000,
                    minLength: 2,
                  })}
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
                <S.LettersCounter>
                  {
                    (watchProceduralRecordDCJE("txObservacoesGerais") || "")
                      .length
                  }{" "}
                  / 2000
                </S.LettersCounter>
              </S.FieldTitle>
              {!isLoadingFichaDCJE ? (
                <S.TextAreaInput
                  minLength={2}
                  maxLength={2000}
                  defaultValue={fichaDCJE?.data?.txObservacoesGerais || ""}
                  placeholder="Digite aqui uma observação de no máximo 2000 caracteres."
                  {...registerProceduralRecordDCJE("txObservacoesGerais", {
                    maxLength: 2000,
                    minLength: 2,
                  })}
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
            <S.ContainerField>
              <S.WarningFileMessage>
                * Arquivo baixado diretamente do PJe pode causar problema:
                <S.LinkOpenFile
                  href="/AnexarArquivoDoPJE_v1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  clique aqui para solução
                </S.LinkOpenFile>
              </S.WarningFileMessage>
              <S.WarningTiteFileMessage>
                Recomenda-se anexar os seguintes documentos essenciais:
              </S.WarningTiteFileMessage>
              <S.WarningFileMessage>
                - Cálculo de Cumprimento de Sentença;
              </S.WarningFileMessage>
              <S.WarningFileMessage>
                - Petição de Cumprimento de Sentença;
              </S.WarningFileMessage>
              <S.WarningFileMessage>
                - Sentença e/ou Acórdão;
              </S.WarningFileMessage>
              <S.WarningFileMessage>
                - Planlhas, Laudos e outros documentos orientadores para os
                cálculos
              </S.WarningFileMessage>
              {!isLoadingFichaDCJE && (
                <Controller
                  name="lsArquivos"
                  control={controlProceduralRecordDCJE}
                  defaultValue={null}
                  render={({ field: { onChange, value, ...field } }) => (
                    <S.FileInput
                      required={!Boolean(fichaDCJE?.data?.id)}
                      {...field}
                      type="file"
                      accept=".pdf, .xlsx, .xls"
                      onChange={(e) => handleFileChange(e, onChange)}
                    />
                  )}
                />
              )}
              <S.WarningFileSize>
                Escolha um arquivo de até 15MB
              </S.WarningFileSize>
            </S.ContainerField>
          </S.ContentSection>

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
                            <S.RemoveButtonTable
                              onClick={() =>
                                setShowModalConfirmRemoveAttachment({
                                  open: true,
                                  actAttachmentId: at.id,
                                })
                              }
                            >
                              <S.RemoveIcon alt="Remover anexo" />
                            </S.RemoveButtonTable>
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
        <S.SaveButtonContainer>
          <S.SaveButton
            type="submit"
            disabled={
              !isLoadingFichaDCJE &&
              fichaDCJE?.status === "OK" &&
              (fichaDCJE?.data?.idDistribuicao !== 0 ||
                fichaDCJE?.data?.isEncerrado ||
                fichaDCJE?.data?.isDevolvido)
            }
          >
            {fichaDCJE?.data?.id ? "Editar" : "Salvar"}
          </S.SaveButton>
          {(putProceduralRecord.isLoading ||
            postProceduralRecord.isLoading) && <S.LoadingSpinnerSave />}
        </S.SaveButtonContainer>
      </S.FormContainer>
    </>
  );
};

export default ProceduralRedistributionRecord;
