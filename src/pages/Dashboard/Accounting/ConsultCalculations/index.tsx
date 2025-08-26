import { CurrencyDollarSimple } from "@phosphor-icons/react";
import { Calculator } from "phosphor-react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { autocompleteSpecials } from "../../../../api/services/autocompleteSpecials/autocompleteSpecials";
import { getCalculosDCJE } from "../../../../api/services/calculosDCJE/calculosDCJE";
import JvrisTable from "../../../../components/JvrisTable";
import { PageTitle } from "../../../../components/TitlePage";
import theme from "../../../../globalStyle/theme";
import { useReasonsRequests } from "../../../../hooks/useReasonsRequests";
import { formatDataToTableExtra } from "../../../../utils/formatDataToTableExtra";
import { SubmitConsultCalc } from "./interfaces/consultcalculations.interface";
import * as S from "./styled";

const ConsultCalculations = () => {
  const navigate = useNavigate();

  const { reasonsRequestsList, loadingReasonsRequestsList } =
    useReasonsRequests();

  const [listData, setListData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitConsultCalc>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SubmitConsultCalc> = (data) => {
    setIsLoading(true);

    getCalculosDCJE({
      pageSize: "5000",
      dtInicio: data.startDate.toString(),
      dtFim: data.endDate.toString(),
      idFichaProcessual: Number(data.request),
      idProcesso: data.processNumber?.value,
      txTipoCalculo: data.calculationType?.value,
      idRazaoPedido: data.subject?.value,
    })
      .then((response) => {
        setListData(response?.data);
        setIsLoading(false);
      })
      .catch((e) => {
        setListData(null);
        setIsLoading(false);
      });
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

  return (
    <>
      <PageTitle
        pageTitle="CONSULTAR CÁLCULOS - DCJE"
        pageIcon={<S.PageIcon />}
      />

      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.SectionTitle>Data de Cadastro:</S.SectionTitle>

          <S.FieldDateContainer>
            <S.DateContainer>
              <S.DateContent error={errors.startDate?.message}>
                <S.DateDescription>Início</S.DateDescription>
                <S.DateInput
                  type="date"
                  placeholder="Início"
                  defaultValue={new Date().toISOString().substring(0, 10)}
                  {...register("startDate", {
                    required: "Data de início de período é obrigatória.",
                  })}
                />
              </S.DateContent>

              <S.DateContent error={errors.endDate?.message}>
                <S.DateDescription>Fim</S.DateDescription>
                <S.DateInput
                  type="date"
                  placeholder="Fim"
                  defaultValue={new Date().toISOString().substring(0, 10)}
                  {...register("endDate", {
                    required: "Data de fim de período é obrigatória.",
                    validate: (endDate: Date) => {
                      if (watch("startDate") > endDate) {
                        return "Intervalo de data inválido. Data de fim deve ser após data de início.";
                      }
                    },
                  })}
                />
              </S.DateContent>
            </S.DateContainer>
          </S.FieldDateContainer>

          <S.ErrorMessage>{errors.startDate?.message}</S.ErrorMessage>
          <S.ErrorMessage>{errors.endDate?.message}</S.ErrorMessage>
        </S.Section>

        <S.Row>
          <S.Section>
            <S.SectionTitle>Solicitação:</S.SectionTitle>

            <S.FieldContainer>
              <S.TextInput
                placeholder="Digite a solicitação"
                {...register("request")}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Nº do Processo:</S.SectionTitle>

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
                    isClearable
                    {...field}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.Row>
          <S.Section>
            <S.SectionTitle>Tipo Cálculo:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="calculationType"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione o tipo de calculo"
                    {...field}
                    options={[
                      { value: "IND", label: "Indenização" },
                      { value: "DIF", label: "Diferença diversas" },
                      {
                        value: "ENQ",
                        label: "Enquadramento",
                      },
                      {
                        value: "ATR",
                        label: "Remuneração em atraso",
                      },
                    ]}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Assunto:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    isLoading={loadingReasonsRequestsList}
                    placeholder="Selecione o assunto"
                    {...field}
                    options={reasonsRequestsList}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.ContainerButtons>
          <S.SubmitButton disabled={!isValid} type="submit">
            Pesquisar
          </S.SubmitButton>
          <S.ClearButton
            type="reset"
            onClick={() =>
              reset({
                processNumber: null,
                subject: null,
                calculationType: null,
              })
            }
          >
            Limpar
          </S.ClearButton>
        </S.ContainerButtons>
      </S.Form>

      {isLoading ? (
        <S.LoadingSpinner />
      ) : (
        (!listData || listData?.length == 0) && (
          <S.FieldContainer style={{ padding: "2rem" }}>
            <S.LabelField style={{ color: theme.colors.softRed }}>
              Não foram encontrados registros com os parâmetros informados.
            </S.LabelField>
          </S.FieldContainer>
        )
      )}

      {listData?.length > 0 && (
        <JvrisTable
          autoPrimaryColumn={false}
          download
          columns={[
            {
              text: "Nº Processo",
            },
            {
              text: "Solicitação",
            },
            {
              text: "Exequente",
            },
            {
              text: "Assunto",
            },
            {
              text: "Valor da Execução",
            },
            {
              text: "Valor Calculado",
            },
          ]}
          data={formatDataToTableExtra({
            content: listData,
            keysToInclude: [
              "txNumeroFormatado",
              "idFichaProcessual",
              "txParte",
              "txRazaoPedido",
              "vaExecucao",
              "vaResultadoTotal",
            ],
            keysToFormatAsMoney: ["vaExecucao", "vaResultadoTotal"],
            idProcessoDestaque: true,
            keysToOnclick: [
              {
                key: "txNumeroFormatado",
                onClick(dataOnIndex) {
                  navigate(
                    `/dashboard/detalhes-processo/espelho-processos/${dataOnIndex.idProcesso}`
                  );
                },
              },
            ],
          })}
          GenericButton={[
            {
              icon: (
                <CurrencyDollarSimple
                  weight="bold"
                  size={20}
                  alt="Ficha Contratual"
                />
              ),
              onClick(index) {
                navigate(
                  `/dashboard/dcje/ficha-processual/${listData[index].idAto}`
                );
              },
            },
            {
              icon: <Calculator weight="fill" size={20} alt="Cálculo" />,
              onClick(index) {
                navigate(
                  `/dashboard/contadoria/calculos/${listData[index].idFichaProcessual}`
                );
              },
            },
          ]}
        />
      )}
    </>
  );
};

export default ConsultCalculations;
