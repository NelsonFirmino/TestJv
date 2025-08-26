import { Plus } from "phosphor-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../../api/axiosInstance";
import {
  postProceduralRecordDCJEDataMultiJ,
  putProceduralRecordDCJEDataMultiJ,
} from "../../../../api/services/dcje/actsDCJE/actsDCJE";
import { LsFichasProcessuaisParametrosCalculo } from "../../../../api/services/dcje/actsDCJE/actsDCJE.interface";
import { PageTitle } from "../../../../components/TitlePage";
import { SharedState } from "../../../../context/SharedContext";
import { useAct } from "../../../../hooks/useAct";
import { useActDCJEAttachments } from "../../../../hooks/useActDCJEAttachments";
import { useAttorneys } from "../../../../hooks/useAttorneys";
import { useProceduralRecordDCJEDataByActId } from "../../../../hooks/useProceduralRecordDCJEDataByIActd";
import { useProceduralRecordDCJEDataById } from "../../../../hooks/useProceduralRecordDCJEDataById";
import { useReasonsRequests } from "../../../../hooks/useReasonsRequests";
import { convertToDecimal } from "../../../../utils/convertToDecimal.util";
import { getBase64 } from "../../../../utils/getBase64.util";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import { fichaDCJEI } from "../FichaEncaminhamentoProcessual/interfaces";
import { ModalConfirmRemoveAttachment } from "./components/ModalConfirmRemoveAttachment";
import { ModalSucess } from "./components/ModalSucess";
import { SubmitUpdateDataProcessMulti } from "./interfaces/procedural-record.interface";
import * as S from "./styled";

const ProceduralRecord = () => {
  const { user } = SharedState();
  const defaultDate = new Date().toISOString().substring(0, 10);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [valor, setValor] = useState();
  const [honorario, setHonorario] = useState();
  const [honorarioFixados, setHonorarioFixados] = useState();
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
  const { actId } = useParams();
  const { attorneysList, loadingAttorneysList } = useAttorneys();

  const {
    proceduralRecordDCJEDataById,
    isLoadingProceduralRecordDCJEDataById,
  } = useProceduralRecordDCJEDataById(actId!);

  const {
    proceduralRecordDCJEDataByActId,
    isLoadingProceduralRecordDCJEDataByActId,
  } = useProceduralRecordDCJEDataByActId(actId!);

  const [fichaDCJE, setFichaDCJE] = useState<fichaDCJEI>();

  useEffect(() => {
    async function getFicha(id: number) {
      const ficha = await axiosInstance.get(`/api/v1.0/ficha-dcje/${id}`);
      console.log("ficha", ficha.data);
      setFichaDCJE(ficha.data);
    }
    if (
      proceduralRecordDCJEDataByActId?.data &&
      proceduralRecordDCJEDataById?.data
    ) {
      console.log(
        "proceduralRecordDCJEDataByActId",
        proceduralRecordDCJEDataByActId
      );
      console.log("proceduralRecordDCJEDataById", proceduralRecordDCJEDataById);
      getFicha(proceduralRecordDCJEDataByActId?.data?.id);
    }
  }, [proceduralRecordDCJEDataByActId, proceduralRecordDCJEDataById]);

  const { act, isLoadingAct } = useAct(actId!);
  const { reasonsRequestsList, loadingReasonsRequestsList } =
    useReasonsRequests();
  const proceduralRecordId = proceduralRecordDCJEDataByActId?.data?.id;
  const { actDCJEAttachments, isLoadingActDCJEAttachments } =
    useActDCJEAttachments(proceduralRecordId, {
      enabled: proceduralRecordId !== null,
    });

  const [juros, setJuros] = useState<LsFichasProcessuaisParametrosCalculo[]>(
    []
  );

  const putProceduralRecord = useMutation(putProceduralRecordDCJEDataMultiJ, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(`proceduralRecordDCJEDataByActId-${actId}`);
      queryClient.invalidateQueries(`actDCJEAttachments-${proceduralRecordId}`);
      alert("Operação efetuada com sucesso!");
    },
    onError: (error) => {
      alert("Erro ao concluir atualização.");
    },
  });

  const postProceduralRecord = useMutation(postProceduralRecordDCJEDataMultiJ, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(`proceduralRecordDCJEDataByActId-${actId}`);
      queryClient.invalidateQueries(`actDCJEAttachments-${proceduralRecordId}`);
      alert("Operação efetuada com sucesso!");
    },
    onError: (error) => {
      alert("Erro ao cadastrar ficha DCJE.");
    },
  });

  if (actId.length >= 11) {
    return (
      <>
        <PageTitle
          pageTitle="FICHA DE ENCAMINHAMENTO PROCESSUAL A DCJE/PGE"
          pageIcon={<S.PageIcon weight="bold" />}
        />
        <S.InvalidParam>Parâmetro inválido!</S.InvalidParam>
      </>
    );
  }

  const {
    watch: watchProceduralRecordDCJE,
    register: registerProceduralRecordDCJE,
    handleSubmit: submitProceduralRecordDCJE,
    formState: { errors },
    setValue: setProceduralRecordDCJEValue,
    control: controlProceduralRecordDCJE,
  } = useForm<SubmitUpdateDataProcessMulti>({
    mode: "onChange",
  });

  useEffect(() => {
    const attorney = attorneysList?.find(
      (at) => at.value == fichaDCJE?.idProcurador
    );

    const reason = reasonsRequestsList?.find(
      (r) => r.value == fichaDCJE?.idRazaoPedido
    );

    const dtAtualizacaoValor = fichaDCJE?.dtAtualizacaoValor;

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
    ].find((f) => f.value === fichaDCJE?.txFaseProcessual);

    const txBaseIncidencia = [
      { label: "Nenhuma", value: "" },
      { label: "Sobre condenação", value: "CON" },
      { label: "Sobre valor da causa", value: "VCU" },
      { label: "Sobre valor fixado", value: "VFI" },
    ].find((b) => b.value === fichaDCJE?.txBaseIncidencia);

    /* const dtFixacao = fichaDCJE?.dtFixacao; */

    const txNumeroFormatado = fichaDCJE?.txNumeroFormatado;

    const txNumeroMandadoSeguranca = fichaDCJE?.txNumeroMandadoSeguranca;

    if (attorney) {
      setProceduralRecordDCJEValue("idProcurador", attorney);
    }

    if (reason) {
      setProceduralRecordDCJEValue("idRazaoPedido", reason);
    }

    if (txFaseProcessual) {
      setProceduralRecordDCJEValue("txFaseProcessual", txFaseProcessual);
    }

    /* if (txBaseIncidencia || txIndiceCorrecao === undefined) {
            setProceduralRecordDCJEValue(
                "txBaseIncidencia",
                txBaseIncidencia || { label: "Nenhuma", value: null }
            );
        } */

    /* if (dtFixacao) {
            setProceduralRecordDCJEValue("dtFixacao", dtFixacao);
        } */

    /* if (txIndiceCorrecao || txIndiceCorrecao === undefined) {
            setProceduralRecordDCJEValue(
                "txIndiceCorrecao",
                txIndiceCorrecao === undefined
                    ? { label: "Nenhum", value: null }
                    : txIndiceCorrecao
            );
        } */

    /* if (txIndiceJuros || txIndiceJuros === undefined) {
            setProceduralRecordDCJEValue(
                "txIndiceJuros",
                txIndiceJuros || { label: "Nenhum", value: null }
            );
        } */

    if (txNumeroFormatado) {
      setProceduralRecordDCJEValue("txNumeroFormatado", txNumeroFormatado);
    }

    if (txNumeroMandadoSeguranca) {
      setProceduralRecordDCJEValue(
        "txNumeroMandadoSeguranca",
        txNumeroMandadoSeguranca
      );
    }

    /* if (txTermoJurosMora || txTermoJurosMora === undefined) {
            setProceduralRecordDCJEValue(
                "txTermoJurosMora",
                txTermoJurosMora || { label: "Nenhum", value: null }
            );
        } */

    if (dtAtualizacaoValor) {
      setProceduralRecordDCJEValue("dtAtualizacaoValor", dtAtualizacaoValor);
    }
  }, [attorneysList, reasonsRequestsList, fichaDCJE]);

  const onSubmit: SubmitHandler<SubmitUpdateDataProcessMulti> = async (
    data
  ) => {
    let lsArquivos = {};
    if (data.lsArquivos) {
      for (let file of data.lsArquivos) {
        const file_stream = await getBase64(file);
        lsArquivos[file.name] = file_stream;
      }
    }

    if (proceduralRecordId) {
      putProceduralRecord.mutate({
        id: fichaDCJE?.id,
        idAto: +actId,
        idProcesso: fichaDCJE?.idProcesso,
        txNumeroMandadoSeguranca: data?.txNumeroMandadoSeguranca || "",
        txNumeroFormatado: data.txNumeroFormatado,
        dtAjuizamento: data.dtAjuizamento,
        dtAposentadoria: data.dtAposentadoria,
        dtAtualizacaoValor: data.dtAtualizacaoValor,
        dtCadastro: fichaDCJE?.dtCadastro,
        dtCitacao: data.dtCitacao,
        dtFixacao: data.dtFixacao || "",
        dtPrazoDCJE: data.dtPrazoDCJE,
        dtPrazoProcurador: data.dtPrazoProcurador,
        dtTransitoJulgado: data.dtTransitoJulgado,
        hrCadastro: fichaDCJE?.hrCadastro,
        idDevolucao: fichaDCJE?.idDevolucao,
        idDistribuicao: fichaDCJE?.idDistribuicao,
        idProcurador: data.idProcurador.value,
        idRazaoPedido: data.idRazaoPedido.value,
        idResposta: fichaDCJE?.idResposta,
        idUsuarioCadastro: fichaDCJE?.idUsuarioCadastro,
        isDevolvido: fichaDCJE?.isDevolvido,
        isEncerrado: fichaDCJE?.isEncerrado,
        nuAutores: data.nuAutores,
        nuHonorariosPercentual:
          convertToDecimal(data.nuHonorariosPercentual.toString()) / 100,
        txAutor: data.txAutor,
        txBaseIncidencia: data.txBaseIncidencia.value,
        txContador: fichaDCJE?.idUsuarioCadastro.toString(),
        txDataResposta: "",
        txFaseProcessual: data.txFaseProcessual.value,
        txMatricula: data.txMatricula,
        txObservacoesGerais: data.txObservacoesGerais,
        txOrgao: fichaDCJE?.txOrgao,
        txOrientacaoCalculo: data.txOrientacaoCalculo,
        txReu: data.txReu,
        txTipoProcesso: fichaDCJE?.txTipoProcesso,
        txVara: fichaDCJE?.txVara,
        vaDivergencia: fichaDCJE?.vaDivergencia,
        vaHonorariosFixos: convertToDecimal(data.vaHonorariosFixos.toString()),
        vaTotal: convertToDecimal(data.vaTotal.toString()),
        lsArquivos: lsArquivos,
        lsFichasProcessuaisParametrosCalculo: [
          /* {
                        idFichaProcessual: fichaDCJE?.id,
                        txIndice: data.txIndiceCorrecao?.value,
                        txObservacao: data.txObservacaoCorrecao,
                        txTipo: "CORRECAO"
                    } */
        ],
      });

      return;
    }

    postProceduralRecord.mutate({
      id: fichaDCJE?.id,
      idAto: +actId,
      idProcesso: fichaDCJE?.idProcesso,
      txNumeroMandadoSeguranca: data?.txNumeroMandadoSeguranca || "",
      txNumeroFormatado: data.txNumeroFormatado,
      dtAjuizamento: data.dtAjuizamento,
      dtAposentadoria: data.dtAposentadoria,
      dtAtualizacaoValor: data.dtAtualizacaoValor,
      dtCadastro: fichaDCJE?.dtCadastro,
      dtCitacao: data.dtCitacao,
      dtFixacao: data.dtFixacao || "",
      dtPrazoDCJE: data.dtPrazoDCJE,
      dtPrazoProcurador: data.dtPrazoProcurador,
      dtTransitoJulgado: data.dtTransitoJulgado,
      hrCadastro: fichaDCJE?.hrCadastro,
      idDevolucao: fichaDCJE?.idDevolucao,
      idDistribuicao: fichaDCJE?.idDistribuicao,
      idProcurador: data.idProcurador.value,
      idRazaoPedido: data.idRazaoPedido.value,
      idResposta: fichaDCJE?.idResposta,
      idUsuarioCadastro: fichaDCJE?.idUsuarioCadastro,
      isDevolvido: fichaDCJE?.isDevolvido,
      isEncerrado: fichaDCJE?.isEncerrado,
      nuAutores: data.nuAutores,
      nuHonorariosPercentual:
        convertToDecimal(data.nuHonorariosPercentual.toString()) / 100,
      txAutor: data.txAutor,
      txBaseIncidencia: data.txBaseIncidencia.value,
      txContador: fichaDCJE?.idUsuarioCadastro.toString(),
      txDataResposta: "",
      txFaseProcessual: data.txFaseProcessual.value,
      txMatricula: data.txMatricula,
      txObservacoesGerais: data.txObservacoesGerais,
      txOrgao: fichaDCJE?.txOrgao,
      txOrientacaoCalculo: data.txOrientacaoCalculo,
      txReu: data.txReu,
      txTipoProcesso: fichaDCJE?.txTipoProcesso,
      txVara: fichaDCJE?.txVara,
      vaDivergencia: fichaDCJE?.vaDivergencia,
      vaHonorariosFixos: convertToDecimal(data.vaHonorariosFixos.toString()),
      vaTotal: convertToDecimal(data.vaTotal.toString()),
      lsArquivos: lsArquivos,
      lsFichasProcessuaisParametrosCalculo: [
        /* {
                    idFichaProcessual: fichaDCJE?.id,
                    txIndice: data.txIndiceCorrecao?.value,
                    txObservacao: data.txObservacaoCorrecao,
                    txTipo: "CORRECAO"
                } */
      ],
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

  return (
    <>
      {showModalConfirmRemoveAttachment.open && (
        <ModalConfirmRemoveAttachment
          setShowModalConfirmRemoveAttachment={
            setShowModalConfirmRemoveAttachment
          }
          showModalConfirmRemoveAttachment={showModalConfirmRemoveAttachment}
          proceduralRecordId={fichaDCJE?.id}
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
        pageTitle="FICHA DE ENCAMINHAMENTO PROCESSUAL A DCJE/PGE"
        pageIcon={<S.PageIcon weight="bold" />}
      />
      <S.FormContainer onSubmit={submitProceduralRecordDCJE(onSubmit)}>
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
              {!isLoadingProceduralRecordDCJEDataByActId &&
              !loadingAttorneysList ? (
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
              {!isLoadingProceduralRecordDCJEDataByActId && !isLoadingAct ? (
                <S.DateContent error={errors.dtPrazoProcurador?.message}>
                  <S.DateInput
                    type="date"
                    required={true}
                    max={defaultDate}
                    defaultValue={
                      proceduralRecordDCJEDataByActId?.data
                        ?.dtPrazoProcurador || act?.data?.dtPrazo
                    }
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
              {!isLoadingProceduralRecordDCJEDataByActId ? (
                <Controller
                  name="txFaseProcessual"
                  control={controlProceduralRecordDCJE}
                  render={({ field }) => (
                    <S.CustomSelect
                      required={true}
                      placeholder="Digite mais de 5 caracteres"
                      {...field}
                      options={[
                        {
                          label: "Selecione",
                          value: "0",
                        },
                        {
                          label: "Impugnação",
                          value: "IMP",
                        },
                        {
                          label: "Contadoria Judicial (COJUD) - TJRN",
                          value: "COJ",
                        },
                        {
                          label: "Requisição de Pequeno Valor (RPV)",
                          value: "RPV",
                        },
                        {
                          label: "Precatório",
                          value: "PRE",
                        },
                        {
                          label: "Laudo Pericial",
                          value: "LAU",
                        },
                        {
                          label: "Execução",
                          value: "EXE",
                        },
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
              {!isLoadingProceduralRecordDCJEDataByActId &&
              !proceduralRecordDCJEDataByActId ? (
                <S.DateContent error={errors.dtPrazoDCJE?.message}>
                  <S.DateInput
                    required={true}
                    type="date"
                    defaultValue={
                      proceduralRecordDCJEDataByActId?.data?.dtPrazoDCJE
                    }
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
              {!isLoadingProceduralRecordDCJEDataByActId &&
              !loadingReasonsRequestsList ? (
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
              {!isLoadingProceduralRecordDCJEDataByActId &&
              !proceduralRecordDCJEDataByActId ? (
                <S.DateContent error={errors.dtAjuizamento?.message}>
                  <S.DateInput
                    required={true}
                    type="date"
                    defaultValue={
                      proceduralRecordDCJEDataByActId?.data?.dtAjuizamento
                    }
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
              {!isLoadingProceduralRecordDCJEDataByActId &&
              !proceduralRecordDCJEDataByActId ? (
                <S.DateContent error={errors.dtCitacao?.message}>
                  <S.DateInput
                    required={true}
                    type="date"
                    defaultValue={
                      proceduralRecordDCJEDataByActId?.data?.dtCitacao
                    }
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
              {!isLoadingProceduralRecordDCJEDataByActId &&
              !proceduralRecordDCJEDataByActId ? (
                <S.DateContent error={errors.dtTransitoJulgado?.message}>
                  <S.DateInput
                    type="date"
                    defaultValue={
                      proceduralRecordDCJEDataByActId?.data?.dtTransitoJulgado
                    }
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
              {!isLoadingProceduralRecordDCJEDataByActId &&
              !proceduralRecordDCJEDataByActId ? (
                <S.DateContent error={errors.dtAposentadoria?.message}>
                  <S.DateInput
                    type="date"
                    defaultValue={
                      proceduralRecordDCJEDataByActId?.data?.dtAposentadoria ||
                      ""
                    }
                    {...registerProceduralRecordDCJE("dtAposentadoria")}
                  />
                </S.DateContent>
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
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
              {/* {!proceduralRecordDCJEDataByActId ? (
                                <S.TextInput
                                    type="text"
                                    placeholder="Matrícula/Vínculo"
                                    defaultValue={fichaDCJE?.txMatricula}
                                    {...registerProceduralRecordDCJE(
                                        "txMatricula"
                                    )}
                                />
                            ) : (
                                <S.LoadingSpinner />
                            )} */}
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
              {!proceduralRecordDCJEDataByActId ? (
                <S.TextInput
                  type="text"
                  maxLength={15}
                  value={formatarNumero(
                    honorarioFixados ||
                      proceduralRecordDCJEDataByActId?.data?.vaHonorariosFixos *
                        100 ||
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
              {!isLoadingProceduralRecordDCJEDataByActId ? (
                <Controller
                  name="txBaseIncidencia"
                  control={controlProceduralRecordDCJE}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Digite mais de 5 caracteres"
                      {...field}
                      options={[
                        {
                          label: "Nenhuma",
                          value: null,
                        },
                        {
                          label: "Sobre condenação",
                          value: "CON",
                        },
                        {
                          label: "Sobre valor da causa",
                          value: "VCU",
                        },
                        {
                          label: "Sobre valor fixado",
                          value: "VFI",
                        },
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
              {!isLoadingProceduralRecordDCJEDataByActId ? (
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
              {!proceduralRecordDCJEDataByActId ? (
                <S.TextInput
                  type="text"
                  maxLength={6}
                  value={formatarNumero(
                    honorario ||
                      proceduralRecordDCJEDataByActId?.data
                        ?.nuHonorariosPercentual * 10000 ||
                      null
                  )}
                  {...registerProceduralRecordDCJE("nuHonorariosPercentual")}
                  onChange={handleChangeHonorarios}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
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
              {!isLoadingProceduralRecordDCJEDataByActId ? (
                <Controller
                  name="txIndiceJuros"
                  control={controlProceduralRecordDCJE}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Digite mais de 5 caracteres"
                      {...field}
                      options={[
                        {
                          label: "Nenhum",
                          value: null,
                        },
                        {
                          label: "6% a.a.",
                          value: "6% a.a.",
                        },
                        {
                          label: "12% a.a.",
                          value: "12% a.a.",
                        },
                        {
                          label: "SELIC (Exclusivamente)",
                          value: "SELIC",
                        },
                        {
                          label: "Poupança",
                          value: "POUPANCA",
                        },
                        {
                          label: "Outro",
                          value: "Outro",
                        },
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
              {!isLoadingProceduralRecordDCJEDataByActId ? (
                <Controller
                  name="txTermoJurosMora"
                  control={controlProceduralRecordDCJE}
                  render={({ field }) => (
                    <S.CustomSelect
                      placeholder="Digite mais de 5 caracteres"
                      {...field}
                      options={[
                        {
                          label: "Nenhum",
                          value: null,
                        },
                        {
                          label: "Citação Inicial",
                          value: "CIN",
                        },
                        {
                          label: "Vencimento da Parcela",
                          value: "VPA",
                        },
                        {
                          label: "Ajuizamento da Ação",
                          value: "AAC",
                        },
                        {
                          label: "Trânsito em Julgado",
                          value: "TJU",
                        },
                        {
                          label: "Evento Danoso",
                          value: "EDA",
                        },
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
                Observação Sobre os Juros de Mora:
                <S.InfoContainerField>
                  <S.InfoIcon />
                  <S.InfoText>
                    Outras observações acerca dos juros de mora.
                  </S.InfoText>
                </S.InfoContainerField>
              </S.FieldTitle>
              {!isLoadingProceduralRecordDCJEDataByActId ? (
                <S.TextInput
                  type="text"
                  maxLength={100}
                  /* defaultValue={
                                        proceduralRecordDCJEDataByActId!.data
                                            ?.txObservacaoJurosMora
                                    } */
                  {...registerProceduralRecordDCJE("txObservacaoJurosMora")}
                />
              ) : (
                <S.LoadingSpinner />
              )}
            </S.ContainerField>
          </S.ContentSection>

          <div
            style={{
              padding: "1rem",
              border: "1px solid #e0e0e0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Plus
              style={{
                alignSelf: "flex-end",
                justifySelf: "flex-end",
                backgroundColor: "#d1d1d1",
                borderRadius: "50%",
                padding: "0.5rem",
                cursor: "pointer",
              }}
              size={22}
              onClick={() => {}}
            />
            {juros.map((juro, index) => {
              /*  const txIndiceCorrecao = [
            { label: "Nenhum", value: null },
            { label: "IPCA (Justiça Federal)", value: "IPCA" },
            { label: "TR (Poupança)", value: "TR" },
            { label: "IPCA + TR", value: "IPCA+TR" },
            { label: "TR + IPCA", value: "TR+IPCA" },
            { label: "SELIC", value: "SELIC" },
            { label: "Outro", value: "OUTRO" }
        ].find(
            (b) =>
                b.value ===
                fichaDCJE?.lsFichasProcessuaisParametrosCalculo[index].
        ); */

              /* const txIndiceJuros = [
            { label: "Nenhum", value: "" },
            { label: "6% a.a.", value: "6% a.a." },
            { label: "12% a.a.", value: "12% a.a." },
            { label: "SELIC (Exclusivamente)", value: "SELIC" },
            { label: "Poupança", value: "POUPANCA" },
            { label: "Outro", value: "Outro" }
        ].find(
            (b) =>
                b.value === fichaDCJE?.txIndiceJuros
        ); */

              /* const txTermoJurosMora = [
            { label: "Nenhum", value: null },
            { label: "Citação Inicial", value: "CIN" },
            { label: "Vencimento da Parcela", value: "VPA" },
            { label: "Ajuizamento da Ação", value: "AAC" },
            { label: "Trânsito em Julgado", value: "TJU" },
            { label: "Evento Danoso", value: "EDA" },
            { label: "Outro", value: "OUT" }
        ].find(
            (b) =>
                b.value ===
                fichaDCJE?.txTermoJurosMora
        ); */
              return (
                <div>
                  <S.ContentSection>
                    <S.ContainerField>
                      <S.FieldTitle>
                        Correção Monetária:
                        <S.InfoContainerField>
                          <S.InfoIcon />
                          <S.InfoText>
                            Tipo da correção monetária definida na decisão
                            judicial.
                          </S.InfoText>
                        </S.InfoContainerField>
                      </S.FieldTitle>
                      {!isLoadingProceduralRecordDCJEDataByActId ? (
                        <Controller
                          name="txIndiceCorrecao"
                          control={controlProceduralRecordDCJE}
                          render={({ field }) => (
                            <S.CustomSelect
                              placeholder="Digite mais de 5 caracteres"
                              {...field}
                              options={[
                                {
                                  label: "Nenhum",
                                  value: null,
                                },
                                {
                                  label: "IPCA (Justiça Federal)",
                                  value: "IPCA",
                                },
                                {
                                  label: "TR (Poupança)",
                                  value: "TR",
                                },
                                {
                                  label: "IPCA + TR",
                                  value: "IPCA+TR",
                                },
                                {
                                  label: "TR + IPCA",
                                  value: "TR+IPCA",
                                },
                                {
                                  label: "SELIC",
                                  value: "SELIC",
                                },
                                {
                                  label: "Outro",
                                  value: "OUTRO",
                                },
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
                        Data de Inicio:
                        <S.InfoContainerField>
                          <S.InfoIcon />
                          <S.InfoText>
                            Data de inicio da correção monetária.
                          </S.InfoText>
                        </S.InfoContainerField>
                      </S.FieldTitle>
                      {!isLoadingProceduralRecordDCJEDataByActId ? (
                        <S.DateContent>
                          <S.DateInput
                            type="date"
                            max={defaultDate}
                            onChange={(e) => {}}
                          />
                        </S.DateContent>
                      ) : (
                        <S.LoadingSpinner />
                      )}
                    </S.ContainerField>
                    <S.ContainerField>
                      <S.FieldTitle>
                        Data Final:
                        <S.InfoContainerField>
                          <S.InfoIcon />
                          <S.InfoText>
                            Data final da correção monetária.
                          </S.InfoText>
                        </S.InfoContainerField>
                      </S.FieldTitle>
                      {!isLoadingProceduralRecordDCJEDataByActId ? (
                        <S.DateContent>
                          <S.DateInput
                            type="date"
                            max={defaultDate}
                            onChange={(e) => {}}
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
                        Observação Sobre Correção Monetária:
                        <S.InfoContainerField>
                          <S.InfoIcon />
                          <S.InfoText>
                            Outras observações acerca da correção monetária.
                          </S.InfoText>
                        </S.InfoContainerField>
                      </S.FieldTitle>
                      {!isLoadingProceduralRecordDCJEDataByActId ? (
                        <S.TextInput
                          type="text"
                          maxLength={100}
                          /* defaultValue={
                                                        proceduralRecordDCJEDataByActId!
                                                            .data
                                                            ?.txObservacaoCorrecao
                                                    } */
                          {...registerProceduralRecordDCJE(
                            "txObservacaoCorrecao"
                          )}
                        />
                      ) : (
                        <S.LoadingSpinner />
                      )}
                    </S.ContainerField>
                    <S.ContainerField></S.ContainerField>
                  </S.ContentSection>
                </div>
              );
            })}
          </div>
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
              {!isLoadingProceduralRecordDCJEDataByActId &&
              !proceduralRecordDCJEDataByActId ? (
                <S.TextAreaInput
                  required={true}
                  minLength={2}
                  maxLength={10000}
                  defaultValue={fichaDCJE?.txOrientacaoCalculo || ""}
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
              {/*  {!isLoadingProceduralRecordDCJEDataByActId &&
                            !proceduralRecordDCJEDataByActId ? (
                                <S.TextAreaInput
                                    minLength={2}
                                    maxLength={2000}
                                    defaultValue={
                                        fichaDCJE?.txObservacoesGerais || ""
                                    }
                                    placeholder="Digite aqui uma observação de no máximo 2000 caracteres."
                                    {...registerProceduralRecordDCJE(
                                        "txObservacoesGerais",
                                        {
                                            maxLength: 2000,
                                            minLength: 2
                                        }
                                    )}
                                />
                            ) : (
                                <S.LoadingSpinner />
                            )} */}
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
              <Controller
                name="lsArquivos"
                control={controlProceduralRecordDCJE}
                defaultValue={null}
                render={({ field: { onChange, value, ...field } }) => (
                  <S.FileInput
                    required={true}
                    {...field}
                    type="file"
                    accept=".pdf, .xlsx, .xls"
                    onChange={(e) => handleFileChange(e, onChange)}
                  />
                )}
              />
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
              !isLoadingProceduralRecordDCJEDataByActId &&
              proceduralRecordDCJEDataByActId?.status === "OK" &&
              (fichaDCJE?.idDistribuicao !== 0 ||
                fichaDCJE?.isEncerrado ||
                fichaDCJE?.isDevolvido)
            }
          >
            {fichaDCJE?.id ? "Editar" : "Salvar"}
          </S.SaveButton>
          {(putProceduralRecord.isLoading ||
            postProceduralRecord.isLoading) && <S.LoadingSpinnerSave />}
        </S.SaveButtonContainer>
      </S.FormContainer>
    </>
  );
};

export default ProceduralRecord;
