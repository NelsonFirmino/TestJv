import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axiosInstance from "../../../../api/axiosInstance";
import { GetProcessReports } from "../../../../api/services/reports";
import { HotToastWarning } from "../../../../components/HotToastFuncs";
import { PageTitle } from "../../../../components/TitlePage";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import * as PresetData from "./PresetData";
import {
  AssI,
  EspI,
  SisI,
  SubmitProcessReport,
  TriI,
} from "./interfaces/cases.interface";
import * as S from "./styled";

const Cases = () => {
  const defaultDate = new Date().toISOString().substring(0, 10);
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitProcessReport>({
    mode: "onChange",
    defaultValues: {
      vaProcessoFim: null,
      vaProcessoInicio: null,
      periodo: PresetData.periodOptions[0],
    },
  });

  const getProcessReportsMutation = useMutation(GetProcessReports, {
    onSettled: ({ data, status, message }) => {
      if (status === "OK") {
        openPDFInNewTab(data.file_stream);
      } else {
        HotToastWarning(message);
      }
    },
  });

  const onSubmit: SubmitHandler<SubmitProcessReport> = async (data) => {
    let dtParams = {};
    if (data.periodo.value === "0") {
      dtParams = {
        dtInicioCadastroAto: data.dtInicio,
        dtFimCadastroAto: data.dtFim,
      };
    } else {
      dtParams = {
        dtInicioDistribuicao: data.dtInicio,
        dtFimDistribuicao: data.dtFim,
      };
    }

    if (vaProcessoDe / 100 > vaProcessoAte / 100) {
      return setMensagemErro("Valor final deve ser maior que o valor inicial");
    } else {
      setMensagemErro("");
      getProcessReportsMutation.mutate({
        assuntos:
          data.assuntos?.map((assunto) => assunto.value).join(", ") || null,
        tipoProcesso: data.tipoProcesso?.value,
        especializadasDistribuidas:
          data.especializadasDistribuidas
            ?.map((especializada) => especializada.value)
            .join(", ") || null,
        idTribunal: data.idTribunal?.value || "0",
        idSistemaProcessual: data.idSistemaProcessual?.value || "0",
        anoCadastroPJE: data?.anoCadastroPJE,
        vaProcessoInicio: data.vaProcessoInicio
          ? formatarVaProcesso(data?.vaProcessoInicio)
          : "0.00",
        vaProcessoFim: data.vaProcessoFim
          ? formatarVaProcesso(data?.vaProcessoFim)
          : "0.00",
        isAtosConcluidos: data.isAtosConcluidos?.value,
        isDistribuicaoAtualAto: data.isDistribuicaoAtualAto?.value,
        ...dtParams,
      });
    }
  };

  const [assuntos, setAssuntos] = useState<AssI[]>([]);
  const [especializadas, setEspecializadas] = useState<EspI[]>([]);
  const [sisProcessual, setSisProcessual] = useState<SisI[]>([]);
  const [tribunais, setTribunais] = useState<TriI[]>([]);
  const [vaProcessoDe, setVaProcessoDe] = useState(null);
  const [vaProcessoAte, setVaProcessoAte] = useState(null);
  const [mensagemErro, setMensagemErro] = useState("");

  const handleValorDe = (e: any) => {
    if (e.target.value != null) {
      const valorNumerico = e.target.value.replace(/\D/g, "");
      setVaProcessoDe(valorNumerico);
      setValue("vaProcessoInicio", (+valorNumerico / 100).toString());
    }
  };

  const handleValorAte = (e: any) => {
    const valorNumerico = e.target.value.replace(/\D/g, "");
    setVaProcessoAte(valorNumerico);
    setValue("vaProcessoFim", (+valorNumerico / 100).toString());
  };

  const formatarNumero = (numero: any) => {
    return (Number(numero) / 100).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  function formatarVaProcesso(numero) {
    let numeroLimpo = numero.replace(/[^0-9,.]/g, "");

    numeroLimpo = numeroLimpo.replace(",", ".");

    numeroLimpo = numeroLimpo.replace(/\.(?=.*\.)/g, "");

    let numeroFormatado = parseFloat(numeroLimpo).toFixed(2);

    return numeroFormatado;
  }

  async function UpdateAssuntos(txt: string) {
    try {
      const assunto = await axiosInstance.get(
        `api/v1.0/Assuntos/autocomplete?txAssunto=${txt}`
      );
      if (assunto.data.status == "NotFound") {
        HotToastWarning("NotFound");
      } else setAssuntos(assunto.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function getEspecializadas() {
      try {
        const { data } = await axiosInstance.get(
          `api/v1.0/Especializada/Ordernada?idSecretaria=0`
        );
        if (data.status == "NotFound") {
          HotToastWarning("NotFound");
        } else setEspecializadas(data.data);
      } catch (err) {
        console.error(err);
      }
    }
    async function getSisProcessual() {
      try {
        const { data } = await axiosInstance.get(
          `api/v1.0/sistemas-processuais`
        );
        if (data.status == "NotFound") {
          HotToastWarning("NotFound");
        } else setSisProcessual(data.data);
      } catch (err) {
        console.error(err);
      }
    }

    async function getTribunais() {
      try {
        const { data } = await axiosInstance.get(
          `api/v1.0/Tribunais?page=1&pageSize=200`
        );
        if (data.status == "NotFound") {
          HotToastWarning("NotFound");
        } else setTribunais(data.data);
      } catch (err) {
        console.error(err);
      }
    }

    getTribunais();
    getSisProcessual();
    getEspecializadas();
  }, []);

  return (
    <S.Wrapper>
      <PageTitle pageTitle="RELATÓRIO DE PROCESSOS" />
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Row>
          <S.Section>
            <S.SectionTitle>Período:</S.SectionTitle>
            <S.FieldContainer>
              <Controller
                name="periodo"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione o período"
                    {...field}
                    options={PresetData.periodOptions}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle></S.SectionTitle>
            <S.FieldDateContainer>
              <S.DateContainer>
                <S.DateContent error={errors.dtInicio?.message}>
                  <S.DateDescription>Início</S.DateDescription>
                  <S.DateInput
                    type="date"
                    placeholder="Início"
                    defaultValue={defaultDate}
                    {...register("dtInicio")}
                  />
                </S.DateContent>

                <S.DateContent error={errors.dtFim?.message}>
                  <S.DateDescription>Fim</S.DateDescription>
                  <S.DateInput
                    type="date"
                    placeholder="Fim"
                    defaultValue={defaultDate}
                    {...register("dtFim", {
                      validate: (dtFimCadastroAto: Date) => {
                        if (watch("dtInicio") > dtFimCadastroAto) {
                          return "Intervalo de data inválido. Data de fim deve ser após data de início.";
                        }
                      },
                    })}
                  />
                </S.DateContent>
              </S.DateContainer>
            </S.FieldDateContainer>
            <S.ErrorMessage>{errors.dtInicio?.message}</S.ErrorMessage>
            <S.ErrorMessage>{errors.dtFim?.message}</S.ErrorMessage>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Ano de Cadastro (PJE):</S.SectionTitle>
            <S.FieldContainer>
              <Controller
                name="anoCadastroPJE"
                control={control}
                render={({ field }) => (
                  <S.TextInput
                    type="text"
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="Ex: 2023"
                    defaultValue=""
                    maxLength={4}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.Row>
          <S.Section>
            <S.SectionTitle>Assunto(s):</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="assuntos"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Digite mais de 3 caracteres"
                    {...field}
                    onInputChange={(assunto) => {
                      assunto && UpdateAssuntos(assunto);
                    }}
                    options={assuntos.map((assunto) => {
                      return {
                        value: assunto.id,
                        label: assunto.txAssunto,
                      };
                    })}
                    isMulti
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Especializada:</S.SectionTitle>
            <S.FieldContainer>
              <Controller
                name="especializadasDistribuidas"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    isClearable
                    isMulti
                    placeholder="Selecione a especializada"
                    {...field}
                    options={especializadas.map((esp) => {
                      return {
                        value: esp.id,
                        label: esp.nuNivel
                          ? "→ " + esp.txEspecializada
                          : esp.txEspecializada,
                      };
                    })}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
          <S.Section></S.Section>
        </S.Row>

        <S.Row>
          <S.Section>
            <S.SectionTitle>Sistema Processual:</S.SectionTitle>
            <S.FieldContainer>
              <Controller
                name="idSistemaProcessual"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione o sistema processual"
                    {...field}
                    isClearable
                    options={sisProcessual.map((sis) => {
                      return {
                        value: sis.id,
                        label: sis.txSistemaProcessual,
                      };
                    })}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Tipo de Processo:</S.SectionTitle>
            <S.FieldContainer>
              <Controller
                name="tipoProcesso"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    isClearable
                    placeholder="Selecione o tipo de processo"
                    {...field}
                    options={PresetData.caseTypeOptions}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Tribunal:</S.SectionTitle>
            <S.FieldContainer>
              <Controller
                name="idTribunal"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    isClearable
                    placeholder="Selecione o tribunal"
                    {...field}
                    options={tribunais.map((trib) => {
                      return {
                        value: trib.id,
                        label: trib.txSigla + " - " + trib.txTribunal,
                      };
                    })}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.Row>
          <S.Section>
            <S.SectionTitle>Valor (R$):</S.SectionTitle>
            {mensagemErro && (
              <S.ValueDescription style={{ color: "red" }}>
                {mensagemErro}
              </S.ValueDescription>
            )}
            <S.FieldValueContainer>
              <S.ValueContainer>
                <S.ValueContent error={errors.vaProcessoInicio?.message}>
                  <S.ValueDescription>De:</S.ValueDescription>
                  <S.ValueInput
                    type="text"
                    // placeholder="0,00"
                    value={formatarNumero(vaProcessoDe)}
                    {...register("vaProcessoInicio")}
                    onChange={handleValorDe}
                  />
                </S.ValueContent>
                <S.ValueContent error={errors.vaProcessoFim?.message}>
                  <S.ValueDescription>Até</S.ValueDescription>
                  <S.ValueInput
                    type="text"
                    placeholder="0,00"
                    value={formatarNumero(vaProcessoAte)}
                    {...register("vaProcessoFim")}
                    onChange={handleValorAte}
                  />
                </S.ValueContent>
              </S.ValueContainer>
            </S.FieldValueContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Atos Concluídos:</S.SectionTitle>
            <S.FieldContainer>
              <Controller
                name="isAtosConcluidos"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    isClearable
                    placeholder="Selecione uma opcção"
                    {...field}
                    options={PresetData.finishedActsOptions}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Distribuição Atual</S.SectionTitle>
            <S.FieldContainer>
              <Controller
                name="isDistribuicaoAtualAto"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    isClearable
                    placeholder="Selecione uma opção"
                    {...field}
                    options={PresetData.currentDistributionOptions}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.ContainerButtons>
          <S.SubmitButton
            disabled={!isValid || getProcessReportsMutation.isLoading}
            type="submit"
          >
            Gerar Relatório
          </S.SubmitButton>
          <S.ClearButton
            type="reset"
            onClick={() =>
              reset({
                report: null,
                attorney: null,
                especializadasDistribuidas: null,
                idSistemaProcessual: null,
                tipoProcesso: null,
                idTribunal: null,
                isAtosConcluidos: null,
                isDistribuicaoAtualAto: null,
                assuntos: null,
                periodo: PresetData.periodOptions[0],
                vaProcessoFim: null,
                vaProcessoInicio: null,
              })
            }
          >
            Limpar
          </S.ClearButton>
          {getProcessReportsMutation.isLoading && <S.LoadingSpinner />}
        </S.ContainerButtons>
      </S.Form>
    </S.Wrapper>
  );
};

export default Cases;
