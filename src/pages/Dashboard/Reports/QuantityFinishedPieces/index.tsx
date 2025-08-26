import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { GetQuantityFinishedPieces } from "../../../../api/services/reports";
import { PageTitle } from "../../../../components/TitlePage";
import { useAttorneys } from "../../../../hooks/useAttorneys";
import { useSpecialsAll } from "../../../../hooks/useSpecialsAll";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import {
  HandleSpecialAttorneysListProps,
  SubmitQuantityFinishedPieces,
} from "./interfaces/quantityfinishedpieces.interface";
import * as S from "./styled";

const QuantityFinishedPieces = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDay());
  const defaultPreviousMonthDate = currentDate.toISOString().substring(0, 10);
  const defaultDate = new Date().toISOString().substring(0, 10);
  const { attorneysList, loadingAttorneysList } = useAttorneys();
  const { specialsList, loadingSpecialsList } = useSpecialsAll();
  const [specialsAttorneysState, setSpecialsAttorneysState] =
    useState(attorneysList);

  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitQuantityFinishedPieces>({
    mode: "onChange",
  });

  const {
    mutate,
    data: response,
    isLoading,
  } = useMutation(GetQuantityFinishedPieces, {
    onSuccess: (data) => {
      if (data?.status === "OK") {
        openPDFInNewTab(data.data.file_stream);
      }
    },
  });

  function handleSpecialAttorneysList({
    value,
  }: HandleSpecialAttorneysListProps) {
    let array = [];
    attorneysList?.map((at) => {
      at.setores?.map((ats) => {
        if (ats.id == value) {
          array.push(at);
          return;
        }
      });
    });
    if (array.length == 0) {
      toast.error(
        "Nenhum Procurador encontrado para a Especializada informada.",
        {
          icon: "😥",
          style: {
            borderRadius: "10px",
            background: "#e57373",
            color: "#fff",
            fontSize: "30px",
          },
        }
      );
    }
    setSpecialsAttorneysState(array);
  }

  const onSubmit: SubmitHandler<SubmitQuantityFinishedPieces> = (params) => {
    mutate({
      ...params,
      dtInicio: params.dtInicio,
      dtFim: params.dtFim,
      idProcurador: params.idProcurador?.value,
      idEspecializada: params.idEspecializada?.value,
    });
  };

  return (
    <>
      <PageTitle pageTitle="RELATÓRIO DO QUANTITATIVO DE PEÇAS FINALIZADAS" />
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
                  defaultValue={defaultPreviousMonthDate}
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
                    validate: (dtFim) => {
                      if (watch("dtInicio") > dtFim) {
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

        <S.Row>
          <S.Section>
            <S.SectionTitle>Especializada:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idEspecializada"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    isLoading={loadingSpecialsList}
                    placeholder="Selecione a especializada"
                    {...field}
                    options={specialsList}
                    onChange={(value) => {
                      handleSpecialAttorneysList(value as any);
                      reset({
                        idEspecializada: value,
                        idProcurador: null,
                      });
                    }}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Procurador:</S.SectionTitle>

            <S.FieldContainer>
              <Controller
                name="idProcurador"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    isLoading={loadingAttorneysList}
                    placeholder="Selecione o(a) procurador(a)"
                    {...field}
                    options={specialsAttorneysState}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.WarningMessage>{response?.message}</S.WarningMessage>

        <S.ContainerButtons>
          <S.SubmitButton disabled={!isValid} type="submit">
            Gerar Relatório
          </S.SubmitButton>
          <S.ClearButton
            type="reset"
            onClick={() => {
              reset({
                idEspecializada: null,
                idProcurador: null,
              });
            }}
          >
            Limpar
          </S.ClearButton>
          {isLoading && <S.LoadingSpinner />}
        </S.ContainerButtons>
      </S.Form>
    </>
  );
};

export default QuantityFinishedPieces;
