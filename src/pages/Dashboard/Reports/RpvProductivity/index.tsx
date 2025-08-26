import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axiosInstance from "../../../../api/axiosInstance";
import { HotToastWarning } from "../../../../components/HotToastFuncs";
import { PageTitle } from "../../../../components/TitlePage";
import { openPDFInNewTab } from "../../../../utils/openPDFInNewTab.util";
import {
  EspI,
  OpI,
  SubmitDCJE,
} from "./interfaces/attorneyproductivity.interface";
import * as S from "./styled";

// TODO: refatorar para usar react query e fazer service

const RpvProductivity = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isValid, errors },
    watch,
    control,
  } = useForm<SubmitDCJE>({
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<SubmitDCJE> = async (data) => {
    try {
      const res = await axiosInstance.get(
        `api/v1.0/rpv/relatorios/produtividade`,
        {
          params: {
            dtInicio: data.startDate,
            dtFim: data.endDate,
            idEspecializada: selectedEspecializada,
            idUsuario: data?.rpvoperator?.value,
          },
        }
      );
      if (res.data.status == "NotFound") {
        HotToastWarning("NotFound");
      } else {
        openPDFInNewTab(res.data.data.file_stream);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [especializadas, setEspecializadas] = useState<EspI[]>([]);
  const [operadores, setOperadores] = useState<OpI[]>([]);
  const [selectedEspecializada, setSelectedEspecializada] = useState<number>(0);

  async function getOperadores(epecializadaID: number) {
    try {
      const op = await axiosInstance.get(
        `api/v1.0/rpv/assessores/${epecializadaID}/especializada`
      );
      if (op.data.status == "NotFound") {
        HotToastWarning("NotFound");
      } else setOperadores(op.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    async function getEspecializadas() {
      try {
        const esp = await axiosInstance.get(
          `api/v1.0/Especializada/Ordernada?idSecretaria=0`
        );
        if (esp.data.status == "NotFound") {
          HotToastWarning("NotFound");
        } else setEspecializadas(esp.data.data);
      } catch (err) {
        console.error(err);
      }
    }

    getEspecializadas();
  }, []);

  return (
    <>
      <PageTitle pageTitle="RELATÓRIO DE PRODUTIVIDADE DO RPV" />
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.Section>
          <S.SectionTitle>Período: *</S.SectionTitle>

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
            <S.SectionTitle>Especializada:</S.SectionTitle>
            <S.FieldContainer>
              <Controller
                name="special"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione a especializada"
                    {...field}
                    onChange={(e: any) => {
                      if (e != null) {
                        getOperadores(e.value);
                        setSelectedEspecializada(e.value);
                      }
                    }}
                    options={especializadas
                      .filter((es) => es.isRpv)
                      .map((esp) => {
                        return {
                          value: esp.id,
                          label: esp.txEspecializada,
                        };
                      })}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>

          <S.Section>
            <S.SectionTitle>Operador(a) RPV:</S.SectionTitle>
            <S.FieldContainer>
              <Controller
                name="rpvoperator"
                control={control}
                render={({ field }) => (
                  <S.CustomSelect
                    placeholder="Selecione o(a) operador(a)"
                    {...field}
                    options={operadores.map((op) => {
                      return {
                        value: op.id,
                        label: op.txUsuario,
                      };
                    })}
                  />
                )}
              />
            </S.FieldContainer>
          </S.Section>
        </S.Row>

        <S.ContainerButtons>
          <S.SubmitButton disabled={!isValid} type="submit">
            Gerar Relatório
          </S.SubmitButton>
          <S.ClearButton
            type="reset"
            onClick={() =>
              reset({
                special: "",
                rpvoperator: {},
              })
            }
          >
            Limpar
          </S.ClearButton>
        </S.ContainerButtons>
      </S.Form>
    </>
  );
};

export default RpvProductivity;
