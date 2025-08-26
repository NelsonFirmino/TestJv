import { cnpj, cpf } from "cpf-cnpj-validator";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axiosInstance from "../../../../api/axiosInstance";
import { GetRPVReports } from "../../../../api/services/reports";
import { HotToastWarning } from "../../../../components/HotToastFuncs";
import { PageTitle } from "../../../../components/TitlePage";
import { openCSVInNewTab } from "../../../../utils/openCSVInNewTab.util";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import * as PresetData from "./PresetData";
import {
  EspI,
  NatuI,
  OriI,
  SubmitPAYREQ,
} from "./interfaces/paymentrequirements.interface";
import * as S from "./styled";

const PaymentRequirements = () => {
  const defaultDate = new Date().toISOString().substring(0, 10);
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitPAYREQ>({
    mode: "onChange",
  });

  const getRPVReportsMutation = useMutation(GetRPVReports, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        if (data.data.txTipoArquivo === "application/pdf") {
          openPDFInNewTab(data.data.file_stream);
        } else if (data.data.txTipoArquivo === "text/csv") {
          openCSVInNewTab(data.data.file_stream);
        }
      } else {
        HotToastWarning(data.message);
      }
    },
  });

  const onSubmit: SubmitHandler<SubmitPAYREQ> = async (data) => {
    getRPVReportsMutation.mutate({
      dtInicio: data.dtInicio,
      dtFim: data.dtFim,
      txCpfCnpj: cpfOuCnpj ? formattedDocument : formattedCNPJ,
      txProcesso: data.txProcesso,
      txTipo: data.txTipo?.value || "3",
      isHonorarios: data.isHonorarios?.value || "0",
      idOrigem: data.idNatureza?.value || "0",
      idNatureza: data.idNatureza?.value || "0",
      idEspecializada: data.idEspecializada?.value || "0",
      exportar: data?.exportar,
      isCiencia: data?.isCiencia,
    });
  };

  const [naturezas, setNaturezas] = useState<NatuI[]>([]);
  const [origens, setOrigens] = useState<OriI[]>([]);
  const [especializadas, setEspecializadas] = useState<EspI[]>([]);

  useEffect(() => {
    async function getNaturezas() {
      try {
        const naturezas = (
          await axiosInstance.get(`api/v1.0/rpv/natureza?pageSize=500`)
        ).data.data;

        setNaturezas(naturezas);
      } catch (error) {
        console.error(error);
      }
    }
    async function getOrigens() {
      try {
        const origens = (
          await axiosInstance.get(`api/v1.0/rpv/origem?page=1&pageSize=1000`)
        ).data.data;

        setOrigens(origens);
      } catch (error) {
        console.error(error);
      }
    }
    async function getEspecializadas() {
      try {
        const especializadas = (
          await axiosInstance.get(`api/v1.0/Especializada?pageSize=250`)
        ).data.data;
        setEspecializadas(especializadas);
      } catch (error) {
        console.error(error);
      }
    }
    getEspecializadas();
    getOrigens();
    getNaturezas();
  }, []);

  // TODO: incluir máscara de CPF/CNPJ

  const [formattedDocument, setFormattedDocument] = useState("");
  const [formattedCNPJ, setFormattedCNPJ] = useState("");
  const [documentoValido, setDocumentoValido] = useState<boolean>(true);
  const [cpfOuCnpj, setCpfOuCnpj] = useState<boolean>(true);

  const handleDocumentChange = (event) => {
    const inputDocument = event.target.value.replace(/\D/g, "");

    if (inputDocument.length <= 11) {
      const formatted = inputDocument.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        "$1.$2.$3-$4"
      );

      const isValid = cpf.isValid(event.target.value);
      setDocumentoValido(isValid);
      setFormattedDocument(formatted);
    } else {
      const formatted = inputDocument.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        "$1.$2.$3/$4-$5"
      );
      const isValid = cnpj.isValid(event.target.value);
      setDocumentoValido(isValid);
      setFormattedDocument(formatted);
    }
  };

  return (
    <>
      <PageTitle pageTitle="RELATÓRIO DE REQUISITÓRIOS DE PAGAMENTO" />
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.SectionTitle>Período: *</S.SectionTitle>

          <S.FieldDateContainer>
            <S.DateContainer>
              <S.DateContent error={errors.dtInicio?.message}>
                <S.DateDescription>Início</S.DateDescription>
                <S.DateInput
                  type="date"
                  placeholder="Início"
                  defaultValue={defaultDate}
                  {...register("dtInicio", {
                    required: "Data de início de período é obrigatória.",
                  })}
                />
              </S.DateContent>

              <S.DateContent error={errors.dtFim?.message}>
                <S.DateDescription>Fim</S.DateDescription>
                <S.DateInput
                  type="date"
                  placeholder="Fim"
                  defaultValue={defaultDate}
                  {...register("dtFim", {
                    required: "Data de fim de período é obrigatória.",
                    validate: (dt: Date) => {
                      if (watch("dtInicio") > dt) {
                        return "Intervalo de data inválido. Data de fim deve ser após data de início.";
                      }
                    },
                  })}
                />
              </S.DateContent>
            </S.DateContainer>
            <S.CheckInputContainer>
              <S.CheckInputLabel>Data de ciência:</S.CheckInputLabel>
              <Controller
                name="isCiencia"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <S.CheckInput type="checkbox" {...field}></S.CheckInput>
                )}
              />
            </S.CheckInputContainer>
            <S.CheckInputContainer>
              <S.CheckInputLabel>Exportar CSV:</S.CheckInputLabel>

              <Controller
                name="exportar"
                control={control}
                defaultValue={false}
                render={({ field }) => (
                  <S.CheckInput type="checkbox" {...field}></S.CheckInput>
                )}
              />
            </S.CheckInputContainer>
          </S.FieldDateContainer>

          <S.ErrorMessage>{errors.dtFim?.message}</S.ErrorMessage>
          <S.ErrorMessage>{errors.dtFim?.message}</S.ErrorMessage>
        </S.Section>

        <S.Row>
          <S.Section>
            <S.SectionTitle>CPF/CNPJ Requisitor:</S.SectionTitle>

            <S.FieldContainer style={{display: "flex", flexDirection: "column"}}>
              <Controller
                name="txCpfCnpj"
                control={control}
                render={({ field }) => (
                  <S.TextInput
                    type="input"
                    placeholder={"Digite o CPF ou CNPJ do Requisitor"}
                    defaultValue=""
                    {...field}
                    value={formattedDocument}
                    onChange={(value: any) => handleDocumentChange(value)}
                    // minLength={cpfOuCnpj ? 11 : 14}
                    maxLength={18}
                  />
                )}
              />
              {!documentoValido && formattedDocument.length > 10 && (
                <span
                  style={{
                    color: "red",
                    fontSize: "1rem",
                    marginTop: "0.5rem",
                  }}
                >
                  Documento Inválido
                </span>
              )}
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Nº Processo:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="txProcesso"
                control={control}
                render={({ field }) => (
                  <S.TextInput
                    type="input"
                    placeholder="Digite o número do processo"
                    defaultValue=""
                    {...field}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.Row>
          <S.Section>
            <S.SectionTitle>Tipo:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="txTipo"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione o tipo"
                    {...field}
                    options={PresetData.Tipos}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Honorários Sucumbenciais:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="isHonorarios"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione um honorário"
                    {...field}
                    options={PresetData.Honorarios}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.Row>
          <S.Section>
            <S.SectionTitle>Origem da Despesa:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idOrigem"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione a origem da despesa"
                    {...field}
                    options={origens.map((origem) => {
                      return {
                        label: origem.txOrigem,
                        value: origem.id,
                      };
                    })}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Natureza da Despesa:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idNatureza"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione a natureza da despesa"
                    {...field}
                    options={naturezas.map((natureza) => {
                      return {
                        label: natureza.txNatureza,
                        value: natureza.id,
                      };
                    })}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.Section>
          <S.SectionTitle>Especializada:</S.SectionTitle>

          <S.FieldContainer>
            <Controller
              name="idEspecializada"
              control={control}
              render={({ field }) => (
                <S.CustomSelect
                  placeholder="Selecione a especializada"
                  {...field}
                  options={especializadas
                    .filter((esp) => esp.isRpv)
                    .map((especializada) => {
                      return {
                        label: especializada.txEspecializada,
                        value: especializada.id,
                      };
                    })}
                />
              )}
            />
          </S.FieldContainer>
        </S.Section>

        <S.ContainerButtons>
          <S.SubmitButton disabled={!isValid || getRPVReportsMutation.isLoading} type="submit">
            Gerar Relatório
          </S.SubmitButton>
          <S.ClearButton
            type="reset"
            onClick={() =>
              reset({
                txCpfCnpj: "",
                txProcesso: "",
                txTipo: {},
                isHonorarios: {},
                idOrigem: {},
                idNatureza: {},
                idEspecializada: {},
              })
            }
          >
            Limpar
          </S.ClearButton>
          {getRPVReportsMutation.isLoading && <S.LoadingSpinner />}
        </S.ContainerButtons>
      </S.Form>
    </>
  );
};

export default PaymentRequirements;
